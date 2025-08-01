"use client"

import type React from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, User, Settings, Menu, X } from "lucide-react"
import { useUser } from "@/lib/user-context"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { NotificationCenter } from "./notification-center"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const { currentUser, switchRole } = useUser()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigation = [
    { name: "Dashboard", href: "/", icon: "📊" },
    { name: "Assignments", href: "/assignments", icon: "📝" },
    ...(currentUser.role === "instructor"
      ? [
          { name: "Create Assignment", href: "/assignments/create", icon: "➕" },
          { name: "Review Submissions", href: "/submissions", icon: "📋" },
          { name: "Analytics", href: "/analytics", icon: "📈" },
        ]
      : [{ name: "My Submissions", href: "/my-submissions", icon: "📤" }]),
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Modern Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-white/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div className="ml-3">
                <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Assignment Portal
                </span>
                <div className="text-xs text-gray-500 font-medium">Modern Learning Platform</div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    pathname === item.href
                      ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/25"
                      : "text-gray-600 hover:text-gray-900 hover:bg-white/60 hover:shadow-sm"
                  }`}
                >
                  <span className="mr-2 text-base">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* User Info & Role Switcher */}
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-3">
                <NotificationCenter />
                <div className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-white/60 backdrop-blur-sm">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-semibold text-gray-900">{currentUser.name.split(" ")[0]}</div>
                    <Badge
                      variant={currentUser.role === "instructor" ? "default" : "secondary"}
                      className="text-xs px-2 py-0"
                    >
                      {currentUser.role}
                    </Badge>
                  </div>
                </div>

                <Select value={currentUser.role} onValueChange={(value: "instructor" | "student") => switchRole(value)}>
                  <SelectTrigger className="w-36 bg-white/60 backdrop-blur-sm border-white/20 hover:bg-white/80 transition-all">
                    <Settings className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-xl border-white/20">
                    <SelectItem value="instructor">Instructor</SelectItem>
                    <SelectItem value="student">Student</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 border-t border-white/20 mt-4 pt-4">
              <div className="space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      pathname === item.href
                        ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
                        : "text-gray-600 hover:bg-white/60"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="mr-3 text-base">{item.icon}</span>
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-white/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">{currentUser.name}</div>
                      <Badge variant={currentUser.role === "instructor" ? "default" : "secondary"} className="text-xs">
                        {currentUser.role}
                      </Badge>
                    </div>
                  </div>
                  <Select
                    value={currentUser.role}
                    onValueChange={(value: "instructor" | "student") => switchRole(value)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="instructor">Instructor</SelectItem>
                      <SelectItem value="student">Student</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="relative">{children}</main>
    </div>
  )
}
