import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { apiCall } from "../../utils/api";
import { API_PATHS } from "../../utils/apiPaths";
import { useAuth } from "../../Context/AuthContext";

const AppointmentForm = ({ onSuccess, onClose }) => {
    const [doctors, setDoctors] = useState([]);
    const [formData, setFormData] = useState({
        doctorId: "",
        appointmentDate: null,
        timeSlot: "",
        reason: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const { user } = useAuth();


    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const res = await apiCall("GET", API_PATHS.ADMIN.GET_ALL_DOCTORS);
                setDoctors(res.doctors || []);
            } catch (err) {
                console.error("Failed to fetch doctors:", err);
            }
        };
        fetchDoctors();
    }, []);


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess(false);

        if (!formData.doctorId || !formData.appointmentDate || !formData.timeSlot) {
            setError("Please fill all required fields.");
            return;
        }

        setLoading(true);


        try {
            const payload = {
                userId: user.id,
                doctorId: formData.doctorId,
                appointmentDate: formData.appointmentDate,
                timeSlot: formData.timeSlot,
                reason: formData.reason,
            };

            const res = await apiCall("POST", API_PATHS.APPOINTMENT.CREATE, payload);

            if (!res || res.status === false) {
                throw new Error(res.message || "Failed to book appointment");
            }
            setSuccess(true);
            setFormData({ doctorId: "", appointmentDate: null, timeSlot: "", reason: "" });

            if (onSuccess) setTimeout(() => onSuccess(), 1500);
        } catch (err) {
            console.error(err);
            setError(err.message || "Error booking appointment");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <Card className=" relative w-full max-w-md shadow-xl">
                <button onClick={onClose} className="absolute text-black text-lg top-5 right-5 hover:text-foreground cursor-pointer">✕</button>
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Book Appointment</CardTitle>
                </CardHeader>
                <CardContent>
                    {error && (
                        <Alert variant="destructive" className="mb-4">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    {success && (
                        <Alert className="mb-4 bg-green-50 border-green-200">
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                            <AlertDescription className="text-green-800">Appointment booked successfully!</AlertDescription>
                        </Alert>
                    )}

                    <div className="grid gap-4">
                        {/* Doctor Selection */}
                        <div>
                            <Label>Doctor <span className="text-red-500">*</span></Label>
                            <Select
                                value={formData.doctorId}
                                onValueChange={(value) => setFormData({ ...formData, doctorId: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Doctor" />
                                </SelectTrigger>
                                <SelectContent>
                                    {doctors.map((doc) => (
                                        <SelectItem key={doc._id} value={doc._id}>
                                            {doc.name} - {doc.specialization}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Appointment Date */}
                        <div>
                            <Label>Date <span className="text-red-500">*</span></Label>
                            <Calendar
                                mode="single"
                                selected={formData.appointmentDate}
                                onSelect={(date) => setFormData({ ...formData, appointmentDate: date })}
                                className="w-full rounded-md border"
                            />
                        </div>

                        {/* Time Slot */}
                        <div>
                            <Label>Time Slot <span className="text-red-500">*</span></Label>
                            <Input
                                name="timeSlot"
                                placeholder="e.g., 10:00 AM - 11:00 AM"
                                value={formData.timeSlot}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Reason */}
                        <div>
                            <Label>Reason</Label>
                            <Input
                                name="reason"
                                placeholder="Reason for appointment"
                                value={formData.reason}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Submit */}
                        <Button onClick={handleSubmit} disabled={loading} className="w-full mt-2 cursor-pointer">
                            {loading ? "Booking..." : "Book Appointment"}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default AppointmentForm;
