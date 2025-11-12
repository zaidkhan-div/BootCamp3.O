import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar, CheckCircle2, Clock } from "lucide-react";
import AppointmentForm from "../../components/Forms/AddAppointment";
import { apiCall } from "../../utils/api.js";
import { API_PATHS } from "../../utils/apiPaths";
import { useAuth } from "../../Context/AuthContext";

const AppointmentList = () => {
  const [showForm, setShowForm] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      let res;

      if (user?.role === "admin") {
        res = await apiCall("GET", API_PATHS.APPOINTMENT.GET_ALL);
      } else if (user?.role === "patient") {
        res = await apiCall("GET", API_PATHS.PATIENT.GET_APPOINTMENTS);
      }

      setAppointments(res?.data || []);
    } catch (err) {
      console.error("Error fetching appointments:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchAppointments();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-xl text-gray-600">
        Fetching appointments...
      </div>
    );
  }

  return (
    <>
      {showForm && (
        <AppointmentForm
          onClose={() => setShowForm(false)}
          onSuccess={fetchAppointments} // Refresh after adding
        />
      )}

      <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-semibold text-gray-800">
            {user?.role === "admin" ? "All Appointments" : "Your Appointments"}
          </h1>

          {/* 🟢 Only admin can add appointments */}
          <div className="flex items-center gap-3">
            <Input placeholder="Search by patient, doctor, or type..." className="w-72" />
            {user?.role === "patient" && (
              <Button className="cursor-pointer" onClick={() => setShowForm(true)}>Add Appointment</Button>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="border border-neutral-200 shadow-sm">
            <CardContent className="p-4 flex items-center gap-3">
              <Clock className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">Upcoming</p>
                <p className="text-xl font-semibold text-gray-800">
                  {appointments.filter(a => a.status === "Upcoming").length}
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
                  {appointments.filter(a => a.status === "Completed").length}
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

        {/* Appointment List */}
        <Card className="shadow-sm border border-neutral-200">
          <CardHeader>
            <CardTitle className="text-gray-700 text-lg font-medium">
              {user?.role === "admin" ? "All Appointments" : "Your Appointments"}
            </CardTitle>
          </CardHeader>

          {/* Table Header */}
          <div className="grid grid-cols-6 px-6 py-3 bg-neutral-100 border-b border-neutral-200 text-sm font-semibold text-gray-600">
            <span>Patient</span>
            <span>Doctor</span>
            <span>Date</span>
            <span>Time</span>
            <span>Type</span>
            <span>Status</span>
          </div>

          <CardContent>
            <ScrollArea className="h-[600px]">
              {appointments.length === 0 ? (
                <div className="flex items-center justify-center h-[200px] text-gray-500">
                  No appointments found.
                </div>
              ) : (
                <div className="divide-y divide-neutral-200">
                  {appointments.map((appt) => (
                    <div
                      key={appt._id}
                      className="grid grid-cols-6 items-center px-6 py-4 bg-white hover:bg-neutral-50 transition"
                    >
                      <span className="text-gray-800">{user.name}</span>
                      <span className="text-gray-700">{appt.doctorId?.name || "N/A"}</span>
                      <span className="text-gray-700">
                        {new Date(appt.appointmentDate).toLocaleDateString()}
                      </span>
                      <span className="text-gray-700">{appt.timeSlot}</span>
                      <span className="text-gray-700">{appt.reason || "-"}</span>
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
                          {appt.status || "Upcoming"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AppointmentList;
