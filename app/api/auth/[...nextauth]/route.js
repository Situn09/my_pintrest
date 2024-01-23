import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId:
        "1030235262357-k1qu4nnncichkgubk5l8smaqguoh6jo8.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
  secret: "hello1234567890",
  debug: true,
});

export { handler as GET, handler as POST };
