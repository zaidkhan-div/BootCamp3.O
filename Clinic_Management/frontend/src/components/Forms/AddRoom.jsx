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

const AddRoom = ({ onClose }) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [doctors, setDoctors] = useState([]);
    const [formData, setFormData] = useState({
        roomId: '',
        type: '',
        doctorId: '',
        schedule: '',
        status: 'Available'
    });

    // Fetch doctors for select
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const res = await apiCall('GET', API_PATHS.ADMIN.GET_ALL_DOCTORS);
                setDoctors(res.doctors || []);
            } catch (err) {
                console.error(err);
            }
        };
        fetchDoctors();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        if (!formData.roomId || !formData.type || !formData.doctorId || !formData.schedule) {
            setError('Please fill all required fields!');
            return;
        }

        setLoading(true);
        try {
            await apiCall('POST', API_PATHS.ROOM.CREATE, formData);
            toast('Room added successfully');
            setSuccess(true);
            setFormData({
                roomId: '',
                type: '',
                doctorId: '',
                schedule: '',
                status: 'Available'
            });
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Failed to add room');
        } finally {
            setLoading(false);
        }
    };

    const handleClear = () => {
        setFormData({ roomId: '', type: '', doctorId: '', schedule: '', status: 'Available' });
        setError('');
        setSuccess(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <Card className="relative w-full max-w-md shadow-xl">
                <button onClick={onClose} className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition cursor-pointer">✕</button>
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Add New Room</CardTitle>
                    <CardDescription>Allocate room for a doctor with schedule</CardDescription>
                </CardHeader>

                <CardContent>
                    {error && <Alert variant="destructive" className="mb-4"><AlertCircle className="h-4 w-4" /><AlertDescription>{error}</AlertDescription></Alert>}
                    {success && <Alert className="mb-4 bg-green-50 border-green-200"><CheckCircle2 className="h-4 w-4 text-green-600" /><AlertDescription className="text-green-800">Room added successfully!</AlertDescription></Alert>}

                    <form className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="roomId">Room Number / Name <span className="text-red-500">*</span></Label>
                            <Input id="roomId" name="roomId" value={formData.roomId} onChange={handleChange} placeholder="101" disabled={loading} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="type">Room Type <span className="text-red-500">*</span></Label>
                            <Input id="type" name="type" value={formData.type} onChange={handleChange} placeholder="Operation / General / ICU" disabled={loading} />
                        </div>

                        <div className="grid gap-2">
                            <Label>Assign Doctor <span className="text-red-500">*</span></Label>
                            <Select value={formData.doctorId} onValueChange={(value) => setFormData({ ...formData, doctorId: value })} disabled={loading}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select doctor" />
                                </SelectTrigger>
                                <SelectContent>
                                    {doctors.map((doc) => (
                                        <SelectItem key={doc._id} value={doc._id}>{doc.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="schedule">Schedule <span className="text-red-500">*</span></Label>
                            <Input id="schedule" name="schedule" value={formData.schedule} onChange={handleChange} placeholder="09:00 AM - 12:00 PM" disabled={loading} />
                        </div>
                    </form>
                </CardContent>

                <CardFooter className="flex gap-3 pt-4">
                    <Button onClick={handleSubmit} disabled={loading} className="flex-1">{loading ? 'Adding...' : 'Add Room'}</Button>
                    <Button onClick={handleClear} variant="outline" disabled={loading}>Clear</Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default AddRoom;
