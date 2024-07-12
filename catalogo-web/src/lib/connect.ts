import type {
  UiState,
  Connector,
  WidgetDescription,
  Widget,
} from "instantsearch.js";
import type { IndexWidget } from "instantsearch.js/es/widgets/index/index";
import { readable, writable, type Readable } from "svelte/store";

import algoliasearchHelper from "algoliasearch-helper";

import type { SearchParameters } from "algoliasearch-helper";

import { getInstantSearchContext } from "./instantSearchContext";
import { getIndexContext } from "./indexContext";
import { onDestroyClientSide } from "./utils";

/*
  createSearchResults and getIndexSearchResults were gotten from 
  https://github.com/algolia/react-instantsearch/blob/v6.31.1/packages/react-instantsearch-hooks/src/lib/getIndexSearchResults.ts and
  https://github.com/algolia/react-instantsearch/blob/v6.31.1/packages/react-instantsearch-hooks/src/lib/createSearchResults.ts
*/
function createSearchResults<THit>(state: SearchParameters) {
  return new algoliasearchHelper.SearchResults<THit>(
    state,
    [
      {
        query: state.query ?? "",
        page: state.page ?? 0,
        hitsPerPage: state.hitsPerPage ?? 20,
        hits: [],
        nbHits: 0,
        nbPages: 0,
        params: "",
        exhaustiveNbHits: true,
        exhaustiveFacetsCount: true,
        processingTimeMS: 0,
        index: state.index,
      },
    ],
    {
      /** used by connectors to prevent persisting these results */
      __isArtificial: true,
    },
  );
}

function getIndexSearchResults(indexWidget: IndexWidget) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const helper = indexWidget.getHelper()!;
  const results =
    // On SSR, we get the results injected on the Index.
    indexWidget.getResults() ||
    // On the browser, we create fallback results based on the helper state.
    createSearchResults(helper.state);
  const scopedResults = indexWidget.getScopedResults().map((scopedResult) => {
    const fallbackResults =
      scopedResult.indexId === indexWidget.getIndexId()
        ? results
        : createSearchResults(scopedResult.helper.state);

    return {
      ...scopedResult,
      // We keep `results` from being `null`.
      results: scopedResult.results || fallbackResults,
    };
  });

  return {
    results,
    scopedResults,
  };
}

// With some tricky typing voodoo we're able to get proper state type inference when using connect
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ExtractStateType<T extends (...args: any) => any> = Parameters<
  Parameters<T>[0]
>[0];
type AdditionalWidgetProperties = Partial<Widget<WidgetDescription>>;

export default function connect<
  T extends Connector<WidgetDescription, Record<string, unknown>>,
>(
  connector: T,
  widgetParams: Parameters<ReturnType<T>>[0] = {},
  additionalWidgetProperties: AdditionalWidgetProperties = {},
): Readable<ExtractStateType<T>> {
  const search = getInstantSearchContext();
  const parentIndex = getIndexContext();

  // Originally just used readable which means I had to initialize widget
  // in the readable start function, however this keeps us from setting initial state.
  // Could be nice to have something like widget.subscribe() :)
  const writableState = writable<ExtractStateType<T>>();
  const widget = {
    ...connector(writableState.set)(widgetParams),
    ...additionalWidgetProperties,
  };

  parentIndex.addWidgets([widget]);

  onDestroyClientSide(() => {
    parentIndex.removeWidgets([widget]);
  });

  // We want to get the initial state so that it will not be null at first render.
  let initialState: ExtractStateType<T> = {} as ExtractStateType<T>;

  if (widget.getWidgetRenderState) {
    // The helper exists because we've started InstantSearch.
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const helper = parentIndex.getHelper()!;
    const uiState = parentIndex.getWidgetUiState<UiState>({})[
      parentIndex.getIndexId()
    ];
    helper.state =
      widget.getWidgetSearchParameters?.(helper.state, { uiState }) ||
      helper.state;
    const { results, scopedResults } = getIndexSearchResults(parentIndex);

    // We get the widget render state by providing the same parameters as
    // InstantSearch provides to the widget's `render` method.
    // See https://github.com/algolia/instantsearch.js/blob/019cd18d0de6dd320284aa4890541b7fe2198c65/src/widgets/index/index.ts#L604-L617
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { widgetParams, ...renderState } = widget.getWidgetRenderState({
      helper,
      parent: parentIndex,
      instantSearchInstance: search,
      results,
      scopedResults,
      state: helper.state,
      renderState: search.renderState,
      templatesConfig: search.templatesConfig,
      createURL: parentIndex.createURL,
      searchMetadata: {
        isSearchStalled: search.status === "stalled",
      },
      error: search.error,
      status: search.status,
    });

    initialState = renderState as ExtractStateType<T>;
  }

  // We set the writable state to the initial state so that it does not overwrite readable with null.
  writableState.set(initialState);

  // We return a readable because it makes more sense than a writable :)
  return readable<ExtractStateType<T>>(initialState, (set) =>
    writableState.subscribe(set),
  );
}
