import {
  createContext,
  SetStateAction,
  Dispatch,
  Suspense,
  useState,
  useEffect,
  useContext,
} from "react";
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

const LoadingIndicatorContext = createContext<
  [number, Dispatch<SetStateAction<number>>]
>([0, () => {}]);

const LoadingIndicator = ({ children }: { children?: React.ReactNode }) => {
  const state = useState(0);
  return (
    <LoadingIndicatorContext.Provider value={state}>
      {children}
    </LoadingIndicatorContext.Provider>
  );
};

export const PageLoading = () => {
  const [, loading] = useContext(LoadingIndicatorContext);

  useEffect(() => {
    loading((value) => value++);

    return () => loading((value) => value--);
  }, [loading]);

  return <></>;
};

export const useIsLoading = () => {
  const [loading] = useContext(LoadingIndicatorContext);

  return loading > 0;
};

export const ApiProvider = ({ children }: { children?: React.ReactNode }) => {
  return (
    <LoadingIndicator>
      <Suspense fallback={<><PageLoading /><PageSkeleton/></>}>
        <FirebaseAppProvider firebaseConfig={firebaseConfig} suspense={true}>
          <Authentication>
            <Firestore>{children}</Firestore>
          </Authentication>
        </FirebaseAppProvider>
      </Suspense>
    </LoadingIndicator>
  );
};
