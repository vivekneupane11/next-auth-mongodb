import { withAuth } from "next-auth/middleware"

export default withAuth(
  async function middleware(req) {
    console.log(2)
    
   
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

