import EZStoreProvider from "../components/StoreProvider";
import Sidebar from "../components/Sidebar";
import useMe from "../lib/hooks/useMe";
import { redirect } from "next/navigation";

import Player from "../components/Player";
import Nav from "../components/Nav";

type Props = {
  children?: React.ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  const user = useMe();
  if (!user) {
    redirect("/");
  }
  return (
    <div className="grid grid-cols-layout grid-rows-layout h-screen p-4 gap-1%">
      <EZStoreProvider>
        <Sidebar />
        <div className="relative rounded-lg overflow-auto bg-secondary">
          <Nav />
          {children}
        </div>

        <Player />
      </EZStoreProvider>
    </div>
  );
}
