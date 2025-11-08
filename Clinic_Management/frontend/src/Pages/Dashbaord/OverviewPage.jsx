import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

const data = [
  { name: "Male", value: 45 },
  { name: "Female", value: 30 },
  { name: "Child", value: 25 },
]

const COLORS = ["#4B5563", "#9CA3AF", "#D1D5DB"]

const doctors = [
  { name: "Dr. John Smith", specialization: "Cardiologist", status: "Available" },
  { name: "Dr. Emily Johnson", specialization: "Dermatologist", status: "Busy" },
  { name: "Dr. Robert Brown", specialization: "Neurologist", status: "Available" },
  { name: "Dr. Olivia Wilson", specialization: "Pediatrician", status: "Busy" },
]

const appointments = [
  { name: "John Doe", type: "Clinic Consulting", time: "10:30", status: "Ongoing" },
  { name: "Anna Lee", type: "Video Consulting", time: "11:00", status: "Pending" },
  { name: "Mark Taylor", type: "Clinic Consulting", time: "11:30", status: "Completed" },
  { name: "Lisa Brown", type: "Video Consulting", time: "12:00", status: "Ongoing" },
  { name: "Lisa Jhon", type: "Video Consulting", time: "12:00", status: "Ongoing" },
]

const OverviewPage = () => {
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">

      {/* Headers */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="bg-white shadow-sm hover:shadow-md border-neutral-200">
          <CardHeader>
            <CardTitle className="text-sm text-gray-500">Appointments</CardTitle>
            <h2 className="text-2xl font-semibold text-gray-800">24.4k</h2>
          </CardHeader>
        </Card>
        <Card className="bg-white shadow-sm hover:shadow-md border-neutral-200">
          <CardHeader>
            <CardTitle className="text-sm text-gray-500">Total Patients</CardTitle>
            <h2 className="text-2xl font-semibold text-gray-800">166.3k</h2>
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

      {/* Main Section */}
      <div className="grid md:grid-cols-3 gap-6">

        {/* Left Column */}
        <div className="col-span-2 space-y-6">

          <Card className="shadow-sm border-neutral-200">
            <CardHeader>
              <CardTitle className="text-gray-700 text-lg font-medium">Doctors List</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-64">
                <div className="space-y-4">
                  {doctors.map((doctor, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-md bg-gray-50 hover:bg-gray-100">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={`https://i.pravatar.cc/150?img=${i + 1}`} />
                          <AvatarFallback>{doctor.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-gray-800">{doctor.name}</p>
                          <p className="text-xs text-gray-500">{doctor.specialization}</p>
                        </div>
                      </div>
                      <Badge variant={doctor.status === "Available" ? "default" : "secondary"}>{doctor.status}</Badge>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-neutral-200">
            <CardHeader>
              <CardTitle className="text-gray-700 text-lg font-medium">Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-94">
                {appointments.map((apt, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-md bg-gray-50 hover:bg-gray-100 mb-5">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={`https://i.pravatar.cc/150?img=${i + 10}`} />
                        <AvatarFallback>{apt.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-gray-800">{apt.name}</p>
                        <p className="text-xs text-gray-500">{apt.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">{apt.time}</p>
                      <Badge variant="outline">{apt.status}</Badge>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <Card className="shadow-sm border-neutral-200">
            <CardHeader>
              <CardTitle className="text-gray-700 text-lg font-medium">Patients Overview</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center h-64">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  {/* label */}
                  <Pie data={data} dataKey="value" outerRadius={80}>
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-6 mt-4 text-sm text-gray-600">
                <div>Male: 45%</div>
                <div>Female: 30%</div>
                <div>Child: 25%</div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-neutral-200">
            <CardHeader>
              <CardTitle className="text-gray-700 text-lg font-medium">Schedule</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center h-94">
              <Calendar mode="single" className="rounded-md border" />
              <Button className=" mt-4" variant="default">View Upcoming Schedules</Button>
            </CardContent>
          </Card>
        </div>
        
      </div>
    </div>
  )
}

export default OverviewPage
