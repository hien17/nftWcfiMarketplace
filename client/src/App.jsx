import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Navbar, Footer, Introduce, IntroduceImage } from "./components";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { WagmiConfig, createConfig, configureChains } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { bscTestnet } from "viem/chains";
import { MoralisProvider } from "react-moralis";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  NavLink,
  BrowserRouter,
} from "react-router-dom";
import { LandingPage, HomePage, MarketplacePage, AssetsPage } from "./pages";
import { ContextProvider } from "./context/Context";

const { publicClient, webSocketPublicClient } = configureChains(
  [bscTestnet],
  [publicProvider()]
);
const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
});

function App() {
  const client = new ApolloClient({
    uri: "https://api.studio.thegraph.com/query/47492/wc/version/latest",
    cache: new InMemoryCache(),
  });
  // return (
  //   <div className="">
  //     <Navbar></Navbar>
  //     <Introduce></Introduce>
  //     <IntroduceImage></IntroduceImage>
  //     <Footer>Footer</Footer>
  //   </div>
  // );
  return (
    <MoralisProvider initializeOnMount={false}>
      <ApolloProvider client={client}>
        <ContextProvider>
          <WagmiConfig config={config}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/marketplace" element={<MarketplacePage />} />
                <Route path="/assets" element={<AssetsPage />} />
              </Routes>
            </BrowserRouter>
          </WagmiConfig>
        </ContextProvider>
      </ApolloProvider>
    </MoralisProvider>
  );
}

export default App;
