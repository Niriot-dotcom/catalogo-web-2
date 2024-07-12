import type { PageLoad } from "./$types";
import {
  doc,
  getDoc,
  collection,
  query,
  getDocs,
  where,
} from "firebase/firestore";
import { db } from "../../../lib/firebase";

let product: any = null;

export const load: PageLoad = async ({ params }) => {
  let docId = "11617"; // get the document id from the route parameter
  const docRef = doc(db, "products", docId);
  const docSnap = await getDoc(docRef);

  // firebase query to get all the documents in the collection that match the field value pageType: "Coberot Austral"
  const q = query(
    collection(db, "catalogPages"),
    where("pageType", "==", "Cobertor Austral"),
  );
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {});

  if (docSnap.exists()) {
    product = docSnap.data();
  }

  return {
    props: {
      product: product,
    },
  };
};
