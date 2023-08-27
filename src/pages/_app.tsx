import type { AppProps } from "next/app";
import { Inter } from "next/font/google";

import { cn } from "@/utils/classname";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-inter" });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={cn("font-sans", inter.variable)}>
      <Component {...pageProps} />
    </div>
  );
}
