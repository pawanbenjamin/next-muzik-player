import EZStoreProvider from "../components/StoreProvider";
import Sidebar from "../components/Sidebar";

import Player from "../components/Player";
import Nav from "../components/Nav";

type Props = {
  children?: React.ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="grid grid-cols-layout grid-rows-layout h-screen p-4 gap-1%">
      <EZStoreProvider>
        <Sidebar />
        <div className="bg-secondary rounded-lg p-4">
          {/* <Nav /> */}
          {children}
        </div>

        <Player />
      </EZStoreProvider>
    </div>
  );
}
