import { useEffect, useState } from "react";
import { useUser } from "reactfire";

export const useAvatar = () => {
  const { data: user } = useUser();

  const [image, setImage] = useState("");

  useEffect(() => {
    if (user?.photoURL) {
      const abort = new AbortController();

      fetch(user.photoURL, {
        referrerPolicy: "no-referrer",
        signal: abort.signal,
      })
        .then((resp) => resp.blob())
        .then((blob) => setImage(URL.createObjectURL(blob)))
        .catch(() => {});

      return () => abort.abort();
    }
  }, [user?.photoURL]);

  return image;
};
