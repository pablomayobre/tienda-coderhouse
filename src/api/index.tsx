import {
  collection,
  enableIndexedDbPersistence,
  initializeFirestore,
  query,
  where,
  limit,
  QueryConstraint,
} from "firebase/firestore";
import { Suspense } from "react";
import {
  FirebaseAppProvider,
  FirestoreProvider,
  useFirestore,
  useFirestoreCollectionData,
  useInitFirestore,
} from "reactfire";
import { FullItem } from "./types";
import { PageSkeleton } from "../components/PageSkeleton";
import { firebaseConfig } from "./config";

const Firestore = ({ children }: { children?: React.ReactNode }) => {
  const { data: firestoreInstance } = useInitFirestore(async (firebaseApp) => {
    const db = initializeFirestore(firebaseApp, {});
    try {
      await enableIndexedDbPersistence(db);
    } catch (e) {
      console.error(e)
    }
    return db;
  });

  return (
    <FirestoreProvider sdk={firestoreInstance}>{children}</FirestoreProvider>
  );
};

export const ApiProvider = ({ children }: { children?: React.ReactNode }) => {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <FirebaseAppProvider firebaseConfig={firebaseConfig} suspense={true}>
        <Firestore>{children}</Firestore>
      </FirebaseAppProvider>
    </Suspense>
  );
};

export const useItems = (
  category?: string,
  otherConstraints?: QueryConstraint[]
) => {
  const firestore = useFirestore();

  let condition: QueryConstraint;

  switch (category) {
    case "all":
    case undefined:
      condition = where("id", "!=", null);
      break;
    case "other":
      condition = where("categories", "==", []);
      break;
    default:
      console.log(category);
      condition = where("categories", "array-contains", category);
      break;
  }

  const itemsCollection = collection(firestore, "items");

  const { data } = useFirestoreCollectionData(
    query(itemsCollection, condition, ...(otherConstraints ?? [])),
    // { idField: "id" }
  );

  console.log(data)

  return { items: (data ?? []) as FullItem[] };
};

export const useItem = (id: string) => {
  const firestore = useFirestore();
  const itemsCollection = collection(firestore, "items");

  const { data } = useFirestoreCollectionData(
    query(itemsCollection, where("id", "==", id), limit(1)),
    // { idField: "id" }
  );

  return { item: (data?.[0] as FullItem | undefined) ?? null };
};
