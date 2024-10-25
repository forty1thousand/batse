import { NextRequest, NextResponse } from "next/server";

export default function (request: NextRequest) {
  const signedIn = request.cookies.has("zid");

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
