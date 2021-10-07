import { Header } from "./Header"
import { NavBar } from "./NavBar"

export const PageSkeleton = () => {
  return <>
    <Header isLoading>
      <NavBar isDisabled/>
    </Header>
  </>
}