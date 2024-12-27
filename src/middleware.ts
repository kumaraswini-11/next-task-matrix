// export { auth as middleware } from "@/auth";

import { auth } from "@/auth";

export default auth((req) => {
  console.log("Auth middleware test :: ", req);
  if (!req.auth && req.nextUrl.pathname !== "/sign-in") {
    const newUrl = new URL("/sign-in", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});
