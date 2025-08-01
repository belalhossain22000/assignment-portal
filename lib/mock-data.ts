import type { Assignment, Submission, User } from "./types"

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@university.edu",
    role: "INSTRUCTOR",
  },
  {
    id: "2",
    name: "Alex Chen",
    email: "alex.chen@student.edu",
    role: "STUDENT",
  },
  {
    id: "3",
    name: "Maria Rodriguez",
    email: "maria.rodriguez@student.edu",
    role: "STUDENT",
  },
  {
    id: "4",
    name: "James Wilson",
    email: "james.wilson@student.edu",
    role: "STUDENT",
  },
]

export const mockAssignments: Assignment[] = [
  {
    id: "1",
    title: "React Components Library",
    description:
      "Build a comprehensive React components library with TypeScript. Include at least 10 reusable components with proper documentation, unit tests, and Storybook integration. Focus on accessibility and responsive design.",
    deadline: "2024-02-20",
    createdBy: "1",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    title: "Database Design Project",
    description:
      "Design and implement a normalized database schema for an e-commerce platform. Include ERD diagrams, SQL scripts for table creation, sample data insertion, and complex queries demonstrating joins and aggregations.",
    deadline: "2024-02-25",
    createdBy: "1",
    createdAt: "2024-01-20",
  },
  {
    id: "3",
    title: "RESTful API Development",
    description:
      "Create a complete RESTful API using Node.js and Express. Implement authentication, CRUD operations, error handling, input validation, and comprehensive API documentation using Swagger.",
    deadline: "2024-03-01",
    createdBy: "1",
    createdAt: "2024-01-25",
  },
  {
    id: "4",
    title: "Machine Learning Model",
    description:
      "Develop a machine learning model for predicting house prices. Use Python with scikit-learn, perform data preprocessing, feature engineering, model training, and evaluation with proper documentation.",
    deadline: "2024-03-05",
    createdBy: "1",
    createdAt: "2024-02-01",
  },
  {
    id: "5",
    title: "Mobile App Prototype",
    description:
      "Design and prototype a mobile application using React Native or Flutter. Include user authentication, data persistence, API integration, and at least 5 functional screens with navigation.",
    deadline: "2024-03-10",
    createdBy: "1",
    createdAt: "2024-02-05",
  },
]

export const mockSubmissions: Submission[] = [
  {
    id: "1",
    assignmentId: "1",
    studentId: "2",
    studentName: "Alex Chen",
    studentEmail: "alex.chen@student.edu",
    submissionUrl: "https://github.com/alexchen/react-components-lib",
    note: "Completed all 12 components with full TypeScript support, comprehensive tests, and Storybook documentation. Added bonus dark mode theme support.",
    status: "accepted",
    feedback:
      "Excellent work! Your component library is well-structured and thoroughly documented. The TypeScript implementation is solid and the test coverage is impressive. Great job on the accessibility features.",
    submittedAt: "2024-02-18",
  },
  {
    id: "2",
    assignmentId: "1",
    studentName: "Maria Rodriguez",
    studentId: "3",
    studentEmail: "maria.rodriguez@student.edu",
    submissionUrl: "https://github.com/maria/component-library",
    note: "Built 10 components as required. Focused on responsive design and included basic documentation.",
    status: "pending",
    submittedAt: "2024-02-19",
  },
  {
    id: "3",
    assignmentId: "2",
    studentId: "2",
    studentName: "Alex Chen",
    studentEmail: "alex.chen@student.edu",
    submissionUrl: "https://drive.google.com/file/d/database-design-project",
    note: "Complete database design with ERD, normalization to 3NF, sample data, and 15 complex queries. Included performance optimization suggestions.",
    status: "accepted",
    feedback:
      "Outstanding database design! Your ERD is clear and well-normalized. The sample queries demonstrate excellent understanding of SQL concepts.",
    submittedAt: "2024-02-23",
  },
  {
    id: "4",
    assignmentId: "1",
    studentId: "4",
    studentName: "James Wilson",
    studentEmail: "james.wilson@student.edu",
    submissionUrl: "https://github.com/james/react-components",
    note: "Basic implementation of required components. Some components may need refinement.",
    status: "rejected",
    feedback:
      "The components are missing TypeScript implementation and proper documentation. Several components don't handle edge cases properly. Please revise and resubmit.",
    submittedAt: "2024-02-17",
  },
  {
    id: "5",
    assignmentId: "3",
    studentId: "3",
    studentName: "Maria Rodriguez",
    studentEmail: "maria.rodriguez@student.edu",
    submissionUrl: "https://github.com/maria/api-project",
    note: "RESTful API with JWT authentication, full CRUD operations, and Swagger documentation. Deployed on Heroku for testing.",
    status: "accepted",
    feedback:
      "Great API implementation! Clean code structure, proper error handling, and excellent documentation. The deployment shows good understanding of DevOps practices.",
    submittedAt: "2024-02-28",
  },
  {
    id: "6",
    assignmentId: "2",
    studentId: "4",
    studentName: "James Wilson",
    studentEmail: "james.wilson@student.edu",
    submissionUrl: "https://drive.google.com/file/d/db-project-james",
    note: "Database schema with basic ERD and some sample queries.",
    status: "pending",
    submittedAt: "2024-02-24",
  },
  {
    id: "7",
    assignmentId: "4",
    studentId: "2",
    studentName: "Alex Chen",
    studentEmail: "alex.chen@student.edu",
    submissionUrl: "https://github.com/alexchen/ml-house-prices",
    note: "Complete ML pipeline with data preprocessing, feature engineering, multiple model comparisons, and detailed analysis report.",
    status: "pending",
    submittedAt: "2024-03-03",
  },
]
