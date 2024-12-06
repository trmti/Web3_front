import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "./_component/Header";
import { TanstackProvider } from "./_provider/TanstackProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TanstackProvider>
      <html
        lang="jp"
        style={{ height: "100%" }}
        title="Decentra Love | MOAによる分散AIプラットフォーム"
      >
        <head>
          <title>Decentra Love | MOAによる分散AIプラットフォーム</title>
        </head>
        <body className={inter.className} style={{ height: "100%" }}>
          <Header />
          {children}
        </body>
      </html>
    </TanstackProvider>
  );
}
