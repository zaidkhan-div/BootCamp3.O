import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PlusCircle } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { useState } from "react"
import AddDoctorForm from "@/components/Forms/AddDcotorForm"

const DoctorList = () => {

  const [showForm, setShowForm] = useState(false);

  const doctors = [
    {
      id: 1,
      name: "Dr. John Smith",
      specialization: "Cardiologist",
      email: "johnsmith@clinic.com",
      phone: "+92 300 1234567",
      department: "Cardiology",
      experience: "10 Years",
      joined: "12 Jan 2018",
      status: "Available",
    },
    {
      id: 2,
      name: "Dr. Emily Johnson",
      specialization: "Dermatologist",
      email: "emilyj@clinic.com",
      phone: "+92 301 2233445",
      department: "Skin Care",
      experience: "7 Years",
      joined: "03 Mar 2020",
      status: "Busy",
    },
    {
      id: 3,
      name: "Dr. Robert Brown",
      specialization: "Neurologist",
      email: "robertb@clinic.com",
      phone: "+92 302 1122334",
      department: "Neuroscience",
      experience: "12 Years",
      joined: "25 Jul 2015",
      status: "Available",
    },
    {
      id: 4,
      name: "Dr. Olivia Wilson",
      specialization: "Pediatrician",
      email: "oliviaw@clinic.com",
      phone: "+92 303 5566778",
      department: "Child Care",
      experience: "8 Years",
      joined: "10 Sep 2019",
      status: "Busy",
    },
    {
      id: 5,
      name: "Dr. Daniel Harris",
      specialization: "Dentist",
      email: "danielh@clinic.com",
      phone: "+92 304 9988776",
      department: "Dental",
      experience: "6 Years",
      joined: "05 Oct 2021",
      status: "Available",
    },
  ]

  const totalDoctors = doctors.length
  const availableDoctors = doctors.filter(d => d.status === "Available").length
  const busyDoctors = totalDoctors - availableDoctors

  const chartData = [
    { name: "Available", value: availableDoctors },
    { name: "Busy", value: busyDoctors },
  ]

  const COLORS = ["#4ade80", "#a1a1aa"]

  return (
    <>
      {showForm && <AddDoctorForm onClose={() => setShowForm(true)} />}
      <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-semibold text-gray-800">Doctors Overview</h1>
          <div className="flex items-center gap-3">
            <Input placeholder="Search doctor..." className="w-72" />
            <Button variant="default" className="flex items-center gap-2 cursor-pointer">
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
                {new Set(doctors.map(d => d.department)).size}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Pie Chart */}
        <Card className="border border-neutral-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-700 text-lg font-medium">Doctors Status Overview</CardTitle>
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

        {/* Doctor Cards List */}
        <ScrollArea className="h-[700px]">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {doctors.map((doctor, i) => (
              <Card key={doctor.id} className="bg-white border border-neutral-200 shadow-sm hover:shadow-md transition">
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-14 w-14">
                      <AvatarImage src={`https://i.pravatar.cc/150?img=${i + 1}`} />
                      <AvatarFallback>{doctor.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800">{doctor.name}</h2>
                      <p className="text-sm text-gray-500">{doctor.specialization}</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><span className="font-medium text-gray-700">Department:</span> {doctor.department}</p>
                    <p><span className="font-medium text-gray-700">Experience:</span> {doctor.experience}</p>
                    <p><span className="font-medium text-gray-700">Email:</span> {doctor.email}</p>
                    <p><span className="font-medium text-gray-700">Phone:</span> {doctor.phone}</p>
                    <p><span className="font-medium text-gray-700">Joined:</span> {doctor.joined}</p>
                  </div>
                  <div className="flex justify-end">
                    <Badge
                      variant="outline"
                      className={
                        doctor.status === "Available"
                          ? "bg-green-100 text-green-700 border-green-300"
                          : "bg-gray-100 text-gray-700 border-gray-300"
                      }
                    >
                      {doctor.status}
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
