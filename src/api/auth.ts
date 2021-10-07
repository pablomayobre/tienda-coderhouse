import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useCallback } from "react";
import { useAuth, useSigninCheck } from "reactfire";

export const useSignOut = () => {
  const auth = useAuth();

  return useCallback(() => auth.signOut(), [auth]);
}

export const useSignIn = () => {
  const auth = useAuth();

  return useCallback(async () => {
    const provider = new GoogleAuthProvider();

    await signInWithPopup(auth, provider);
  }, [auth]);
};

export const useIsSignedIn = () => {
  const { data: signInCheckResult } = useSigninCheck();

  return signInCheckResult.signedIn === true
}

export const AuthWrapper = ({
  children,
  fallback,
}: React.PropsWithChildren<{ fallback: JSX.Element }>): JSX.Element => {
  const signedIn = useIsSignedIn();

  if (!children) {
    throw new Error("Children must be provided");
  }

  if (signedIn) {
    return children as JSX.Element;
  } else {
    return fallback;
  }
};
