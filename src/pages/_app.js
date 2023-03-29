import "@/styles/globals.css";
import NavBar from "../components/NavBar";
import { DataProvider } from "../components/dataProvider";

export default function App({ Component, pageProps }) {
  return (
    <>
      <DataProvider>
        <NavBar />
        <Component {...pageProps} />
      </DataProvider>
    </>
  );
}
