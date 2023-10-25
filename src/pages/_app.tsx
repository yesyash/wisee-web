import type { AppProps } from "next/app";

import { inter } from "@/fonts";
import { cn } from "@/utils/classname";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={cn("font-sans", inter.variable)}>
      <Component {...pageProps} />
    </div>
  );
}
