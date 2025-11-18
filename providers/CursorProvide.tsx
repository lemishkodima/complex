"use client";
import { usePathname } from "next/navigation";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import "./i18n";
interface MyContextProps {
  children: ReactNode;
}

interface MyContextValue {
  isHoverElement: boolean;
  setHoverCursor: (value: boolean, rotation?: string) => void;
  rotation: string;
  pathNameAddress?: string;
  setPathName: (string: string) => void;
}

const MyContext = createContext<MyContextValue | undefined>(undefined);

export const CursorProvider: React.FC<MyContextProps> = ({ children }) => {
  const pathname = usePathname();
  const [rotation, setRotation] = useState("");
  const [pathNameAddress, setPathName] = useState(
    pathname?.replaceAll("/", "")
  );
  const [isHover, setIsHover] = useState(false);
  useEffect(() => {
    setHoverCursor(false);
  }, [pathname]);
  const setHoverCursor = (value = false, rot = "") => {
    setRotation(rot);
    setIsHover(() => value);
  };

  const contextValue: MyContextValue = {
    isHoverElement: isHover,
    setHoverCursor,
    rotation,
    pathNameAddress,
    setPathName,
  };

  return (
    <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
  );
};

export const useMyContext = (): MyContextValue => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyProvider");
  }
  return context;
};
