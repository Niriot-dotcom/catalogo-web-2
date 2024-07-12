import type { PageLoad } from "./$types";
import { collection, query, getDocs, where, orderBy } from "firebase/firestore";
import { db } from "$lib/firebase";

export const load: PageLoad = async ({ params }) => {
  // firebase query to get all the documents in the collection with pageType: "Cojín" or "Funda de Cojín"
  const q = query(
    collection(db, "catalogPages"),
    where("pageSubtitle", "in", ["Navideña", "Navideños", "Juego de Cocina"]),
    orderBy("pageSubtitle"), // This is required when using the 'in' operator
  );

  const querySnapshot = await getDocs(q);

  const products = querySnapshot.docs.map((doc) => doc.data());

  return {
    props: {
      products: products,
    },
  };
};
