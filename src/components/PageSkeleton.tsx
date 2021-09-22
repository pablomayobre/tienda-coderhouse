import { Header } from "./Header"
import { NavBar } from "./NavBar"

export const PageSkeleton = () => {
  return <>
    <Header isLoading>
      <NavBar user={{name: "Usuario"}}/>
    </Header>
  </>
}