import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { apiCall } from "@/utils/api";
import { API_PATHS } from "@/utils/apiPaths";
import { useEffect, useState } from "react";
import { PlusCircle, User, SquarePlus, Activity } from "lucide-react";
import AddPatientForm from "@/components/Forms/AddPatient";

const PatientList = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await apiCall("GET", API_PATHS.PATIENT.GET_PATIENTS);
        setData(response);
      } catch (err) {
        setError("Failed to load patient data...");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="flex items-center justify-center h-screen text-3xl">Loading...</div>;
  if (error) return <div className="flex items-center justify-center  text-xl">{error}</div>;

  const genderData =
    data?.statistics?.byGender?.map(item => ({
      name: item._id || 'Unknown',
      value: item.count,
    })) || [];

  const sortedGenderData = genderData
    .sort((a, b) => b.value - a.value);

  return (
    <>
      {showForm && (
        <AddPatientForm onClose={() => setShowForm(false)} />
      )}

      <div className="p-6 space-y-6 bg-gray-50 min-h-screen">

        {/* Search-Add Patient */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-semibold text-gray-800">Patients Management</h1>
          <div className="flex items-center gap-3">
            <Input placeholder="Search patient by name or condition..." className="w-72" />
            <Button onClick={() => setShowForm(true)} variant="default" className="flex items-center gap-2 cursor-pointer">
              <PlusCircle className="w-4 h-4" />
              Add Patient
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <Card className="border border-neutral-200 shadow-sm">
            <CardContent className="p-4 flex items-center gap-3">
              <User className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">Total Patients</p>
                <p className="text-xl font-semibold text-gray-800">
                  {data?.totalPatients}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-neutral-200 shadow-sm">
            <CardContent className="p-4 flex items-center gap-3">
              <SquarePlus className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-sm text-gray-500">Recent Patients</p>
                <p className="text-xl font-semibold text-gray-800">
                  {data?.recentPatients?.length}
                </p>
              </div>
            </CardContent>
          </Card>

        </div>

        <div className="">
          <Card className="border border-neutral-200 shadow-sm">
            <div className="flex items-center justify-center gap-3">
              <Activity className="w-8 h-8 text-gray-500" />
              <p className="text-sm text-gray-500">Patient's Gender Distribution</p>
            </div>

            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={sortedGenderData}
                margin={{ top: 20, right: 20, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="value"
                  // fill="#D1D5DB" // Dynamically set color based on gender
                />
              </BarChart>
            </ResponsiveContainer>

          </Card>
        </div>

        {/* Patient Data Table */}
        <Card className="shadow-sm border border-neutral-200">
          <CardHeader>
            <CardTitle className="text-gray-700 text-lg font-medium">
              All Registered Patients
            </CardTitle>
          </CardHeader>

          <div className="grid grid-cols-8 px-6 py-3 bg-neutral-100 border-b border-neutral-200 text-sm font-semibold text-gray-600">
            <span>ID</span>
            <span>Patient</span>
            <span>Gender</span>
            <span>Age</span>
            <span>Email</span>
            <span>Phone</span>
            <span>Condition</span>
            <span>Status</span>
          </div>

          <CardContent>
            <ScrollArea className="h-[600px]">
              <div className="divide-y divide-neutral-200">
                {data?.patients?.map((patient, i) => (
                  <div
                    key={patient.id}
                    className="grid grid-cols-8 items-center py-4 bg-white hover:bg-neutral-50 transition"
                  >
                    <p className="text-gray-700 text-sm font-medium">{patient._id.slice(0, 5)}</p>

                    <div className="flex items-center space-x-2">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={`https://i.pravatar.cc/150?img=${i + 15}`} />
                        <AvatarFallback>{patient.name[0]}</AvatarFallback>
                      </Avatar>
                      <p className="text-gray-800 font-medium">{patient.name}</p>
                    </div>

                    <span className="text-sm text-gray-600">{patient.gender}</span>
                    <span className="text-sm text-gray-600">{patient.age}</span>
                    <span className="text-sm text-gray-600">{patient.email}</span>
                    <span className="text-sm text-gray-600">{patient.phone}</span>
                    <span className="text-sm text-gray-600">{patient.condition}</span>
                    <div className="flex justify-start">
                      <Badge
                        variant={
                          patient.status === "Active"
                            ? "default"
                            : patient.status === "Recovered"
                              ? "secondary"
                              : "outline"
                        }
                        className={
                          patient.status === "Active"
                            ? "bg-green-500 text-white"
                            : patient.status === "Recovered"
                              ? "bg-gray-400 text-white"
                              : "bg-yellow-400 text-white"
                        }
                      >
                        {patient.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default PatientList;
