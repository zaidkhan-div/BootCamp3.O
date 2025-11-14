import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { PlusCircle } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { apiCall } from "@/utils/api"
import { API_PATHS } from "@/utils/apiPaths"
import AddCaseHistoryForm from "@/components/Forms/AddCaseHistoryForm"
import { useAuth } from "../../Context/AuthContext"

const CaseHistoryList = () => {
  const [caseHistories, setCaseHistories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [showForm, setShowForm] = useState(false);

  const { user } = useAuth();
  let endpoint;
  if (user.role === "admin") endpoint = API_PATHS.ADMIN.GET_ALL_CASE_HISTORY;
  if (user.role === "doctor") endpoint = API_PATHS.DOCTOR.GET_OWN_CASE_HISTORY;
  if (user.role === "patient") endpoint = API_PATHS.PATIENT.GET_CASE_HISTORY;


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await apiCall("GET", endpoint)
        setCaseHistories(response.caseHistories || [])
      } catch (err) {
        console.error("Failed to load case histories:", err)
        setError("Failed to load case histories.")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading)
    return <div className="flex items-center justify-center h-screen text-3xl">Loading...</div>
  if (error)
    return <div className="flex items-center justify-center h-screen text-3xl">{error}</div>

  const totalCases = caseHistories.length
  const recoveredCases = caseHistories.filter(c => c.status === "Recovered").length
  const activeCases = caseHistories.filter(c => c.status === "Under Treatment").length
  const criticalCases = caseHistories.filter(c => c.status === "Critical").length

  const chartData = [
    { name: "Recovered", value: recoveredCases },
    { name: "Under Treatment", value: activeCases },
    { name: "Critical", value: criticalCases },
  ]
  const COLORS = ["#10b981", "#60a5fa", "#f87171"]

  return (
    <>
      {showForm && user.role === "doctor" && (
        <AddCaseHistoryForm
          onClose={() => setShowForm(false)}
          onSuccess={() => window.location.reload()}
        />
      )}


      <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-semibold text-gray-800">Case History Overview</h1>
          <div className="flex items-center gap-3">
            <Input placeholder="Search case history..." className="w-72" />

            {user.role === "doctor" && (
              <Button onClick={() => setShowForm(true)}>Add Case History</Button>
            )}

          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white border border-neutral-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600">Total Cases</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold text-gray-800">{totalCases}</p>
            </CardContent>
          </Card>

          <Card className="bg-white border border-neutral-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600">Recovered</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold text-green-600">{recoveredCases}</p>
            </CardContent>
          </Card>

          <Card className="bg-white border border-neutral-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600">Under Treatment</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold text-blue-600">{activeCases}</p>
            </CardContent>
          </Card>

          <Card className="bg-white border border-neutral-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600">Critical</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold text-red-600">{criticalCases}</p>
            </CardContent>
          </Card>
        </div>

        {/* Status Pie Chart */}
        <Card className="border border-neutral-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-700 text-lg font-medium">Case Status Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  dataKey="value"
                  label
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Case History List */}
        <ScrollArea className="h-[700px]">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {caseHistories.map((caseData) => (
              <Card key={caseData._id} className="bg-white border border-neutral-200 shadow-sm hover:shadow-md transition">
                <CardContent className="p-5 space-y-3">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">{caseData.patientName}</h2>
                    <p className="text-sm text-gray-500">{caseData.diagnosis}</p>
                  </div>

                  <div className="text-sm text-gray-600 space-y-1">
                    <p><span className="font-medium text-gray-700">Doctor:</span> {caseData.doctorName}</p>
                    <p><span className="font-medium text-gray-700">Treatment:</span> {caseData.treatment}</p>
                    <p><span className="font-medium text-gray-700">Status:</span> {caseData.status}</p>
                    <p><span className="font-medium text-gray-700">Date:</span> {new Date(caseData.createdAt).toLocaleDateString()}</p>
                  </div>

                  <div className="flex justify-end">
                    <Badge
                      variant="outline"
                      className={
                        caseData.status === "Recovered"
                          ? "bg-green-100 text-green-700 border-green-300"
                          : caseData.status === "Critical"
                            ? "bg-red-100 text-red-700 border-red-300"
                            : "bg-blue-100 text-blue-700 border-blue-300"
                      }
                    >
                      {caseData.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div >
    </>
  )
}

export default CaseHistoryList
