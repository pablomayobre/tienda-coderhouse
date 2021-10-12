import { Box } from "@chakra-ui/react";
import { Suspense } from "react";
import { PageLoading } from "../api";

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
      paddingBottom={{base: 12, md: 0}}
    >
      <Suspense fallback={<PageLoading/>}>{children}</Suspense>
    </Box>
  );
};
