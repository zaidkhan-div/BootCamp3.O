import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { PlusCircle } from "lucide-react"

const DoctorList = () => {
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

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-semibold text-gray-800">Doctors Management</h1>
        <div className="flex items-center gap-3">
          <Input placeholder="Search doctor by name or specialization..." className="w-72" />
          <Button variant="default" className="flex items-center gap-2">
            <PlusCircle className="w-4 h-4" />
            Add Doctor
          </Button>
        </div>
      </div>

      {/* Doctors Table */}
      <Card className="shadow-sm border border-neutral-200">
        <CardHeader>
          <CardTitle className="text-gray-700 text-lg font-medium">All Registered Doctors</CardTitle>
        </CardHeader>

        {/* Table Head */}
        <div className="grid grid-cols-7 px-6 py-3 bg-neutral-100 border-b border-neutral-200 text-sm font-semibold text-gray-600">
          <span>ID</span>
          <span>Doctor</span>
          <span>Specialization</span>
          <span>Email</span>
          <span>Phone</span>
          <span>Experience</span>
          <span>Status</span>
        </div>

        {/* Table Body */}
        <CardContent>
          <ScrollArea className="h-[600px]">
            <div className="divide-y divide-neutral-200">
              {doctors.map((doctor, i) => (
                <div
                  key={doctor.id}
                  className="grid grid-cols-7 items-center px-6 py-4 bg-white hover:bg-neutral-50 transition"
                >
                    <span className="text-gray-700 font-medium">{doctor.id}</span>

                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={`https://i.pravatar.cc/150?img=${i + 1}`} />
                        <AvatarFallback>{doctor.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-gray-800 font-medium">{doctor.name}</p>
                        <p className="text-xs text-gray-500">{doctor.department}</p>
                      </div>
                    </div>

                  <span className="text-sm text-gray-600">{doctor.specialization}</span>
                  <span className="text-sm text-gray-600">{doctor.email}</span>
                  <span className="text-sm text-gray-600">{doctor.phone}</span>
                  <span className="text-sm text-gray-600">{doctor.experience}</span>

                  <div className="flex justify-end">
                    <Badge
                      variant={doctor.status === "Available" ? "default" : "secondary"}
                      className={doctor.status === "Available" ? "bg-green-500" : "bg-gray-400"}
                    >
                      {doctor.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}

export default DoctorList
