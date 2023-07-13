import Artists from "@/app/components/Artists";
import useMe from "@/app/lib/hooks/useMe";

export default async function Profile() {
  const user = useMe();

  return (
    <div className="">
      <h1 className="text-3xl p-4 mt-8">discover </h1>
      <Artists />
    </div>
  );
}
