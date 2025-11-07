import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "sonner";
import * as Yup from "yup";
import { db } from "../firebase.js";

const AddAppointment = () => {
    const [loading, setLoading] = useState(false);

    const initialValues = {
        patientName: "",
        patientEmail: "",
        patientPhone: "",
        doctorName: "",
        appointmentDate: "",
        appointmentTime: "",
        reason: "",
    };

    const appointmentSchema = Yup.object().shape({
        patientName: Yup.string().required("Patient name is required"),
        patientEmail: Yup.string().email("Invalid email").required("Email is required"),
        patientPhone: Yup.string()
            .matches(/^[0-9]{11}$/, "Phone number must be 11 digits")
            .required("Phone number is required"),
        doctorName: Yup.string().required("Doctor name is required"),
        appointmentDate: Yup.date()
            .min(new Date(), "Date must be in the future")
            .required("Appointment date is required"),
        appointmentTime: Yup.string().required("Appointment time is required"),
        reason: Yup.string().required("Reason for visit is required"),
    });

    const formik = useFormik({
        initialValues,
        validationSchema: appointmentSchema,
        onSubmit: async (values) => {
            setLoading(true);
            try {
                const collectionRef = collection(db, "appointments");
                const data = {
                    patientName: values.patientName,
                    patientEmail: values.patientEmail,
                    patientPhone: values.patientPhone,
                    doctorName: values.doctorName,
                    appointmentDate: values.appointmentDate,
                    appointmentTime: values.appointmentTime,
                    reason: values.reason,
                    status: "scheduled",
                    timestamp: serverTimestamp(),
                };
                await addDoc(collectionRef, data);
                toast.success("Appointment has been scheduled!");
            } catch (error) {
                toast.error(error?.message);
            } finally {
                formik.resetForm();
                setLoading(false);
            }
        },
    });

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Add Appointment</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Schedule New Appointment</DialogTitle>
                    <DialogDescription>
                        Fill in the patient and appointment details below
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                    {/* Patient Name */}
                    <div className="grid gap-2">
                        <Label htmlFor="patientName">Patient Name</Label>
                        <Input
                            id="patientName"
                            name="patientName"
                            value={formik.values.patientName}
                            onChange={formik.handleChange}
                            placeholder="Enter patient name"
                        />
                        {formik.errors.patientName && formik.touched.patientName && (
                            <span className="text-red-500 text-xs">
                                {formik.errors.patientName}
                            </span>
                        )}
                    </div>

                    {/* Patient Email */}
                    <div className="grid gap-2">
                        <Label htmlFor="patientEmail">Patient Email</Label>
                        <Input
                            id="patientEmail"
                            name="patientEmail"
                            type="email"
                            value={formik.values.patientEmail}
                            onChange={formik.handleChange}
                            placeholder="patient@example.com"
                        />
                        {formik.errors.patientEmail && formik.touched.patientEmail && (
                            <span className="text-red-500 text-xs">
                                {formik.errors.patientEmail}
                            </span>
                        )}
                    </div>

                    {/* Patient Phone */}
                    <div className="grid gap-2">
                        <Label htmlFor="patientPhone">Patient Phone</Label>
                        <Input
                            id="patientPhone"
                            name="patientPhone"
                            value={formik.values.patientPhone}
                            onChange={formik.handleChange}
                            placeholder="03001234567"
                        />
                        {formik.errors.patientPhone && formik.touched.patientPhone && (
                            <span className="text-red-500 text-xs">
                                {formik.errors.patientPhone}
                            </span>
                        )}
                    </div>

                    {/* Doctor Name */}
                    <div className="grid gap-2">
                        <Label htmlFor="doctorName">Doctor Name</Label>
                        <Input
                            id="doctorName"
                            name="doctorName"
                            value={formik.values.doctorName}
                            onChange={formik.handleChange}
                            placeholder="Dr. Khan"
                        />
                        {formik.errors.doctorName && formik.touched.doctorName && (
                            <span className="text-red-500 text-xs">
                                {formik.errors.doctorName}
                            </span>
                        )}
                    </div>

                    {/* Appointment Date */}
                    <div className="grid gap-2">
                        <Label htmlFor="appointmentDate">Appointment Date</Label>
                        <Input
                            id="appointmentDate"
                            name="appointmentDate"
                            type="date"
                            value={formik.values.appointmentDate}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.appointmentDate && formik.touched.appointmentDate && (
                            <span className="text-red-500 text-xs">
                                {formik.errors.appointmentDate}
                            </span>
                        )}
                    </div>

                    {/* Appointment Time */}
                    <div className="grid gap-2">
                        <Label htmlFor="appointmentTime">Appointment Time</Label>
                        <Input
                            id="appointmentTime"
                            name="appointmentTime"
                            type="time"
                            value={formik.values.appointmentTime}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.appointmentTime && formik.touched.appointmentTime && (
                            <span className="text-red-500 text-xs">
                                {formik.errors.appointmentTime}
                            </span>
                        )}
                    </div>

                    {/* Reason */}
                    <div className="grid gap-2">
                        <Label htmlFor="reason">Reason for Visit</Label>
                        <Textarea
                            id="reason"
                            name="reason"
                            value={formik.values.reason}
                            onChange={formik.handleChange}
                            placeholder="Describe the reason for appointment"
                            rows={3}
                        />
                        {formik.errors.reason && formik.touched.reason && (
                            <span className="text-red-500 text-xs">
                                {formik.errors.reason}
                            </span>
                        )}
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button
                        onClick={() => formik.submitForm()}
                        disabled={loading}
                    >
                        {loading ? "Scheduling..." : "Schedule Appointment"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AddAppointment;