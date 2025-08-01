"use client"

import {  signOut } from "next-auth/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen, LogOut, User } from "lucide-react"
import { getUserInfo } from "@/service/actions/auth.service"

export function Navbar() {
const user = getUserInfo();


  return (
    <nav className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold">Assignment Portal</span>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <Link href="/assignments">
              <Button variant="ghost">Assignments</Button>
            </Link>
            {user.role === "instructor" && (
              <Link href="/submissions">
                <Button variant="ghost">Submissions</Button>
              </Link>
            )}

            <div className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span className="text-sm">
                {user.name} ({user.role})
              </span>
            </div>

            <Button variant="outline" size="sm" onClick={() => signOut()}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
