import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { apiCall } from '@/utils/api';
import { toast } from 'sonner';
import { API_PATHS } from '@/utils/apiPaths';

const AddDoctorForm = ({ onClose }) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        age: '',
        gender: '',
        specialization: '',
        experience: '',
        fee: '',
        room: '',
        schedule: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        // Simple validation
        if (!formData.name || !formData.email || !formData.password || !formData.age || !formData.gender || !formData.specialization || !formData.experience || !formData.fee) {
            setError('Please fill in all required fields!');
            return;
        }

        setLoading(true);
        try {
            await apiCall("POST", API_PATHS.ADMIN.ADD_DOCTOR, {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                age: formData.age,
                gender: formData.gender,
                specialization: formData.specialization,
                experience: formData.experience,
                fee: formData.fee,
                room: formData.room,
                schedule: formData.schedule,
            });

            toast("Doctor added successfully");
            setSuccess(true);
            setFormData({
                name: '',
                email: '',
                password: '',
                age: '',
                gender: '',
                specialization: '',
                experience: '',
                fee: '',
                room: '',
                schedule: '',
            });

            onClose && onClose();

        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || "Failed to add doctor";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleClear = () => {
        setFormData({
            name: '',
            email: '',
            password: '',
            age: '',
            gender: '',
            specialization: '',
            experience: '',
            fee: '',
            room: '',
            schedule: '',
        });
        setError('');
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

                    <form className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
                            <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Dr. John Doe" disabled={loading} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                            <Input id="email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" disabled={loading} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password">Password <span className="text-red-500">*</span></Label>
                            <Input id="password" type="password" name="password" value={formData.password} onChange={handleChange} placeholder="********" disabled={loading} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="age">Age <span className="text-red-500">*</span></Label>
                            <Input id="age" type="number" name="age" value={formData.age} onChange={handleChange} placeholder="35" disabled={loading} />
                        </div>

                        <div className="grid gap-2 flex-1">
                            <Label>Gender <span className="text-red-500">*</span></Label>
                            <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })} disabled={loading}>
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

                        <div className="grid gap-2">
                            <Label htmlFor="specialization">Specialization <span className="text-red-500">*</span></Label>
                            <Input id="specialization" name="specialization" value={formData.specialization} onChange={handleChange} placeholder="Cardiology" disabled={loading} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="experience">Experience (years) <span className="text-red-500">*</span></Label>
                            <Input id="experience" type="number" name="experience" value={formData.experience} onChange={handleChange} placeholder="10" disabled={loading} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="fee">Consultation Fee <span className="text-red-500">*</span></Label>
                            <Input id="fee" type="number" name="fee" value={formData.fee} onChange={handleChange} placeholder="100" disabled={loading} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="room">Room Number</Label>
                            <Input id="room" name="room" value={formData.room} onChange={handleChange} placeholder="101" disabled={loading} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="schedule">Schedule</Label>
                            <Input id="schedule" name="schedule" value={formData.schedule} onChange={handleChange} placeholder="Mon-Fri 9am-5pm" disabled={loading} />
                        </div>
                    </form>
                </CardContent>

                <CardFooter className="flex gap-3 pt-4">
                    <Button onClick={handleSubmit} disabled={loading} className="flex-1 cursor-pointer">
                        {loading ? 'Adding...' : 'Add Doctor'}
                    </Button>
                    <Button onClick={handleClear} variant="outline" disabled={loading}>
                        Clear
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default AddDoctorForm;
