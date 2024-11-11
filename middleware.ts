import { NextRequest, NextResponse } from "next/server";
import { LRUCache } from "lru-cache";

let cache = new LRUCache<string, number>({
  max: 128,
  ttl: 10_000,
  noUpdateTTL: true,
  updateAgeOnHas: true,
});

export default async function (request: NextRequest) {
  let signedIn = request.cookies.has("zid");
  let ip = request.ip ?? "NO-IP";

  let n = cache.get(ip) ?? 1;
  cache.set(ip, n + 1);

  if (n >= 40) {
    let headers = new Headers(request.headers);

    headers.set("x-rate-limited", "true");

    // Update the ttl after 40 requests have been exceeded in a 10 second span.
    cache.has(ip);

    return new NextResponse("null", {
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

  return NextResponse.next();
}
