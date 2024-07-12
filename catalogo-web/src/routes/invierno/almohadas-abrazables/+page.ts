import type { PageLoad } from "./$types";
import { collection, query, getDocs, where, orderBy } from "firebase/firestore";
import { db } from "$lib/firebase";

export const load: PageLoad = async ({ params }) => {
  // firebase query to get all the documents in the collection with pageType: "Cojín" or "Funda de Cojín"
  const q = query(
    collection(db, "catalogPages"),
    where("pageSeoTitle", "==", "Almohadas Abrazables"),
  );

  const querySnapshot = await getDocs(q);

  const products = querySnapshot.docs
    .map((doc) => doc.data())
    .filter((product) => product.pageSeoTitle !== "Cojines Navideños");

  return {
    props: {
      products: products,
    },
  };
};
