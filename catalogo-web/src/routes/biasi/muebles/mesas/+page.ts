import type { PageLoad } from "./$types";
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "$lib/firebase";
import { BiasiCollectionName } from "$lib/constants/DB";
import { GROUPED_TEMPLATES } from "$lib/constants/strings";
import type { DatabasePage } from "$lib/constants/globalTypes";
import { BiasiMueblesSubsections } from "$lib/constants/subSections";

export type VisibleIds = string[];

export const load = async ({ params }: Parameters<PageLoad>[0]) => {
  const q = query(
    collection(db, BiasiCollectionName),
    where("productSection", "==", "Página 01 / Muebles"),
    where(
      "productType",
      "in",
      BiasiMueblesSubsections.find((s) => s.title === "mesas")?.productTypes,
    ),
    // where("pageStatus", "==", true),
  );
  const querySnapshot = await getDocs(q);
  var pages: DatabasePage[] = [];
  querySnapshot.forEach((doc) => {
    pages.push(doc.data() as any);
  });
  pages.sort((a, b) => (a.productOrder > b.productOrder ? 1 : -1));

  let groupedPages: Record<string, DatabasePage[]> = {};
  for (const page of pages) {
    if (GROUPED_TEMPLATES.includes(page.pageTemplate)) {
      if (groupedPages[page.productType] === undefined) {
        groupedPages[page.productType] = [page];
      } else {
        groupedPages[page.productType].push(page);
      }
    }
  }

  return { props: { pages, groupedPages } };
};
