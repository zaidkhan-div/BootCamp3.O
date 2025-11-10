import React, { useState } from 'react';
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

const AddPatientForm = ({ onClose }) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        gender: '',
        age: ''
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

        if (!formData.fullName || !formData.email || !formData.phone || !formData.password || !formData.gender || !formData.age) {
            setError('Please fill in all required fields!');
            return;
        }

        setLoading(true);

        try {
            await apiCall("POST", API_PATHS.AUTH.REGISTER, {
                name: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                password: formData.password,
                age: formData.age,
                gender: formData.gender,
            });

            toast("Patient added successfully");
            setSuccess(true);
            setFormData({
                fullName: '',
                email: '',
                phone: '',
                password: '',
                gender: '',
                age: ''
            });

            onClose && onClose();

        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || "Failed to add patient";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleClear = () => {
        setFormData({
            fullName: '',
            email: '',
            phone: '',
            password: '',
            gender: '',
            age: ''
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
                    <CardTitle className="text-2xl">Add New Patient</CardTitle>
                    <CardDescription>Enter basic patient information</CardDescription>
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
                                Patient added successfully!
                            </AlertDescription>
                        </Alert>
                    )}

                    <form className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="fullName">Full Name <span className="text-red-500">*</span></Label>
                            <Input
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="John Doe"
                                disabled={loading}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
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

                        <div className="grid gap-2">
                            <Label htmlFor="phone">Phone <span className="text-red-500">*</span></Label>
                            <Input
                                id="phone"
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Number"
                                disabled={loading}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="age">Age <span className="text-red-500">*</span></Label>
                            <Input
                                id="age"
                                type="number"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                placeholder="30"
                                disabled={loading}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password">Password <span className="text-red-500">*</span></Label>
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

                        <div className="grid gap-2 flex-1">
                            <Label>Gender <span className="text-red-500">*</span></Label>
                            <Select
                                value={formData.gender}
                                onValueChange={(value) => setFormData({ ...formData, gender: value })}
                                disabled={loading}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">Female</SelectItem>
                                    <SelectItem value="child">Child</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </form>
                </CardContent>

                <CardFooter className="flex gap-3 pt-4">
                    <Button onClick={handleSubmit} disabled={loading} className="flex-1 cursor-pointer">
                        {loading ? 'Adding...' : 'Add Patient'}
                    </Button>
                    <Button onClick={handleClear} variant="outline" disabled={loading}>
                        Clear
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default AddPatientForm;
