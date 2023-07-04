import EZStoreProvider from "../components/StoreProvider";
import Sidebar from "../components/Sidebar";

import Player from "../components/Player";
import Nav from "../components/Nav";

type Props = {
  children?: React.ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="bg-neutral font-mono grid grid-cols-layout grid-rows-layout h-screen">
      <EZStoreProvider>
        <Nav />
        <Sidebar />
        {children}
        <Player />
      </EZStoreProvider>
    </div>
  );
}
