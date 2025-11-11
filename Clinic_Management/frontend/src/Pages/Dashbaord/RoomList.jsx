import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { PlusCircle } from "lucide-react";
import AddRoom from "../../components/Forms/AddRoom";
import { apiCall } from "../../utils/api";
import { API_PATHS } from "../../utils/apiPaths";

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const res = await apiCall("GET", API_PATHS.ROOM.GET_ALL);
      setRooms(res.data || []);
    } catch (err) {
      console.error("Error fetching rooms:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const filteredRooms = rooms.filter(
    (room) =>
      room.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room._id?.toString().includes(searchTerm)
  );

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {showForm && (
        <AddRoom
          onClose={() => setShowForm(false)}
          refreshRooms={fetchRooms}
        />
      )}

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
        <Input
          placeholder="Search room by ID or type..."
          className="w-72"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          onClick={() => setShowForm(true)}
          variant="default"
          className="flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          Add Room
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Room Allocations</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px]">
            {loading ? (
              <p className="text-center py-10">Loading rooms...</p>
            ) : filteredRooms.length === 0 ? (
              <p className="text-center py-10 text-gray-500">No rooms found.</p>
            ) : (
              <div className="space-y-4">
                {filteredRooms.map((room) => (
                  <div
                    key={room._id}
                    className="flex flex-col md:flex-row md:items-center justify-between p-5 bg-white border rounded-lg shadow-sm hover:shadow-md transition"
                  >
                    <div className="space-y-1">
                      <p className="font-semibold text-gray-800">Room #{room._id.slice(0,5)}</p>
                      <p className="text-sm text-gray-500">{room.type}</p>
                    </div>

                    <div className="text-sm text-gray-600">
                      <p>
                        <span className="font-medium text-gray-700">Doctor:</span>{" "}
                        {room.doctorId?.name || "Unassigned"}
                      </p>
                      <p>
                        <span className="font-medium text-gray-700">Patient:</span>{" "}
                        {room.patientId?.name || "No Patient"}
                      </p>
                    </div>

                    <div className="text-sm text-gray-600">
                      <p>
                        <span className="font-medium text-gray-700">Schedule:</span>{" "}
                        {room.schedule || "-"}
                      </p>
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
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoomList;
