// @ts-nocheck
import type { PageLoad } from "./$types";
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "$lib/firebase";
import { ChavosCollectionName } from "$lib/constants/DB";

export type VisibleIds = string[];

export const load = async ({ params }: Parameters<PageLoad>[0]) => {
  const q = query(
    collection(db, ChavosCollectionName),
    where("productSection", "==", "Página 3 / Recámara"),
    where("pageStatus", "==", "Activa"),
  );
  const querySnapshot = await getDocs(q);
  var pages: any = [];
  querySnapshot.forEach((doc) => {
    pages.push(doc.data());
  });
  pages.sort((a, b) => (a.productOrder > b.productOrder ? 1 : -1));

  let pillowsPages = [];
  let huggablePillowsPages = [];
  let mattressProtectorsPages = [];
  let groupedPages = {};
  for (const page of pages) {
    if (
      page.productType === "Almohadas" ||
      page.productType === "Almohadas Viafoam"
    ) {
      pillowsPages.push(page);
    } else if (page.productType === "Almohadas Abrazables") {
      huggablePillowsPages.push(page);
    } else if (page.productType === "Protectores de colchón") {
      mattressProtectorsPages.push(page);
    } else {
      if (groupedPages[page.productType] === undefined) {
        groupedPages[page.productType] = [page];
      } else {
        groupedPages[page.productType].push(page);
      }
    }
  }

  return {
    props: {
      pages,
      pillowsPages,
      huggablePillowsPages,
      mattressProtectorsPages,
    },
  };
};
