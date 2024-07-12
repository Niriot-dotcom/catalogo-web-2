import type { PageLoad } from "./$types";
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "$lib/firebase";
import { BiasiCollectionName } from "$lib/constants/BiasiDB";

export type VisibleIds = string[];

export const load: PageLoad = async ({ params }) => {
  // firebase query to get all the documents in the collection that match the field value pageType: "Coberot Austral"
  const q = query(
    collection(db, BiasiCollectionName),
    where("pageCategory", "==", "Muebles"),
  );
  const querySnapshot = await getDocs(q);
  var products: any = [];
  querySnapshot.forEach((doc) => {
    // map the document data to an array with the data of products
    products.push(doc.data());
  });

  function sortByTemplate(objects) {
    const templateOrder = [
      "portadilla",
      "mainAndElements",
      "twoSides",
      "Puffs (invierno)",
      "videoAndGrid",
    ];

    return function (a, b) {
      const aIndex = templateOrder.indexOf(a.pageTemplate);
      const bIndex = templateOrder.indexOf(b.pageTemplate);

      if (aIndex < bIndex) {
        return -1;
      } else if (aIndex > bIndex) {
        return 1;
      } else {
        return 0;
      }
    };
  }
  products = products.filter(
    (product) => product.pageTemplate !== "videoAndGrid",
  );
  products = products.sort(sortByTemplate(products));

  return {
    props: {
      pages: products,
    },
  };
};
