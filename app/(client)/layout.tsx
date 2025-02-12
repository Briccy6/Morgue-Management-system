import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import type React from "react";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div className="relative">
        <Navbar />
        <section>{children}</section>
      </div>
      <Footer />
    </div>
  );
}
