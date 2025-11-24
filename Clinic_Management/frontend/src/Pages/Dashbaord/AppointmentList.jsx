import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, } from "@/components/ui/card";
import {DropdownMenuItem, DropdownMenuContent, DropdownMenu, DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
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
        res = await apiCall("GET", API_PATHS.ADMIN.GET_APPOINTMENTS);
      } else if (user?.role === "patient") {
        res = await apiCall("GET", API_PATHS.PATIENT.GET_APPOINTMENTS);
      } else if (user?.role === "doctor") {
        res = await apiCall("GET", API_PATHS.DOCTOR.GET_APPOINTMENTS);
      }

      setAppointments(res?.data || []);
    } catch (err) {
      console.error("Error fetching appointments:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await apiCall("PUT", API_PATHS.DOCTOR.UPDATE_APPOINTMENT_STATUS(id), {
        status,
      });
      fetchAppointments();
    } catch (err) {
      console.error("Error updating status:", err);
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
          onSuccess={fetchAppointments}
        />
      )}

      <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-semibold text-gray-800">
            {user?.role === "admin"
              ? "All Appointments"
              : user?.role === "doctor"
                ? "Your Doctor Appointments"
                : "Your Appointments"}
          </h1>

          <div className="flex items-center gap-3">
            <Input
              placeholder="Search by patient, doctor, or type..."
              className="w-72"
            />

            {/* Only patients can book */}
            {user?.role === "patient" && (
              <Button
                className="cursor-pointer"
                onClick={() => setShowForm(true)}
              >
                Add Appointment
              </Button>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="border border-neutral-200 shadow-sm">
            <CardContent className="p-4 flex items-center gap-3">
              <Clock className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">Pending</p>
                <p className="text-xl font-semibold text-gray-800">
                  {appointments.filter((a) => a.status === "pending").length}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-neutral-200 shadow-sm">
            <CardContent className="p-4 flex items-center gap-3">
              <CheckCircle2 className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-sm text-gray-500">Approved</p>
                <p className="text-xl font-semibold text-gray-800">
                  {appointments.filter((a) => a.status === "approved").length}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-neutral-200 shadow-sm">
            <CardContent className="p-4 flex items-center gap-3">
              <Calendar className="w-8 h-8 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Total Appointments</p>
                <p className="text-xl font-semibold text-gray-800">
                  {appointments.length}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Appointment List */}
        <Card className="shadow-sm border border-neutral-200">
          <CardHeader>
            <CardTitle className="text-gray-700 text-lg font-medium">
              Appointment Records
            </CardTitle>
          </CardHeader>

          {/* Table Header */}
          <div className="grid grid-cols-7 px-6 py-3 bg-neutral-100 border-b border-neutral-200 text-sm font-semibold text-gray-600">
            <span>Patient</span>
            <span>Doctor</span>
            <span>Date</span>
            <span>Time</span>
            <span>Reason</span>
            <span>Status</span>
            <span>Action</span>
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
                      className="grid grid-cols-7 items-center px-6 py-4 bg-white hover:bg-neutral-50 transition"
                    >
                      {/* Patient Name */}
                      <span className="text-gray-800">
                        {user.role === "patient"
                          ? user.name
                          : appt.userId?.name || "N/A"}
                      </span>

                      {/* Doctor Name */}
                      <span className="text-gray-700">
                        {user.role === "doctor"
                          ? user.name
                          : appt.doctorId?.name || "N/A"}
                      </span>

                      <span className="text-gray-700">
                        {new Date(appt.appointmentDate).toLocaleDateString()}
                      </span>

                      <span className="text-gray-700">{appt.timeSlot}</span>

                      <span className="text-gray-700">
                        {appt.reason || "-"}
                      </span>

                      {/* Status + Doctor Actions */}
                      <div className="flex justify-end">
                        {user.role === "doctor" ? (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="outline"
                                className={
                                  "capitalize " +
                                  (appt.status === "completed"
                                    ? "bg-green-500 text-white"
                                    : appt.status === "pending"
                                      ? "bg-yellow-500 text-white"
                                      : appt.status === "rejected"
                                        ? "bg-red-500 text-white"
                                        : "bg-gray-500 text-white")
                                }
                              >
                                {appt.status}
                              </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent>
                              <DropdownMenuItem
                                onClick={() => handleStatusUpdate(appt._id, "approved")}
                              >
                                Approve
                              </DropdownMenuItem>

                              <DropdownMenuItem
                                onClick={() => handleStatusUpdate(appt._id, "rejected")}
                              >
                                Reject
                              </DropdownMenuItem>

                              <DropdownMenuItem
                                onClick={() => handleStatusUpdate(appt._id, "completed")}
                              >
                                Completed
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        ) : (
                          <Badge
                            className={
                              "capitalize " +
                              (appt.status === "completed"
                                ? "bg-green-500 text-white"
                                : appt.status === "pending"
                                  ? "bg-yellow-500 text-white"
                                  : appt.status === "rejected"
                                    ? "bg-red-500 text-white"
                                    : "bg-gray-500 text-white")
                            }
                          >
                            {appt.status}
                          </Badge>
                        )}
                      </div>


                      {/* Doctor Actions */}
                      <div className="flex gap-2 justify-end">
                        {user.role === "doctor" &&
                          appt.status === "pending" && (
                            <>
                              <Button
                                className="bg-green-600 text-white px-3"
                                onClick={() =>
                                  handleStatusUpdate(appt._id, "approved")
                                }
                              >
                                Approve
                              </Button>
                              <Button
                                className="bg-red-600 text-white px-3"
                                onClick={() =>
                                  handleStatusUpdate(appt._id, "rejected")
                                }
                              >
                                Reject
                              </Button>
                            </>
                          )}
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
