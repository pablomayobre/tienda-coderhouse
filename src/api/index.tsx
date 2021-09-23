import {
  enableIndexedDbPersistence,
  initializeFirestore,
} from "firebase/firestore";
import { Suspense } from "react";
import {
  FirebaseAppProvider,
  FirestoreProvider,
  useInitFirestore,
} from "reactfire";
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
