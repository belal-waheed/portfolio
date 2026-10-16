import { Outlet } from 'react-router';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  onOpenResume?: () => void;
}

export function Layout({ onOpenResume }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-zinc-950 text-zinc-100">
      {/* Ambient Dark Obsidian Mesh Background */}
      <div className="ambient-mesh-bg" />
      
      {/* Header */}
      <Header onOpenResume={onOpenResume} />
      
      {/* Main Content */}
      <main className="flex-1 relative z-10">
        <Outlet />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Layout;
