import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import FloatingActions from "./FloatingActions";
import FlashMessage from "@/components/ui/FlashMessage";
import CookieConsent from "./CookieConsent";



interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    
    <div className="min-h-screen flex flex-col">
      <Header />
      <FlashMessage />
     <main className="flex-1">{children}</main>
      <Footer />
      <FloatingActions />
      <CookieConsent />
    </div>
  );
};

export default Layout;  
