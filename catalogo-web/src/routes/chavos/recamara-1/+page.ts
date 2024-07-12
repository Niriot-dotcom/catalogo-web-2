// @ts-nocheck
import type { PageLoad } from "./$types";
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "$lib/firebase";
import { ChavosCollectionName } from "$lib/constants/DB";

export type VisibleIds = string[];

export const load = async ({ params }: Parameters<PageLoad>[0]) => {
  const q = query(
    collection(db, ChavosCollectionName),
    where("productSection", "==", "Página 1 / Recámara"),
    where("pageStatus", "==", "Activa"),
  );
  const querySnapshot = await getDocs(q);
  var pages: any = [];
  querySnapshot.forEach((doc) => {
    pages.push(doc.data());
  });
  pages.sort((a, b) => (a.productOrder > b.productOrder ? 1 : -1));

  return {
    props: {
      pages,
    },
  };
};
