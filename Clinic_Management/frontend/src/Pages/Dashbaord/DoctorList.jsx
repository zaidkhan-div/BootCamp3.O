import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PlusCircle } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import AddDoctorForm from "../../components/Forms/AddDcotorForm"
import { API_PATHS } from "../../utils/apiPaths"
import { apiCall } from "../../utils/api"

const DoctorList = () => {
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await apiCall("GET", API_PATHS.ADMIN.GET_ALL_DOCTORS)
        setDoctors(response.doctors || [])
      } catch (err) {
        console.error("Failed to load doctors:", err)
        setError("Failed to load doctors.")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) return <div className="flex items-center justify-center h-screen text-3xl">Loading...</div>
  if (error) return <div className="flex items-center justify-center h-screen text-3xl">{error}</div>

  const totalDoctors = doctors.length
  const availableDoctors = Math.floor(totalDoctors * 0.6)
  const busyDoctors = totalDoctors - availableDoctors

  // Gender counts directly from doctor object
  const maleDoctors = doctors.filter(d => d.gender?.toLowerCase() === "male").length
  const femaleDoctors = doctors.filter(d => d.gender?.toLowerCase() === "female").length

  const chartData = [
    { name: "Male Doctors", value: maleDoctors },
    { name: "Female Doctors", value: femaleDoctors },
  ]

  const COLORS = ["#60a5fa", "#f472b6"]

  return (
    <>
      {showForm && <AddDoctorForm onClose={() => setShowForm(false)} onSuccess={() => window.location.reload()} />}
      <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-semibold text-gray-800">Doctors Overview</h1>
          <div className="flex items-center gap-3">
            <Input placeholder="Search doctor..." className="w-72" />
            <Button
              onClick={() => setShowForm(true)}
              variant="default"
              className="flex items-center gap-2 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              Add Doctor
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white border border-neutral-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600">Total Doctors</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold text-gray-800">{totalDoctors}</p>
            </CardContent>
          </Card>

          <Card className="bg-white border border-neutral-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600">Available</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold text-green-600">{availableDoctors}</p>
            </CardContent>
          </Card>

          <Card className="bg-white border border-neutral-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600">Busy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold text-gray-500">{busyDoctors}</p>
            </CardContent>
          </Card>

          <Card className="bg-white border border-neutral-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600">Departments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold text-gray-800">
                {new Set(doctors.map(d => d.specialization)).size}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Gender Pie Chart */}
        <Card className="border border-neutral-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-700 text-lg font-medium">Doctors Gender Distribution</CardTitle>
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
                  fill="#8884d8"
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

        {/* Doctors List */}
        <ScrollArea className="h-[700px]">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {doctors.map((doctor) => (
              <Card
                key={doctor._id}
                className="bg-white border border-neutral-200 shadow-sm hover:shadow-md transition"
              >
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-center gap-4">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800">{doctor.name}</h2>
                      <p className="text-sm text-gray-500">{doctor.specialization}</p>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600 space-y-1">
                    <p><span className="font-medium text-gray-700">Gender:</span> {doctor.gender}</p>
                    <p><span className="font-medium text-gray-700">Age:</span> {doctor.age}</p>
                    <p><span className="font-medium text-gray-700">Experience:</span> {doctor.experience} years</p>
                    <p><span className="font-medium text-gray-700">Email:</span> {doctor.email}</p>
                    <p><span className="font-medium text-gray-700">Phone:</span> {doctor.phone}</p>
                    <p><span className="font-medium text-gray-700">Fee:</span> ${doctor.fee}</p>
                    <p><span className="font-medium text-gray-700">Schedule:</span> {doctor.scheduleIds.join(", ")}</p>
                    <p><span className="font-medium text-gray-700">Joined:</span> {new Date(doctor.createdAt).toLocaleDateString()}</p>
                  </div>

                  <div className="flex justify-end">
                    <Badge
                      variant="outline"
                      className="bg-green-100 text-green-700 border-green-300"
                    >
                      Available
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </>
  )
}

export default DoctorList
