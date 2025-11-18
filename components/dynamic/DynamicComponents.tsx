"use client";

import dynamic from "next/dynamic";

export const DynamicCursor = dynamic(() => import("@/components/ui/cursor/Cursor"), {
  loading: () => <div className="h-[100px]"></div>,
  ssr: false,
});

export const DynamicNav = dynamic(() => import("@/components/shared/navbar/Navbar"), {
  loading: () => <div className="h-[100px]"></div>,
  ssr: false,
});
