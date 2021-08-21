import { ChakraProvider } from "@chakra-ui/react";
import { Header } from "./components/header";

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <Header />
      </div>
    </ChakraProvider>
  );
}

export default App;
