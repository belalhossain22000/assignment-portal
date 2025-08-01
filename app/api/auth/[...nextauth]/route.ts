import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

// Simple in-memory user store for demo
const users = [
  { id: "1", email: "instructor@demo.com", password: "password", name: "John Instructor", role: "instructor" },
  { id: "2", email: "student@demo.com", password: "password", name: "Jane Student", role: "student" },
]

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        // Find existing user or create new one
        let user = users.find((u) => u.email === credentials.email && u.password === credentials.password)

        if (!user && credentials.role) {
          // Create new user for demo
          user = {
            id: String(users.length + 1),
            email: credentials.email,
            password: credentials.password,
            name: credentials.email.split("@")[0],
            role: credentials.role as string,
          }
          users.push(user)
        }

        if (user) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          }
        }
        return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        ;(session.user as any).id = token.sub
        ;(session.user as any).role = token.role
      }
      return session
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  secret: "your-secret-key-here-change-in-production",
})

export { handler as GET, handler as POST }
