import { NextRequest } from "next/server";

export const middleware = (req: NextRequest) => {
  console.log("req url: ", req.nextUrl.pathname);
};

export const config = {
  matcher: ["/api", "/", "/create-feedback", "/admin"],
};
