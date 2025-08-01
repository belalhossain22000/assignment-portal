"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  CheckCircle,
  Calendar,
  FileText,
  Sparkles,
  Clock,
  BookOpen,
  Code,
  Palette,
  Calculator,
} from "lucide-react"
import { useUser } from "@/lib/user-context"

interface AssignmentTemplate {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  category: string
  estimatedTime: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  template: {
    title: string
    description: string
    requirements: string[]
    deliverables: string[]
    gradingCriteria: string[]
  }
}

const assignmentTemplates: AssignmentTemplate[] = [
  {
    id: "web-dev",
    name: "Web Development Project",
    description: "Full-stack web application with modern frameworks",
    icon: <Code className="w-5 h-5" />,
    category: "Programming",
    estimatedTime: "2-3 weeks",
    difficulty: "Intermediate",
    template: {
      title: "Full-Stack Web Application",
      description:
        "Build a complete web application using modern technologies including React, Node.js, and a database of your choice. The application should demonstrate your understanding of full-stack development principles, API design, and user experience.",
      requirements: [
        "Use React for the frontend with modern hooks and state management",
        "Implement a RESTful API using Node.js and Express",
        "Include user authentication and authorization",
        "Use a database (MongoDB, PostgreSQL, or MySQL)",
        "Implement responsive design principles",
        "Include proper error handling and validation",
      ],
      deliverables: [
        "Complete source code hosted on GitHub",
        "Live deployment (Vercel, Netlify, or Heroku)",
        "README with setup instructions and API documentation",
        "Demo video (5-10 minutes) showcasing key features",
      ],
      gradingCriteria: [
        "Code quality and organization (25%)",
        "Functionality and feature completeness (30%)",
        "User interface and experience (20%)",
        "Documentation and presentation (15%)",
        "Innovation and creativity (10%)",
      ],
    },
  },
  {
    id: "research-paper",
    name: "Research Paper",
    description: "Academic research with analysis and citations",
    icon: <BookOpen className="w-5 h-5" />,
    category: "Academic",
    estimatedTime: "3-4 weeks",
    difficulty: "Advanced",
    template: {
      title: "Research Paper on [Topic]",
      description:
        "Conduct comprehensive research on a topic of your choice within the course scope. Your paper should demonstrate critical thinking, proper research methodology, and clear academic writing.",
      requirements: [
        "Minimum 3000 words, maximum 5000 words",
        "At least 10 peer-reviewed sources",
        "Proper APA or MLA citation format",
        "Original thesis with supporting arguments",
        "Critical analysis of existing literature",
        "Conclusion with implications and future research directions",
      ],
      deliverables: [
        "Final research paper in PDF format",
        "Annotated bibliography",
        "Research proposal (submitted 2 weeks prior)",
        "Presentation slides for class discussion",
      ],
      gradingCriteria: [
        "Thesis clarity and originality (20%)",
        "Research depth and source quality (25%)",
        "Analysis and critical thinking (25%)",
        "Writing quality and organization (20%)",
        "Proper citations and formatting (10%)",
      ],
    },
  },
  {
    id: "design-portfolio",
    name: "Design Portfolio",
    description: "Creative portfolio showcasing design skills",
    icon: <Palette className="w-5 h-5" />,
    category: "Design",
    estimatedTime: "4-5 weeks",
    difficulty: "Intermediate",
    template: {
      title: "Digital Design Portfolio",
      description:
        "Create a comprehensive portfolio showcasing your design skills across multiple mediums. Include both personal and client work, demonstrating your creative process and technical abilities.",
      requirements: [
        "Minimum 8-10 design pieces across different categories",
        "Include process documentation for at least 3 projects",
        "Professional presentation format (website or PDF)",
        "Consistent branding and visual identity",
        "Case studies explaining design decisions",
        "Responsive design for web portfolios",
      ],
      deliverables: [
        "Complete portfolio website or PDF presentation",
        "Individual project files in original formats",
        "Process documentation and sketches",
        "Artist statement (500 words)",
        "Peer review of 2 other portfolios",
      ],
      gradingCriteria: [
        "Creative quality and originality (30%)",
        "Technical execution (25%)",
        "Portfolio presentation and organization (20%)",
        "Process documentation (15%)",
        "Professional presentation (10%)",
      ],
    },
  },
  {
    id: "data-analysis",
    name: "Data Analysis Project",
    description: "Statistical analysis with visualizations and insights",
    icon: <Calculator className="w-5 h-5" />,
    category: "Analytics",
    estimatedTime: "2-3 weeks",
    difficulty: "Intermediate",
    template: {
      title: "Data Analysis and Visualization Project",
      description:
        "Analyze a real-world dataset to extract meaningful insights and present your findings through compelling visualizations and statistical analysis.",
      requirements: [
        "Choose a dataset with at least 1000 records",
        "Perform exploratory data analysis (EDA)",
        "Apply appropriate statistical methods",
        "Create meaningful visualizations",
        "Use Python/R or similar tools",
        "Document your methodology and findings",
      ],
      deliverables: [
        "Jupyter notebook or R Markdown with complete analysis",
        "Executive summary (2-3 pages)",
        "Interactive dashboard or presentation",
        "Clean dataset and data dictionary",
        "Code repository with documentation",
      ],
      gradingCriteria: [
        "Data cleaning and preparation (20%)",
        "Statistical analysis accuracy (25%)",
        "Visualization quality and clarity (25%)",
        "Insights and interpretation (20%)",
        "Documentation and reproducibility (10%)",
      ],
    },
  },
]

