import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { apiCall } from "../../utils/api"
import { API_PATHS } from "../../utils/apiPaths"
import { useAuth } from "../../Context/AuthContext"

const COLORS = ["#60a5fa", "#f472b6"]

const OverviewPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [doctors, setDoctors] = useState([])
  const [appointments, setAppointments] = useState([]);
  const [appointLoading, setAppointLoading] = useState(false);

  const { user } = useAuth();

  // 🟢 fetchAppointments now depends on user.role
  const fetchAppointments = async () => {
    try {
      setAppointLoading(true)
      let res

      if (user.role === "admin") {
        res = await apiCall("GET", API_PATHS.APPOINTMENT.GET_ALL)
      } else if (user.role === "patient") {
        res = await apiCall("GET", API_PATHS.PATIENT.GET_APPOINTMENTS)
      }

      setAppointments(res?.data || [])
    } catch (err) {
      console.error("Error fetching appointments:", err)
    } finally {
      setAppointLoading(false)
    }
  }

  useEffect(() => {
    fetchAppointments()
  }, [user?.role])

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await apiCall("GET", API_PATHS.ADMIN.GET_ALL_DOCTORS)
        setDoctors(response.doctors || [])
      } catch (err) {
        console.error("Error fetching doctors:", err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchDoctors()
  }, [])

  if (loading) return <div className="flex items-center justify-center h-screen text-2xl">Loading...</div>
  if (error) return <div className="flex items-center justify-center h-screen text-2xl">Failed to fetch data...</div>

  const maleDoctors = doctors.filter(d => d.gender?.toLowerCase() === "male").length
  const femaleDoctors = doctors.filter(d => d.gender?.toLowerCase() === "female").length

  const chartData = [
    { name: "Male Doctors", value: maleDoctors },
    { name: "Female Doctors", value: femaleDoctors },
  ]

  return (
    <div className="p-6 pt-0 space-y-6 bg-gray-50 min-h-screen">
      {/* Header Stats */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="bg-white shadow-sm hover:shadow-md border-neutral-200">
          <CardHeader>
            <CardTitle className="text-sm text-gray-500">Total Doctors</CardTitle>
            <h2 className="text-2xl font-semibold text-gray-800">{doctors.length}</h2>
          </CardHeader>
        </Card>
        <Card className="bg-white shadow-sm hover:shadow-md border-neutral-200">
          <CardHeader>
            <CardTitle className="text-sm text-gray-500">Appointments</CardTitle>
            <h2 className="text-2xl font-semibold text-gray-800">{appointments.length}</h2>
          </CardHeader>
        </Card>
        <Card className="bg-white shadow-sm hover:shadow-md border-neutral-200">
          <CardHeader>
            <CardTitle className="text-sm text-gray-500">Total Rooms</CardTitle>
            <h2 className="text-2xl font-semibold text-gray-800">5</h2>
          </CardHeader>
        </Card>
        <Card className="bg-white shadow-sm hover:shadow-md border-neutral-200">
          <CardHeader>
            <CardTitle className="text-sm text-gray-500">Clinic Consulting</CardTitle>
            <h2 className="text-2xl font-semibold text-gray-800">28</h2>
          </CardHeader>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="col-span-2 space-y-6">
          {/* Doctors List */}
          <Card className="shadow-sm border-neutral-200">
            <CardHeader>
              <CardTitle className="text-gray-700 text-lg font-medium">Doctors List</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-64">
                <div className="space-y-4">
                  {doctors.map((doctor, i) => (
                    <div
                      key={doctor._id}
                      className="flex items-center justify-between p-3 rounded-md bg-gray-50 hover:bg-gray-100"
                    >
                      <div className="flex items-center gap-3">
                        <div>
                          <p className="text-sm font-medium text-gray-800">{doctor.name}</p>
                          <p className="text-xs text-gray-500">{doctor.specialization}</p>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-green-100 text-green-700 border-green-300"
                      >
                        {doctor.isApproved ? "Available" : "Pending"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Appointments List */}
          <Card className="shadow-sm border-neutral-200">
            <CardHeader>
              <CardTitle className="text-gray-700 text-lg font-medium">Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-94">
                {appointLoading ? (
                  <p className="text-center text-gray-500">Fetching all appointments...</p>
                ) : (
                  appointments.map((apt, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 rounded-md bg-gray-50 hover:bg-gray-100 mb-4"
                    >
                      <div className="flex items-center gap-3">
                        <div>
                          <p className="text-sm font-medium text-gray-800">{apt.doctorId?.name}</p>
                          <p className="text-xs text-gray-500">{apt.type || apt.reason}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">{apt.timeSlot}</p>
                        <Badge variant="outline">{apt.status}</Badge>
                      </div>
                    </div>
                  ))
                )}
              </ScrollArea>

            </CardContent>
          </Card>

        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <Card className="shadow-sm border-neutral-200">
            <CardHeader>
              <CardTitle className="text-gray-700 text-lg font-medium">Doctors Gender Overview</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center h-64">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={chartData} dataKey="value" outerRadius={80}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-6 mt-4 text-sm text-gray-600">
                <div>Male: {maleDoctors}</div>
                <div>Female: {femaleDoctors}</div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-neutral-200">
            <CardHeader>
              <CardTitle className="text-gray-700 text-lg font-medium">Schedule</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center h-94">
              <Calendar mode="single" className="rounded-md border" />
              <Button className="mt-4" variant="default">
                View Upcoming Schedules
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default OverviewPage
