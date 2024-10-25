import dynamic from "next/dynamic";

let Client = dynamic(() => import("@/app/(main)/search/client"), {
  ssr: false,
});

export default function () {
  return <Client />;
}
