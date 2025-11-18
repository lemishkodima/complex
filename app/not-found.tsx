"use client";
import React from "react";
import NotFound from "@/components/notfound/NotFound";
import ParallaxText from "@/components/ui/scroll-carousel/ScrollableCarousel";
import Navbar from "@/components/shared/navbar/Navbar";
import Footer from "@/components/shared/footer/Footer";
import { CursorProvider } from "@/providers/CursorProvide";

function NotFoundPage() {
  return (
    <>
      <CursorProvider>
        <Navbar />
        <main className="min-h-screen pt-10 ">
          <ParallaxText baseVelocity={-1}>
            <div className="flex gap-2.5">
              Page Not Found
              <span className="text-gold underline ml-5">404</span>
            </div>
          </ParallaxText>
          <NotFound />
        </main>
        <Footer />
      </CursorProvider>
    </>
  );
}

export default NotFoundPage;
