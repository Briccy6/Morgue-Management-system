import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionProviderWrapper from "@/utils/shared/SessionProviderWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Morgue management system",
  description:
    "A web-based morgue management system designed to streamline hospital mortality management and simplify the process for relatives to collect their deceased loved ones.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{String(metadata.title)}</title>
        <meta name="title" content={String(metadata.title)} />
        <meta name="description" content={String(metadata.description)} />
        <meta
          name="keywords"
          content="Morgue, Mortality, Rwanda, Hospital, Morgue management system"
        />
        <link rel="icon" type="image/png" href="/favicons/favicon.png" />
        <link
          rel="alternate icon"
          type="image/x-icon"
          href="/favicons/favicon.ico"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Gertuda-Valens" />
        <meta name="theme-color" content="#328ed9" />
      </head>
      <body className={inter.className}>
        <SessionProviderWrapper>{children}</SessionProviderWrapper>
      </body>
    </html>
  );
}
