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
        <div className="w-full mb-4 grid grid-rows-2 gap-x-4 grid-cols-2 md:grid-cols-3 md:grid-rows-1">
          <div className="flex text-muted text-xs mt-4 gap-y-0.5 flex-col overflow-clip text-nowrap [&>a]:after:content-[attr(href)] *:after:opacity-50 *:after:ml-1">
            <h3 className="text-subtle font-semibold">Site</h3>
            <a href="/" className="hover:underline">
              Main Page
            </a>
            <a href="/my/profile" className="hover:underline">
              Profile
            </a>
            <a href="/signup" className="hover:underline">
              Sign up
            </a>
            <a href="/search" className="hover:underline">
              Search
            </a>
            <a href="/blog" className="hover:underline">
              Blog
            </a>
          </div>
          <div className="flex text-muted text-xs mt-4 gap-y-0.5 flex-col overflow-clip text-nowrap [&>a]:after:content-[attr(href)] *:after:opacity-50 *:after:ml-1">
            <h3 className="text-subtle font-semibold">Legal</h3>
            <a href="/#buy" className="hover:underline">
              Privacy policy
            </a>
            <a href="/#buy" className="hover:underline">
              Terms
            </a>
          </div>
          <div className="flex text-muted text-xs mt-4 gap-y-0.5 flex-col overflow-clip text-nowrap [&>a]:after:content-[attr(href)] *:after:opacity-50 *:after:ml-1">
            <h3 className="text-subtle font-semibold">More by me</h3>
            <a href="https://petimagetolife.com" className="hover:underline">
              Pet images
            </a>
            <a href="https://kidsarttolife.com" className="hover:underline">
              Kids art to life
            </a>
            <a
              href="https://weddingphotostolife.com"
              className="hover:underline"
            >
              Wedding photos
            </a>
          </div>
        </div>
      </footer>
    </Container>
  );
}
