import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Calendar, CheckCircle2, Clock } from "lucide-react"
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const AppointmentList = () => {

  const appointments = [
    {
      id: "APT-001",
      patient: "John Doe",
      doctor: "Dr. John Smith",
      date: "12 Nov 2025",
      time: "10:00 AM",
      type: "Consultation",
      status: "Upcoming",
    },
    {
      id: "APT-002",
      patient: "Anna Lee",
      doctor: "Dr. Emily Johnson",
      date: "10 Nov 2025",
      time: "01:30 PM",
      type: "Follow-up",
      status: "Completed",
    },
    {
      id: "APT-003",
      patient: "Mark Taylor",
      doctor: "Dr. Robert Brown",
      date: "14 Nov 2025",
      time: "11:15 AM",
      type: "Checkup",
      status: "Upcoming",
    },
    {
      id: "APT-004",
      patient: "Lisa Brown",
      doctor: "Dr. Olivia Wilson",
      date: "08 Nov 2025",
      time: "03:00 PM",
      type: "Therapy Session",
      status: "Cancelled",
    },
    {
      id: "APT-005",
      patient: "David Khan",
      doctor: "Dr. Daniel Harris",
      date: "07 Nov 2025",
      time: "09:30 AM",
      type: "Dental Surgery",
      status: "Completed",
    },
  ]

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-semibold text-gray-800">Appointments</h1>
        <div className="flex items-center gap-3">
          <Input placeholder="Search by patient, doctor, or type..." className="w-72" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        <Card className="border border-neutral-200 shadow-sm">
          <CardContent className="p-4 flex items-center gap-3">
            <Clock className="w-8 h-8 text-blue-500" />
            <div>
              <p className="text-sm text-gray-500">Completed</p>
              <p className="text-xl font-semibold text-gray-800">
                {appointments.filter((a) => a.status === "Completed").length}
              </p>
            </div>
          </CardContent>
        </Card>


        <Card className="border border-neutral-200 shadow-sm">
          <CardContent className="p-4 flex items-center gap-3">
            <CheckCircle2 className="w-8 h-8 text-green-500" />
            <div>
              <p className="text-sm text-gray-500">Completed</p>
              <p className="text-xl font-semibold text-gray-800">
                {appointments.filter((a) => a.status === "Completed").length}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-neutral-200 shadow-sm">
          <CardContent className="p-4 flex items-center gap-3">
            <Calendar className="w-8 h-8 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Total Appointments</p>
              <p className="text-xl font-semibold text-gray-800">{appointments.length}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AppointmentLsit */}
      <Card className="shadow-sm border border-neutral-200">
        <CardHeader>
          <CardTitle className="text-gray-700 text-lg font-medium">All Appointments</CardTitle>
        </CardHeader>

        <div className="grid grid-cols-7 px-6 py-3 bg-neutral-100 border-b border-neutral-200 text-sm font-semibold text-gray-600">
          <span>ID</span>
          <span>Patient</span>
          <span>Doctor</span>
          <span>Date</span>
          <span>Time</span>
          <span>Type</span>
          <span>Status</span>
        </div>

        <CardContent>
          <ScrollArea className="h-[600px]">
            <div className="divide-y divide-neutral-200">
              {appointments.map((appt, i) => (
                <div
                  key={appt.id}
                  className="grid grid-cols-7 items-center px-6 py-4 bg-white hover:bg-neutral-50 transition"
                >
                  <span className="text-gray-700 font-medium">{appt.id}</span>
                  <span className="text-gray-800">{appt.patient}</span>
                  <span className="text-gray-700">{appt.doctor}</span>
                  <span className="text-gray-700">{appt.date}</span>
                  <span className="text-gray-700">{appt.time}</span>
                  <span className="text-gray-700">{appt.type}</span>

                  <div className="flex justify-end">
                    <Badge
                      className={
                        appt.status === "Upcoming"
                          ? "bg-blue-500 text-white"
                          : appt.status === "Completed"
                            ? "bg-green-500 text-white"
                            : appt.status === "Cancelled"
                              ? "bg-red-500 text-white"
                              : "bg-gray-400 text-white"
                      }
                    >
                      {appt.status}
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

export default AppointmentList
