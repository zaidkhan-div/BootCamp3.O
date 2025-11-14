import React, { useState } from "react"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { toast } from "sonner"
import { API_PATHS } from "../../utils/apiPaths"
import { apiCall } from "../../utils/api"

const AddCaseHistoryForm = ({ onClose, onSuccess }) => {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState("")
    const [formData, setFormData] = useState({
        patientName: "",
        doctorName: "",
        diagnosis: "",
        treatment: "",
        status: "",
        notes: "",
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setSuccess(false)

        const { patientName, doctorName, diagnosis, treatment, status } = formData
        if (!patientName || !doctorName || !diagnosis || !treatment || !status) {
            setError("Please fill in all required fields!")
            return
        }

        setLoading(true)
        try {
            await apiCall("POST", API_PATHS.ADMIN.ADD_CASE_HISTORY, formData)
            toast("Case history added successfully")
            setSuccess(true)
            setFormData({
                patientName: "",
                doctorName: "",
                diagnosis: "",
                treatment: "",
                status: "",
                notes: "",
            })
            onSuccess && onSuccess()
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || "Failed to add case history"
            setError(errorMessage)
        } finally {
            setLoading(false)
        }
    }

    const handleClear = () => {
        setFormData({
            patientName: "",
            doctorName: "",
            diagnosis: "",
            treatment: "",
            status: "",
            notes: "",
        })
        setError("")
        setSuccess(false)
    }

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
                    <CardTitle className="text-2xl">Add Case History</CardTitle>
                    <CardDescription>Enter details for a new patient case</CardDescription>
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
                                Case history added successfully!
                            </AlertDescription>
                        </Alert>
                    )}

                    <form className="space-y-4">
                        <div className="grid gap-2">
                            <Label>Patient Name <span className="text-red-500">*</span></Label>
                            <Input
                                name="patientName"
                                value={formData.patientName}
                                onChange={handleChange}
                                placeholder="John Doe"
                                disabled={loading}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label>Doctor Name <span className="text-red-500">*</span></Label>
                            <Input
                                name="doctorName"
                                value={formData.doctorName}
                                onChange={handleChange}
                                placeholder="Dr. Smith"
                                disabled={loading}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label>Diagnosis <span className="text-red-500">*</span></Label>
                            <Input
                                name="diagnosis"
                                value={formData.diagnosis}
                                onChange={handleChange}
                                placeholder="e.g., Flu, Covid-19"
                                disabled={loading}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label>Treatment <span className="text-red-500">*</span></Label>
                            <Input
                                name="treatment"
                                value={formData.treatment}
                                onChange={handleChange}
                                placeholder="Prescribed medicines, rest, etc."
                                disabled={loading}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label>Status <span className="text-red-500">*</span></Label>
                            <Select
                                value={formData.status}
                                onValueChange={(value) => setFormData({ ...formData, status: value })}
                                disabled={loading}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Under Treatment">Under Treatment</SelectItem>
                                    <SelectItem value="Recovered">Recovered</SelectItem>
                                    <SelectItem value="Critical">Critical</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid gap-2">
                            <Label>Additional Notes</Label>
                            <Input
                                name="notes"
                                value={formData.notes}
                                onChange={handleChange}
                                placeholder="Optional"
                                disabled={loading}
                            />
                        </div>
                    </form>
                </CardContent>

                <CardFooter className="flex gap-3 pt-4">
                    <Button onClick={handleSubmit} disabled={loading} className="flex-1 cursor-pointer">
                        {loading ? "Adding..." : "Add Case"}
                    </Button>
                    <Button onClick={handleClear} variant="outline" disabled={loading}>
                        Clear
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default AddCaseHistoryForm
