import { Figtree } from 'next/font/google'
import Sidebar from '@/components/ui/sidebar/Sidebar';
import Player from '@/components/ui/player';


const inter = Figtree({ subsets: ["latin"] });

export const metadata = {
  title: "Henry Music",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className={`${inter.className} flex flex-col w-full h-screen gap-4 p-2 box-border`}>
        <Sidebar>
          {children}
        </Sidebar>
        <Player />
      </div>
  );
}
