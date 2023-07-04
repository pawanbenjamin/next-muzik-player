import Artists from "@/app/components/Artists";
import useMe from "@/app/lib/hooks/useMe";

export default async function Profile() {
  const user = useMe();

  return (
    <div className="bg-primary p-5">
      <h1 className="text-3xl">discover </h1>
      <Artists />
    </div>
  );
}
