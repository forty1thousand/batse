import { Container } from "@/app/components/container";
import Leaf from "@/app/components/leaf";
import { Line } from "@/app/components/line";

export default function ({ children }: React.PropsWithChildren) {
  return (
    <Container className="grid grid-rows-[1fr_auto] min-h-screen">
      {children}
      <footer className="self-end p-4 w-full mt-4">
        <div className="flex items-center">
          <p className="font-bold text-5xl leading-none">Batse</p>
          <Line className="flex-1 mx-4" />
          <Leaf className="fill-destructive stroke-transparent size-6" />
        </div>
        <ul className="flex text-muted text-xs mt-4 [&>*:nth-last-child(n+2)]:after:content-['—'] *:after:mx-2 ">
          <li>
            <a href="/" className="hover:underline">
              Main Page
            </a>
          </li>
          <li>
            <a href="/my/profile" className="hover:underline">
              Profile
            </a>
          </li>
          <li>
            <a href="/signup" className="hover:underline">
              Sign up
            </a>
          </li>
          <li>
            <a href="/search" className="hover:underline">
              Search
            </a>
          </li>
        </ul>
      </footer>
    </Container>
  );
}
