"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis } from "recharts"
import { Plus, FileText, Clock, CheckCircle, XCircle, TrendingUp, Users, ArrowUpRight, Sparkles } from "lucide-react"
import { useUser } from "@/lib/user-context"
import { mockAssignments, mockSubmissions } from "@/lib/mock-data"
import Link from "next/link"

const COLORS = {
  pending: "#f59e0b",
  accepted: "#10b981",
  rejected: "#ef4444",
}

export default function Dashboard() {
  const { currentUser } = useUser()

  // Calculate submission statistics
  const submissionStats = mockSubmissions.reduce(
    (acc, submission) => {
      acc[submission.status] = (acc[submission.status] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const chartData = [
    { name: "Pending", value: submissionStats.pending || 0, color: COLORS.pending },
    { name: "Accepted", value: submissionStats.accepted || 0, color: COLORS.accepted },
    { name: "Rejected", value: submissionStats.rejected || 0, color: COLORS.rejected },
  ]

  // Get user-specific data
  const userSubmissions =
    currentUser.role === "student" ? mockSubmissions.filter((s) => s.studentId === currentUser.id) : mockSubmissions

  const userAssignments = mockAssignments

  // Assignment completion data for bar chart
  const assignmentData = mockAssignments.map((assignment) => {
    const submissions = mockSubmissions.filter((s) => s.assignmentId === assignment.id)
    return {
      name: assignment.title.substring(0, 15) + "...",
      submissions: submissions.length,
      accepted: submissions.filter((s) => s.status === "accepted").length,
      pending: submissions.filter((s) => s.status === "pending").length,
      rejected: submissions.filter((s) => s.status === "rejected").length,
    }
  })

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-indigo-600/5 to-purple-600/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4 mr-2" />
              Welcome back, {currentUser.name.split(" ")[0]}!
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-4">
              {currentUser.role === "instructor" ? "Instructor Dashboard" : "Student Dashboard"}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {currentUser.role === "instructor"
                ? "Manage assignments, review submissions, and track student progress with powerful analytics."
                : "Track your assignment progress, view feedback, and stay on top of your academic journey."}
            </p>
          </div>

          {/* Modern Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <Card className="relative overflow-hidden bg-gradient-to-br from-white to-blue-50/50 border-0 shadow-xl shadow-blue-500/10">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-full -mr-10 -mt-10" />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold text-gray-700">Total Assignments</CardTitle>
                <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg">
                  <FileText className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">{userAssignments.length}</div>
                <p className="text-xs text-gray-600 mt-1">
                  {currentUser.role === "instructor" ? "Created by you" : "Available to you"}
                </p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden bg-gradient-to-br from-white to-yellow-50/50 border-0 shadow-xl shadow-yellow-500/10">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full -mr-10 -mt-10" />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold text-gray-700">Pending</CardTitle>
                <div className="p-2 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg">
                  <Clock className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-yellow-600">{submissionStats.pending || 0}</div>
                <p className="text-xs text-gray-600 mt-1">Awaiting review</p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden bg-gradient-to-br from-white to-green-50/50 border-0 shadow-xl shadow-green-500/10">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full -mr-10 -mt-10" />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold text-gray-700">Accepted</CardTitle>
                <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">{submissionStats.accepted || 0}</div>
                <p className="text-xs text-gray-600 mt-1">Successfully completed</p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden bg-gradient-to-br from-white to-red-50/50 border-0 shadow-xl shadow-red-500/10">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-full -mr-10 -mt-10" />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold text-gray-700">Rejected</CardTitle>
                <div className="p-2 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg">
                  <XCircle className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red-600">{submissionStats.rejected || 0}</div>
                <p className="text-xs text-gray-600 mt-1">Need revision</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recent Assignments */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold text-gray-900">Recent Assignments</CardTitle>
                  <CardDescription className="text-gray-600">
                    {currentUser.role === "instructor" ? "Your latest assignments" : "Available assignments"}
                  </CardDescription>
                </div>
                {currentUser.role === "instructor" && (
                  <Link href="/assignments/create">
                    <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/25">
                      <Plus className="w-4 h-4 mr-2" />
                      Create New
                    </Button>
                  </Link>
                )}
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userAssignments.slice(0, 3).map((assignment) => {
                    const userSubmission = userSubmissions.find((s) => s.assignmentId === assignment.id)
                    const isOverdue = new Date(assignment.deadline) < new Date()
                    const assignmentSubmissions = mockSubmissions.filter((s) => s.assignmentId === assignment.id)

                    return (
                      <div
                        key={assignment.id}
                        className="group relative p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:shadow-lg hover:shadow-gray-500/10 transition-all duration-300"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                {assignment.title}
                              </h3>
                              {isOverdue && (
                                <Badge variant="destructive" className="shadow-sm">
                                  Overdue
                                </Badge>
                              )}
                              {currentUser.role === "student" && userSubmission && (
                                <Badge
                                  variant={
                                    userSubmission.status === "accepted"
                                      ? "default"
                                      : userSubmission.status === "rejected"
                                        ? "destructive"
                                        : "secondary"
                                  }
                                  className="shadow-sm"
                                >
                                  {userSubmission.status}
                                </Badge>
                              )}
                            </div>
                            <p className="text-gray-600 mb-4 line-clamp-2">{assignment.description}</p>
                            <div className="flex items-center justify-between text-sm text-gray-500">
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-2" />
                                Due: {new Date(assignment.deadline).toLocaleDateString()}
                              </div>
                              {currentUser.role === "instructor" && (
                                <div className="flex items-center">
                                  <Users className="w-4 h-4 mr-2" />
                                  {assignmentSubmissions.length} submissions
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-2 ml-6">
                            {currentUser.role === "student" && !userSubmission && !isOverdue && (
                              <Link href={`/assignments/${assignment.id}/submit`}>
                                <Button size="sm" className="shadow-sm">
                                  Submit
                                  <ArrowUpRight className="w-3 h-3 ml-1" />
                                </Button>
                              </Link>
                            )}
                            {currentUser.role === "instructor" && (
                              <Link href={`/assignments/${assignment.id}/review`}>
                                <Button size="sm" variant="outline" className="shadow-sm bg-transparent">
                                  Review ({assignmentSubmissions.length})
                                </Button>
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div className="mt-6">
                  <Link href="/assignments">
                    <Button variant="outline" className="w-full bg-white/60 backdrop-blur-sm hover:bg-white shadow-sm">
                      View All Assignments
                      <ArrowUpRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Assignment Progress Chart */}
            {currentUser.role === "instructor" && (
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900">Assignment Progress</CardTitle>
                  <CardDescription className="text-gray-600">Submission status breakdown by assignment</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={assignmentData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="accepted" stackId="a" fill="#10b981" name="Accepted" radius={[0, 0, 4, 4]} />
                        <Bar dataKey="pending" stackId="a" fill="#f59e0b" name="Pending" />
                        <Bar dataKey="rejected" stackId="a" fill="#ef4444" name="Rejected" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Student Submissions */}
            {currentUser.role === "student" && (
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900">My Recent Submissions</CardTitle>
                  <CardDescription className="text-gray-600">
                    Track your assignment submissions and feedback
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userSubmissions.slice(0, 4).map((submission) => {
                      const assignment = mockAssignments.find((a) => a.id === submission.assignmentId)
                      return (
                        <div
                          key={submission.id}
                          className="p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="font-semibold text-gray-900">{assignment?.title}</h3>
                            <Badge
                              variant={
                                submission.status === "accepted"
                                  ? "default"
                                  : submission.status === "rejected"
                                    ? "destructive"
                                    : "secondary"
                              }
                              className="shadow-sm"
                            >
                              {submission.status === "accepted" && <CheckCircle className="w-3 h-3 mr-1" />}
                              {submission.status === "rejected" && <XCircle className="w-3 h-3 mr-1" />}
                              {submission.status === "pending" && <Clock className="w-3 h-3 mr-1" />}
                              {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{submission.note}</p>
                          <a
                            href={submission.submissionUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center"
                          >
                            View Submission
                            <ArrowUpRight className="w-3 h-3 ml-1" />
                          </a>
                          {submission.feedback && (
                            <div className="mt-4 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                              <p className="text-sm text-blue-900">
                                <strong className="text-blue-700">Feedback:</strong> {submission.feedback}
                              </p>
                            </div>
                          )}
                          <p className="text-xs text-gray-500 mt-3">
                            Submitted: {new Date(submission.submittedAt).toLocaleDateString()}
                          </p>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Pie Chart */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">Submission Overview</CardTitle>
                <CardDescription className="text-gray-600">Distribution of all submission statuses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}`}
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-blue-50/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {currentUser.role === "instructor" ? (
                  <>
                    <Link href="/assignments/create">
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/25">
                        <Plus className="w-4 h-4 mr-2" />
                        Create Assignment
                      </Button>
                    </Link>
                    <Link href="/submissions">
                      <Button
                        variant="outline"
                        className="w-full bg-white/60 backdrop-blur-sm hover:bg-white shadow-sm"
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Review Submissions
                      </Button>
                    </Link>
                    <Link href="/assignments">
                      <Button
                        variant="outline"
                        className="w-full bg-white/60 backdrop-blur-sm hover:bg-white shadow-sm"
                      >
                        <TrendingUp className="w-4 h-4 mr-2" />
                        View All Assignments
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/assignments">
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/25">
                        <FileText className="w-4 h-4 mr-2" />
                        Browse Assignments
                      </Button>
                    </Link>
                    <Link href="/my-submissions">
                      <Button
                        variant="outline"
                        className="w-full bg-white/60 backdrop-blur-sm hover:bg-white shadow-sm"
                      >
                        <Clock className="w-4 h-4 mr-2" />
                        My Submissions
                      </Button>
                    </Link>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockSubmissions
                    .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
                    .slice(0, 5)
                    .map((submission) => {
                      const assignment = mockAssignments.find((a) => a.id === submission.assignmentId)
                      return (
                        <div
                          key={submission.id}
                          className="flex items-center space-x-4 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                        >
                          <div
                            className={`w-3 h-3 rounded-full ${
                              submission.status === "accepted"
                                ? "bg-green-500"
                                : submission.status === "rejected"
                                  ? "bg-red-500"
                                  : "bg-yellow-500"
                            }`}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 truncate">{submission.studentName}</p>
                            <p className="text-sm text-gray-600 truncate">{assignment?.title}</p>
                          </div>
                          <span className="text-xs text-gray-500 whitespace-nowrap">
                            {new Date(submission.submittedAt).toLocaleDateString()}
                          </span>
                        </div>
                      )
                    })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
