import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"


const PatientList = () => {

    const patients = [
        { name: "John Doe", age: 35, gender: "Male", email: "john.doe@email.com", phone: "+92 333 1122334", condition: "Checkup" },
        { name: "Anna Lee", age: 28, gender: "Female", email: "anna.lee@email.com", phone: "+92 322 3344556", condition: "Consultation" },
        { name: "Mark Taylor", age: 40, gender: "Male", email: "mark.taylor@email.com", phone: "+92 321 2233445", condition: "Follow-up" },
        { name: "Lisa Brown", age: 32, gender: "Female", email: "lisa.brown@email.com", phone: "+92 300 6677889", condition: "Therapy" },
        { name: "David Khan", age: 45, gender: "Male", email: "david.khan@email.com", phone: "+92 307 7788990", condition: "Surgery" },
    ]

    return (
        <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-gray-800">Patients List</h1>
                <Input placeholder="Search patient by name or condition..." className="w-72" />
            </div>


            <Card className="shadow-sm border-neutral-200">
                <CardHeader>
                    <CardTitle className="text-gray-700 text-lg font-medium">All Registered Patients</CardTitle>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-[600px]">
                        <div className="space-y-4">
                            {patients.map((patient, i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-white rounded-md border hover:shadow-sm">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-12 w-12">
                                            <AvatarImage src={`https://i.pravatar.cc/150?img=${i + 10}`} />
                                            <AvatarFallback>{patient.name[0]}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="text-base font-medium text-gray-800">{patient.name}</p>
                                            <p className="text-sm text-gray-500">{patient.gender}, {patient.age} yrs</p>
                                            <p className="text-xs text-gray-400">{patient.email}</p>
                                            <p className="text-xs text-gray-400">{patient.phone}</p>
                                        </div>
                                    </div>
                                    <Badge variant="outline">{patient.condition}</Badge>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    )
}
export default PatientList
