import dynamic from "next/dynamic";

let Client = dynamic(() => import("@/app/(main)/purchase/client"), {
  ssr: false,
});

export default function () {
  return <Client />;
}