export default function CreateAssignment() {
  const { currentUser } = useUser()
  const router = useRouter()
  const [selectedTemplate, setSelectedTemplate] = useState<AssignmentTemplate | null>(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [deadline, setDeadline] = useState("")
  const [estimatedHours, setEstimatedHours] = useState("")
  const [difficulty, setDifficulty] = useState("")
  const [category, setCategory] = useState("")
  const [requirements, setRequirements] = useState<string[]>([])
  const [deliverables, setDeliverables] = useState<string[]>([])
  const [gradingCriteria, setGradingCriteria] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [activeTab, setActiveTab] = useState("template")

  if (currentUser.role !== "instructor") {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardContent className="text-center p-8">
            <div className="text-red-500 mb-4">
              <FileText className="w-16 h-16 mx-auto" />
            </div>
            <h1 className="text-xl font-bold text-red-600 mb-2">Access Denied</h1>
            <p className="text-gray-600 mb-4">Only instructors can create assignments.</p>
            <Button onClick={() => router.push("/")}>Back to Dashboard</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const applyTemplate = (template: AssignmentTemplate) => {
    setSelectedTemplate(template)
    setTitle(template.template.title)
    setDescription(template.template.description)
    setRequirements(template.template.requirements)
    setDeliverables(template.template.deliverables)
    setGradingCriteria(template.template.gradingCriteria)
    setDifficulty(template.difficulty)
    setCategory(template.category)
    setActiveTab("details")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setSuccess(true)

      // Reset form and redirect after success
      setTimeout(() => {
        router.push("/assignments")
      }, 2000)
    }, 1500)
  }

  const minDate = new Date().toISOString().split("T")[0]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 via-blue-600/5 to-purple-600/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center mb-8">
            <Button variant="ghost" onClick={() => router.push("/assignments")} className="mr-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Assignments
            </Button>
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-green-100 to-blue-100 text-green-700 text-sm font-medium mb-4">
                <Sparkles className="w-4 h-4 mr-2" />
                Enhanced Assignment Creator
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-green-900 to-blue-900 bg-clip-text text-transparent mb-4">
                Create New Assignment
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl">
                Use our smart templates and advanced features to create engaging assignments that inspire learning.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 bg-white/60 backdrop-blur-sm">
            <TabsTrigger value="template">Choose Template</TabsTrigger>
            <TabsTrigger value="details">Assignment Details</TabsTrigger>
            <TabsTrigger value="preview">Preview & Publish</TabsTrigger>
          </TabsList>

          {/* Template Selection */}
          <TabsContent value="template" className="space-y-8">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">Choose a Template</CardTitle>
                <CardDescription>Start with a professionally designed template or create from scratch</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {assignmentTemplates.map((template) => (
                    <Card
                      key={template.id}
                      className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                        selectedTemplate?.id === template.id
                          ? "ring-2 ring-blue-500 bg-blue-50/50"
                          : "hover:shadow-blue-500/10"
                      }`}
                      onClick={() => applyTemplate(template)}
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg text-white">
                              {template.icon}
                            </div>
                            <div>
                              <CardTitle className="text-lg">{template.name}</CardTitle>
                              <CardDescription>{template.category}</CardDescription>
                            </div>
                          </div>
                          <Badge variant="secondary">{template.difficulty}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">{template.description}</p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {template.estimatedTime}
                          </div>
                          <Button size="sm" variant={selectedTemplate?.id === template.id ? "default" : "outline"}>
                            {selectedTemplate?.id === template.id ? "Selected" : "Use Template"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedTemplate(null)
                      setActiveTab("details")
                    }}
                    className="bg-white/60 backdrop-blur-sm"
                  >
                    Start from Scratch
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Assignment Details */}
          <TabsContent value="details" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Form */}
              <div className="lg:col-span-2">
                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="w-5 h-5 mr-2" />
                      Assignment Details
                    </CardTitle>
                    <CardDescription>
                      {selectedTemplate
                        ? `Customizing: ${selectedTemplate.name}`
                        : "Create your assignment from scratch"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {success && (
                      <Alert className="mb-6 border-green-200 bg-green-50">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <AlertDescription className="text-green-800">
                          Assignment created successfully! Redirecting to assignments page...
                        </AlertDescription>
                      </Alert>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="title">Assignment Title *</Label>
                          <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g., React Components Library Project"
                            required
                            disabled={isLoading || success}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="category">Category</Label>
                          <Select value={category} onValueChange={setCategory}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Programming">Programming</SelectItem>
                              <SelectItem value="Design">Design</SelectItem>
                              <SelectItem value="Academic">Academic</SelectItem>
                              <SelectItem value="Analytics">Analytics</SelectItem>
                              <SelectItem value="Research">Research</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Description *</Label>
                        <Textarea
                          id="description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="Describe the assignment requirements, objectives, and expectations..."
                          rows={6}
                          required
                          disabled={isLoading || success}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="deadline" className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            Deadline *
                          </Label>
                          <Input
                            id="deadline"
                            type="date"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                            min={minDate}
                            required
                            disabled={isLoading || success}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="estimatedHours">Estimated Hours</Label>
                          <Input
                            id="estimatedHours"
                            type="number"
                            value={estimatedHours}
                            onChange={(e) => setEstimatedHours(e.target.value)}
                            placeholder="20"
                            disabled={isLoading || success}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="difficulty">Difficulty Level</Label>
                          <Select value={difficulty} onValueChange={setDifficulty}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select difficulty" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Beginner">Beginner</SelectItem>
                              <SelectItem value="Intermediate">Intermediate</SelectItem>
                              <SelectItem value="Advanced">Advanced</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="flex gap-4 pt-4">
                        <Button
                          type="button"
                          onClick={() => setActiveTab("preview")}
                          className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                          disabled={!title || !description || !deadline}
                        >
                          Preview Assignment
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => router.push("/assignments")}
                          disabled={isLoading}
                          className="bg-white/60 backdrop-blur-sm"
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Template Info */}
                {selectedTemplate && (
                  <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-blue-50/30">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        {selectedTemplate.icon}
                        <span className="ml-2">Template: {selectedTemplate.name}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Category:</span>
                        <Badge variant="secondary">{selectedTemplate.category}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Difficulty:</span>
                        <Badge variant="outline">{selectedTemplate.difficulty}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Est. Time:</span>
                        <span className="text-sm font-medium">{selectedTemplate.estimatedTime}</span>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Assignment Stats */}
                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Assignment Statistics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Your Assignments:</span>
                      <span className="font-semibold">5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Active Students:</span>
                      <span className="font-semibold">48</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Avg. Completion:</span>
                      <span className="font-semibold">94%</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Tips */}
                <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-green-50/30">
                  <CardHeader>
                    <CardTitle className="text-lg">💡 Assignment Tips</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div>
                      <strong>Clear Objectives:</strong> Define what students should learn and accomplish.
                    </div>
                    <div>
                      <strong>Realistic Timeline:</strong> Allow adequate time for quality work.
                    </div>
                    <div>
                      <strong>Detailed Rubric:</strong> Provide clear grading criteria upfront.
                    </div>
                    <div>
                      <strong>Examples:</strong> Share samples of excellent work when possible.
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Preview */}
          <TabsContent value="preview" className="space-y-8">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">Assignment Preview</CardTitle>
                <CardDescription>Review your assignment before publishing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Assignment Header */}
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">{title || "Assignment Title"}</h2>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          {category && <Badge variant="secondary">{category}</Badge>}
                          {difficulty && <Badge variant="outline">{difficulty}</Badge>}
                          {estimatedHours && (
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {estimatedHours} hours
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600">Due Date</div>
                        <div className="font-semibold">
                          {deadline ? new Date(deadline).toLocaleDateString() : "Select deadline"}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {description || "Assignment description will appear here..."}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <Button
                      onClick={handleSubmit}
                      disabled={isLoading || success || !title || !description || !deadline}
                      className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 shadow-lg"
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Creating Assignment...
                        </>
                      ) : success ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Assignment Created!
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Publish Assignment
                        </>
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setActiveTab("details")}
                      disabled={isLoading}
                      className="bg-white/60 backdrop-blur-sm"
                    >
                      Edit Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
