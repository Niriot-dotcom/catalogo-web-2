import type { PageLoad } from "./$types";
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "$lib/firebase";
import { BiasiCollectionName } from "$lib/constants/BiasiDB";

export type VisibleIds = string[];

export const load: PageLoad = async ({ params }) => {
  // firebase query to get all the documents in the collection that match the field value pageType: "Coberot Austral"
  const q = query(
    collection(db, BiasiCollectionName),
    where("pageCategory", "==", "Adornos luminosos"),
  );
  const querySnapshot = await getDocs(q);
  var products: any = [];
  querySnapshot.forEach((doc) => {
    // map the document data to an array with the data of products
    products.push(doc.data());
  });

  products = products.sort((a, b) => {
    if (a.pageTemplate === "portadilla" && b.pageTemplate !== "portadilla") {
      return -1;
    } else if (
      a.pageTemplate !== "portadilla" &&
      b.pageTemplate === "portadilla"
    ) {
      return 1;
    } else {
      return b.pageTemplate.localeCompare(a.pageTemplate);
    }
  });

  return {
    props: {
      pages: products,
    },
  };
};
