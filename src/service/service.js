import { db } from "../config/firebaseConfig";

export const colors = () => {
  const colorTab = [];
  db.collection("color")
    .get()
    .then(res => res.docs.map(doc => colorTab.push(doc.data().name)));
  return colorTab;
};
