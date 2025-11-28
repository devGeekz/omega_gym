// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

// Custom payload type for JWT or session tokens
export interface UserPayload {
  userId: string;
  email?: string;
}

declare module "next-auth" {

  // Session interface is automatically injected into `req.session` when using NextAuth
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: string;
      image: string;
    };
  }

  // User interface, matches what is available in the session object or JWT token
  interface User {
    role?: string;            // Optional role because OAuth users might not have a role set
  }

  // JWT interface is used for the data passed to the client in a JWT token
  interface JWT {
    id: string;
    email: string;
    name: string;
    role?: string;            // Role is optional, since not all users will have this set initially
    image?: string;           // Optional image URL
  }
}
