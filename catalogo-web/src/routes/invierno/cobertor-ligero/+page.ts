import type { PageLoad } from "./$types";
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "$lib/firebase";

let product: any = null;

export const load: PageLoad = async ({ params }) => {
  // firebase query to get all the documents in the collection that match the field value pageType: "Coberot Austral"
  const q = query(
    collection(db, "catalogPages"),
    where("pageType", "==", "Cobertor Ligero"),
    where("pageCategory", "==", "Cobertor"),
  );
  const querySnapshot = await getDocs(q);
  var products: any = [];
  querySnapshot.forEach((doc) => {
    // map the document data to an array with the data of products
    products.push(doc.data());
  });

  return {
    props: {
      products: products,
    },
  };
};
