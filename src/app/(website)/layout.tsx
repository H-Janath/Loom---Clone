import React from "react";
import LandingPageNavBar from "./components/navbar";

type Props = {
  children: React.ReactNode; // Correct type for React children
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="container flex flex-col py-10 px-10 xl:px-0">
      <LandingPageNavBar />
      {children}
    </div>
  );
};

export default Layout;