import { Home, User, ClipboardPlus, House, ClipboardClock, History } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

const AppSidebar = () => {
    const { user } = useAuth();

    const items = [
        { title: "Overview", url: "/dashboard", icon: Home },
        ...(user?.role === "admin"
            ? [
                { title: "Doctor List", url: "/dashboard/doctors", icon: ClipboardPlus },
                { title: "Patient List", url: "/dashboard/patients", icon: User },
                { title: "Appointment List", url: "/dashboard/appointments", icon: ClipboardClock },
                { title: "Room List", url: "/dashboard/rooms", icon: House },
            ]
            : [
                // patient sees only limited routes
                { title: "Appointment List", url: "/dashboard/appointments", icon: ClipboardClock },
                { title: "Case History", url: "/dashboard/case-history", icon: History },
            ]),
    ];

    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup className="p-8">
                    <SidebarGroupLabel className="text-gray-600 font-semibold text-xl mb-5">
                        Dashboard
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link to={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
};

export default AppSidebar