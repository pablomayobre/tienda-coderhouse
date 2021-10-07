import { Suspense } from "react";
import { getAuth } from "firebase/auth";
import {
  enableIndexedDbPersistence,
  initializeFirestore,
} from "firebase/firestore";
import {
  AuthProvider,
  FirebaseAppProvider,
  FirestoreProvider,
  useFirebaseApp,
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
      console.error(e);
    }
    return db;
  });

  return (
    <FirestoreProvider sdk={firestoreInstance}>{children}</FirestoreProvider>
  );
};

const Authentication = ({ children }: { children?: React.ReactNode }) => {
  const app = useFirebaseApp();
  const auth = getAuth(app);

  return <AuthProvider sdk={auth}>{children}</AuthProvider>;
};

export const ApiProvider = ({ children }: { children?: React.ReactNode }) => {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <FirebaseAppProvider firebaseConfig={firebaseConfig} suspense={true}>
        <Authentication>
          <Firestore>{children}</Firestore>
        </Authentication>
      </FirebaseAppProvider>
    </Suspense>
  );
};
