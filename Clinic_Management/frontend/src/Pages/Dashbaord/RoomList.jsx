import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { PlusCircle } from "lucide-react"

const RoomList = () => {

    const rooms = [
        {
            id: 101,
            type: "Operation Room",
            doctor: "Dr. John Smith",
            patient: "David Khan",
            status: "Occupied",
            schedule: "09:00 AM - 12:00 PM",
        },
        {
            id: 102,
            type: "General Room",
            doctor: "Dr. Emily Johnson",
            patient: "",
            status: "Available",
            schedule: "-",
        },
        {
            id: 103,
            type: "Private Room",
            doctor: "Dr. Robert Brown",
            patient: "Anna Lee",
            status: "Occupied",
            schedule: "02:00 PM - 05:00 PM",
        },
        {
            id: 104,
            type: "ICU",
            doctor: "Dr. Olivia Wilson",
            patient: "Mark Taylor",
            status: "Occupied",
            schedule: "24 Hours",
        },
        {
            id: 105,
            type: "General Room",
            doctor: "",
            patient: "",
            status: "Available",
            schedule: "-",
        },
    ]

    return (
        <div className="p-6 space-y-8 bg-gray-50 min-h-screen">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h1 className="text-2xl font-semibold text-gray-800">Rooms Management</h1>
                <div className="flex items-center gap-3">
                    <Input placeholder="Search room by ID or type..." className="w-72" />
                    <Button variant="default" className="flex items-center gap-2">
                        <PlusCircle className="w-4 h-4" />
                        Add Room
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-white border border-neutral-200 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-sm font-medium text-gray-600">Total Rooms</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-semibold text-gray-800">{rooms.length}</p>
                    </CardContent>
                </Card>
                <Card className="bg-white border border-neutral-200 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-sm font-medium text-gray-600">Occupied</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-semibold text-red-500">
                            {rooms.filter(r => r.status === "Occupied").length}
                        </p>
                    </CardContent>
                </Card>
                <Card className="bg-white border border-neutral-200 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-sm font-medium text-gray-600">Available</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-semibold text-green-600">
                            {rooms.filter(r => r.status === "Available").length}
                        </p>
                    </CardContent>
                </Card>
                <Card className="bg-white border border-neutral-200 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-sm font-medium text-gray-600">Types</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-semibold text-gray-800">
                            {new Set(rooms.map(r => r.type)).size}
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* RoomsList */}
            <Card className="border border-neutral-200 shadow-sm">
                <CardHeader>
                    <CardTitle className="text-gray-700 text-lg font-medium">Room Allocations</CardTitle>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-[600px]">
                        <div className="space-y-4">
                            {rooms.map((room) => (
                                <div
                                    key={room.id}
                                    className="flex flex-col md:flex-row md:items-center justify-between p-5 bg-white border border-neutral-200 rounded-lg shadow-sm hover:shadow-md transition"
                                >
                                    <div className="space-y-1">
                                        <h2 className="text-lg font-semibold text-gray-800">Room #{room.id}</h2>
                                        <p className="text-sm text-gray-500">{room.type}</p>
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        <p><span className="font-medium text-gray-700">Doctor:</span> {room.doctor || "Unassigned"}</p>
                                        <p><span className="font-medium text-gray-700">Patient:</span> {room.patient || "No Patient"}</p>
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        <p><span className="font-medium text-gray-700">Schedule:</span> {room.schedule}</p>
                                    </div>
                                    <div className="flex justify-end mt-3 md:mt-0">
                                        <Badge
                                            variant="outline"
                                            className={
                                                room.status === "Available"
                                                    ? "bg-green-100 text-green-700 border-green-300"
                                                    : "bg-red-100 text-red-700 border-red-300"
                                            }
                                        >
                                            {room.status}
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    )
}


export default RoomList