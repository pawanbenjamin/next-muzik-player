import Artists from "@/app/components/Artists";
import useMe from "@/app/lib/hooks/useMe";

export default async function Profile() {
  const user = useMe();

  return (
    <div className="">
      <p>Welcome to Your Profile Page {JSON.stringify(user, null, 2)}!</p>
      <Artists />
    </div>
  );
}
