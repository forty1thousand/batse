import { NextRequest, NextResponse } from "next/server";
import { LRUCache } from "lru-cache";

let cache = new LRUCache<string, number>({
  max: 128,
  ttl: 10_000,
  noUpdateTTL: true,
});

export default async function (request: NextRequest) {
  let signedIn = request.cookies.has("zid");
  let ip = request.ip ?? "NO-IP";

  let n = cache.get(ip) ?? 1;
  cache.set(ip, n + 1);

  console.log(ip, n, cache.size);

  if (n >= 38) {
    return new NextResponse("429 Too many requests.", {
      status: 429,
      headers: { "Content-Type": "text/plain" },
    });
  }

  if (
    ["/my", "/purchase"].some((url) =>
      request.nextUrl.pathname.startsWith(url)
    ) &&
    !signedIn
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  } else if (
    ["/signup"].some((url) => request.nextUrl.pathname.startsWith(url)) &&
    signedIn
  ) {
    return NextResponse.redirect(new URL("/my/profile", request.url));
  }

  return null;
}
