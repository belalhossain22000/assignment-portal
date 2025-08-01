"use client"

import type React from "react"

import { createContext, useContext, useState } from "react"
import type { User } from "./types"
import { mockUsers } from "./mock-data"

interface UserContextType {
  currentUser: User
  setCurrentUser: (user: User) => void
  switchRole: (role: "instructor" | "student") => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User>(mockUsers[0]) // Default to instructor

  const switchRole = (role: "instructor" | "student") => {
    const user = mockUsers.find((u) => u.role === role) || mockUsers[0]
    setCurrentUser(user)
  }

  return <UserContext.Provider value={{ currentUser, setCurrentUser, switchRole }}>{children}</UserContext.Provider>
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
