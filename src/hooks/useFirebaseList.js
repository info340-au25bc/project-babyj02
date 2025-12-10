import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase.js";

export default function useFirebaseList(path) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const dbRef = ref(db, path);

    const unsubscribe = onValue(
      dbRef,
      (snapshot) => {
        const value = snapshot.val();
        if (!value) {
          setData([]);
        } else {
          const list = Object.entries(value).map(([id, item]) => ({
            id,
            ...item
          }));
          setData(list);
        }
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [path]);

  return { data, loading, error };
}
