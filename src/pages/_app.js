import "@/styles/globals.css";
import Link from "next/link";

export default function App({ Component, pageProps }) {
  return (
    <>
      <nav className="flex justify-around">
        <Link href="/">
          <p>Home</p>
        </Link>
        <Link href="/createNFT">
          <p>Create NFT</p>
        </Link>
      </nav>
      <Component {...pageProps} />
    </>
  );
}
