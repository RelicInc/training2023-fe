import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { MetaInfo } from "@/components/common/meta-info";
const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <MetaInfo />
      <Component {...pageProps} />
    </>
  );
};

export default App;
