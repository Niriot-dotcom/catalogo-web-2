// @ts-nocheck
import type { PageLoad } from "./$types";
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "$lib/firebase";
import { InviernoCollectionName } from "$lib/constants/DB";

export type VisibleIds = string[];

export const load = async ({ params }: Parameters<PageLoad>[0]) => {
  const q = query(
    collection(db, InviernoCollectionName),
    where("productSection", "==", "Página 8 / Complementos"),
    where("productType", "in", [
      "Cojines",
      "Funda De Cojín",
      "Fundas De Cojín Velvet",
    ]),
    where("pageStatus", "==", "Activa"),
  );
  const querySnapshot = await getDocs(q);
  var pages: any = [];
  querySnapshot.forEach((doc) => {
    pages.push(doc.data());
  });
  pages.sort((a, b) => (a.productOrder > b.productOrder ? 1 : -1));

  let pillowsPages = [];
  let mattressProtectorsPages = [];
  let groupedPages = {};
  for (const page of pages) {
    if (page.pageTemplate == "") continue;

    if (page.pageTemplate === "Almohadas") {
      pillowsPages.push(page);
    } else if (page.pageTemplate === "ProtectoresDeColchon") {
      mattressProtectorsPages.push(page);
    } else {
      if (groupedPages[page.productType] === undefined) {
        groupedPages[page.productType] = [page];
      } else {
        groupedPages[page.productType].push(page);
      }
    }
  }

  console.log("groupedPages: ", groupedPages);
  return { props: { groupedPages } };
};
