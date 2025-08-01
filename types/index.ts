export interface User {
  id: string
  email: string
  name: string
  role: "instructor" | "student"
}

export interface Assignment {
  id: string
  title: string
  description: string
  deadline: string
  instructorId: string
  createdAt: string
}

export interface Submission {
  id: string
  assignmentId: string
  studentId: string
  studentName: string
  submissionUrl: string
  note: string
  status: "pending" | "accepted" | "rejected"
  feedback?: string
  submittedAt: string
}
