import { withAuth } from "next-auth/middleware"

export default withAuth(
  async function middleware(req) {

      
    //it does check if jwt.verify token and also check the expiry date as it should
  //   const token = await getToken({req})
  //  if(!token) return NextResponse.redirect(new URL('/api/auth/signin',req.url))
  },
  {
    callbacks: {
      async authorized() {
        // This is a work-around for handling redirect on auth pages.
        // We return true here so that the middleware function above
        // is always called.
        return true
      },
    },
  }
)

