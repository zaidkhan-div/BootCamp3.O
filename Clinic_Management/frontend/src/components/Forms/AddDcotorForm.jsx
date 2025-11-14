import React, { useState } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { API_PATHS } from "@/utils/apiPaths";
import { apiCall } from "@/utils/api";

const AddDoctorForm = ({ onClose, onSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        age: "",
        gender: "",
        specialization: "",
        experience: "",
        fee: "",
        roomId: "",
        scheduleIds: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        setError("");
        setSuccess(false);

        // Basic validation
        if (
            !formData.name ||
            !formData.email ||
            !formData.password ||
            !formData.phone ||
            !formData.age ||
            !formData.gender ||
            !formData.specialization ||
            !formData.experience ||
            !formData.fee
        ) {
            setError("Please fill in all required fields!");
            return;
        }

        setLoading(true);

        try {
            // ✅ Exact payload backend expects
            const payload = {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                phone: formData.phone,
                age: formData.age,
                gender: formData.gender,
                specialization: formData.specialization,
                experience: formData.experience,
                fee: Number(formData.fee),
                roomId: formData.room || "Not assigned",
                scheduleIds: formData.schedule ? [formData.schedule] : [],
            };


            await apiCall("POST", API_PATHS.ADMIN.ADD_DOCTOR, payload);

            setSuccess(true);
            setFormData({
                name: "",
                email: "",
                password: "",
                phone: "",
                age: "",
                gender: "",
                specialization: "",
                experience: "",
                fee: "",
                room: "",
                schedule: "",
            });

            if (onSuccess) {
                setTimeout(() => onSuccess(), 1000);
            }

        } catch (err) {
            console.error("Error adding doctor:", err);
            const errorMessage = err.response?.data?.message || err.message || "Failed to add dpctor";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };


    const handleClear = () => {
        setFormData({
            name: "",
            email: "",
            password: "",
            phone: "",
            age: "",
            gender: "",
            specialization: "",
            experience: "",
            fee: "",
            roomId: "",
            scheduleIds: "",
        });
        setError("");
        setSuccess(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <Card className="relative w-full max-w-md shadow-xl">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition cursor-pointer"
                >
                    ✕
                </button>

                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Add New Doctor</CardTitle>
                    <CardDescription>Enter doctor details</CardDescription>
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
                            <AlertDescription className="text-green-800">
                                Doctor added successfully!
                            </AlertDescription>
                        </Alert>
                    )}

                    <div className="grid gap-4">
                        {/* Name + Email */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="name">
                                    Full Name <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Dr. John Doe"
                                    disabled={loading}
                                />
                            </div>
                            <div>
                                <Label htmlFor="email">
                                    Email <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="john@example.com"
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {/* Phone + Age */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="phone">
                                    Phone <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="03001234567"
                                    disabled={loading}
                                />
                            </div>
                            <div>
                                <Label htmlFor="age">
                                    Age <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="age"
                                    type="text"
                                    name="age"
                                    value={formData.age}
                                    onChange={handleChange}
                                    placeholder="35"
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {/* Gender + Specialization */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label>
                                    Gender <span className="text-red-500">*</span>
                                </Label>
                                <Select
                                    value={formData.gender}
                                    onValueChange={(value) =>
                                        setFormData({ ...formData, gender: value })
                                    }
                                    disabled={loading}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select gender" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="male">Male</SelectItem>
                                        <SelectItem value="female">Female</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="specialization">
                                    Specialization <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="specialization"
                                    name="specialization"
                                    value={formData.specialization}
                                    onChange={handleChange}
                                    placeholder="Cardiology"
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {/* Experience + Fee */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="experience">
                                    Experience (years) <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="experience"
                                    type="text"
                                    name="experience"
                                    value={formData.experience}
                                    onChange={handleChange}
                                    placeholder="10"
                                    disabled={loading}
                                />
                            </div>
                            <div>
                                <Label htmlFor="fee">
                                    Consultation Fee <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="fee"
                                    type="text"
                                    name="fee"
                                    value={formData.fee}
                                    onChange={handleChange}
                                    placeholder="100"
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {/* Room + Schedule */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="roomId">
                                    Room ID <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="roomId"
                                    name="roomId"
                                    value={formData.roomId}
                                    onChange={handleChange}
                                    placeholder="Room101"
                                    disabled={loading}
                                />
                            </div>
                            <div>
                                <Label htmlFor="scheduleIds">
                                    Schedule IDs (comma separated){" "}
                                    <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="scheduleIds"
                                    name="scheduleIds"
                                    value={formData.scheduleIds}
                                    onChange={handleChange}
                                    placeholder="schedule1, schedule2"
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <Label htmlFor="password">
                                Password <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="********"
                                disabled={loading}
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3 pt-4">
                            <Button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="flex-1 cursor-pointer"
                            >
                                {loading ? "Adding..." : "Add Doctor"}
                            </Button>
                            <Button
                                onClick={handleClear}
                                variant="outline"
                                type="button"
                                disabled={loading}
                            >
                                Clear
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default AddDoctorForm;
