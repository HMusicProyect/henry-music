import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    console.log(req.nextauth.token)
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        if (token?.rol === "admin" || token?.rol === "gratis") {
          return true;
        } else {
          return false;
        }
      },
    },
  }
)

export const config = { 
    matcher: [
      "/home/userProfile/"
    ] 
  }