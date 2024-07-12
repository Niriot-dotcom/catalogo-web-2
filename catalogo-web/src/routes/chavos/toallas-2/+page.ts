// @ts-nocheck
import type { PageLoad } from "./$types";
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "$lib/firebase";
import { ChavosCollectionName } from "$lib/constants/DB";

export type VisibleIds = string[];

export const load = async ({ params }: Parameters<PageLoad>[0]) => {
  const q = query(
    collection(db, ChavosCollectionName),
    where("productSection", "==", "Página 6 / Toallas"),
    where("pageStatus", "==", "Activa"),
  );
  const querySnapshot = await getDocs(q);
  var pages: any = [];
  querySnapshot.forEach((doc) => {
    pages.push(doc.data());
  });
  const x = pages.sort((a, b) => (a.productOrder > b.productOrder ? 1 : -1));

  let groupedPages = {};
  for (const page of x) {
    if (page.pageTemplate == "") {
      continue;
    }

    if (groupedPages[page.productType] === undefined) {
      groupedPages[page.productType] = [page];
    } else {
      groupedPages[page.productType].push(page);
    }
  }

  return {
    props: {
      groupedPages,
    },
  };
};
