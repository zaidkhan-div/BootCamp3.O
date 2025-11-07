import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { PlusCircle } from "lucide-react"

const PatientList = () => {
  const patients = [
    {
      id: 383621,
      name: "John Doe",
      age: 35,
      gender: "Male",
      email: "john.doe@email.com",
      phone: "+92 333 1122334",
      condition: "Routine Checkup",
      status: "Active",
    },
    {
      id: 37254,
      name: "Anna Lee",
      age: 28,
      gender: "Female",
      email: "anna.lee@email.com",
      phone: "+92 322 3344556",
      condition: "Consultation",
      status: "Recovered",
    },
    {
      id: 349127,
      name: "Mark Taylor",
      age: 40,
      gender: "Male",
      email: "mark.taylor@email.com",
      phone: "+92 321 2233445",
      condition: "Follow-up",
      status: "Active",
    },
    {
      id: 48274,
      name: "Lisa Brown",
      age: 32,
      gender: "Female",
      email: "lisa.brown@email.com",
      phone: "+92 300 6677889",
      condition: "Therapy",
      status: "Discharged",
    },
    {
      id: 586595,
      name: "David Khan",
      age: 45,
      gender: "Male",
      email: "david.khan@email.com",
      phone: "+92 307 7788990",
      condition: "Surgery",
      status: "Under Treatment",
    },
  ]

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-semibold text-gray-800">Patients Management</h1>
        <div className="flex items-center gap-3">
          <Input placeholder="Search patient by name or condition..." className="w-72" />
          <Button variant="default" className="flex items-center gap-2">
            <PlusCircle className="w-4 h-4" />
            Add Patient
          </Button>
        </div>
      </div>

      {/* Patients Table */}
      <Card className="shadow-sm border border-neutral-200">
        <CardHeader>
          <CardTitle className="text-gray-700 text-lg font-medium">All Registered Patients</CardTitle>
        </CardHeader>

        {/* Table Head */}
        <div className="grid grid-cols-7 px-6 py-3 bg-neutral-100 border-b border-neutral-200 text-sm font-semibold text-gray-600">

          <div className="flex justify-around items-center ">
            <span>ID</span>
            <span>Patient</span>
          </div>
          <span>Gender</span>
          <span>Age</span>
          <span>Email</span>
          <span>Phone</span>
          <span>Condition</span>
          <span>Status</span>

        </div>

        {/* Table Body */}
        <CardContent>
          <ScrollArea className="h-[600px]">
            <div className="divide-y divide-neutral-200">
              {patients.map((patient, i) => (
                <div
                  key={patient.id}
                  className="grid grid-cols-7 items-center px-2 py-4 bg-white hover:bg-neutral-50 transition"
                >


                  <div className="flex items-center gap-3">
                    <p className="text-gray-700 text-sm font-medium">{patient.id}</p>
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={`https://i.pravatar.cc/150?img=${i + 15}`} />
                      <AvatarFallback>{patient.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-gray-800 font-medium">{patient.name}</p>
                    </div>
                  </div>

                  <span className="text-sm text-gray-600">{patient.gender}</span>
                  <span className="text-sm text-gray-600">{patient.age}</span>
                  <span className="text-sm text-gray-600">{patient.email}</span>
                  <span className="text-sm text-gray-600">{patient.phone}</span>
                  <span className="text-sm text-gray-600">{patient.condition}</span>

                  <div className="flex justify-end">
                    <Badge
                      variant={
                        patient.status === "Active"
                          ? "default"
                          : patient.status === "Recovered"
                            ? "secondary"
                            : "outline"
                      }
                      className={
                        patient.status === "Active"
                          ? "bg-green-500 text-white"
                          : patient.status === "Recovered"
                            ? "bg-gray-400 text-white"
                            : "bg-yellow-400 text-white"
                      }
                    >
                      {patient.status}
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

export default PatientList
