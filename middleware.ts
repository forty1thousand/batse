import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

// let ratelimit = new Ratelimit({
//   redis,
//   limiter: Ratelimit.slidingWindow(15, "1500ms"),
// });

let redis = Redis.fromEnv();

let ratelimit = new Ratelimit({
  limiter: Ratelimit.cachedFixedWindow(36, "11s"),
  redis,
});

export default async function (request: NextRequest) {
  let signedIn = request.cookies.has("zid");
  let ip = request.ip ?? "null";

  let { success, remaining } = await ratelimit.limit(ip);

  console.log(ip, success, remaining);

  if (!success) {
    return NextResponse.next({ status: 429 });
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
