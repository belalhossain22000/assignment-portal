export interface User {
  id: string
  name: string
  email: string
  role: "instructor" | "student"
}

export interface Assignment {
  id: string
  title: string
  description: string
  deadline: string
  createdBy: string
  createdAt: string
}

export interface Submission {
  id: string
  assignmentId: string
  studentId: string
  studentName: string
  studentEmail: string
  submissionUrl: string
  note: string
  status: "pending" | "accepted" | "rejected"
  feedback?: string
  submittedAt: string
}
