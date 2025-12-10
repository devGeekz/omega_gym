import Navbar from "@/components/layout/Navbar";
import { BackgroundComponent } from "@/components/ui/bckgrnd";
import { DashboardHeader } from "./dashboard/_components/DashboardHeader";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <BackgroundComponent>
      <Navbar />
      <main className="relative z-10 flex flex-col min-h-screen">
        <div className="w-full mt-28 md:mt-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 space-y-10">
            <DashboardHeader />
            {children}
          </div>
        </div>
      </main>
    </BackgroundComponent>
  );
}
