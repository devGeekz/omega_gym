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
        <main className="relative z-10 grow">{children}</main>
      </BackgroundComponent>
    </div>
  );
}
