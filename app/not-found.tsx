import { LinkButton } from "@/app/components/button";
import { ArrowLeft } from "lucide-react";
import dynamic from "next/dynamic";

let Donut = dynamic(() => import("@/app/donut"), {
  ssr: false,
  loading() {
    return <></>
  }
});

export default function () {
  return (
    <div className="w-screen bg-white dark:bg-black h-screen grid place-items-center overflow-x-hidden">
      <div>
        <h1 className="text-center font-thin text-3xl font-mono">
          404 - Not Found
        </h1>
        <LinkButton
          href="/"
          className="font-mono justify-start my-4 px-3 mx-auto w-fit gap-2"
          variant="text"
        >
          <ArrowLeft className="stroke-[3px] stroke-muted w-3" />
          Back
        </LinkButton>
        <div className="w-[30rem] invert dark:filter-none opacity-50 h-[30rem]">
          <Donut />
        </div>
      </div>
    </div>
  );
}
