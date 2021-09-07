import { Box } from "@chakra-ui/react";
import { Suspense } from "react";

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Box
      marginTop="header"
      paddingTop={4}
      maxWidth="container.lg"
      marginLeft="auto"
      marginRight="auto"
    >
      <Suspense fallback={<></>}>{children}</Suspense>
    </Box>
  );
};
