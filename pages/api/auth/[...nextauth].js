import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Username",
        },
        password: {
          label: "Password",
          type: "Password",
        },
      },
      async authorize(credentials) {
        if (
          credentials.username == process.env.ADMIN_USERNAME &&
          credentials.password == process.env.ADMIN_PASSWORD
        ) {
          return {
            id: 1,
            name: process.env.ADMIN_USERNAME,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.id = token.id;
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    secret: "test",
    encryption: true,
  },
  pages: {
    signIn: "/login",
  },
};

export default NextAuth(authOptions);
