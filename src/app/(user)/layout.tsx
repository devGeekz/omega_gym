import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { BackgroundComponent } from "@/components/ui/bckgrnd";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="">
      <BackgroundComponent>
        <Navbar />
        <main className="relative z-10 pt-40x px-x10 grow">{children}</main>
        <Footer />
      </BackgroundComponent>
    </div>
  );
}
