import type { PageLoad } from "./$types";
import { collection, query, getDocs, where, orderBy } from "firebase/firestore";
import { db } from "$lib/firebase";

export const load: PageLoad = async ({ params }) => {
  // firebase query to get all the documents in the collection with pageType: "Cojín" or "Funda de Cojín"
  const q = query(
    collection(db, "catalogPages"),
    where("pageType", "==", "Almohadas"),
  );
  const pageQ = query(
    collection(db, "catalogPages"),
    where("pageCategory", "==", "Intro de Almohadas"),
  );

  const querySnapshot = await getDocs(q);
  const pageQuerySnapshot = await getDocs(pageQ);

  const products = querySnapshot.docs
    .map((doc) => doc.data())
    .filter((product) => product.pageCategory !== "Intro de Almohadas");

  const page = pageQuerySnapshot.docs.map((doc) => doc.data());

  return {
    props: {
      products: products,
      page: page,
    },
  };
};
