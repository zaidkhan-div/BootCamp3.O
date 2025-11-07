import { Home, User, ClipboardPlus, House, ClipboardClock } from "lucide-react"

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

const items = [
    { title: "Overview", url: "/dashboard", icon: Home },
    { title: "Doctor List", url: "/dashboard/doctors", icon: ClipboardPlus },
    { title: "Patient List", url: "/dashboard/patients", icon: User },
    { title: "Appointment List", url: "/dashboard/appointments", icon: ClipboardClock },
    { title: "Room List", url: "/dashboard/rooms", icon: House },
];

function AppSidebar() {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup className="p-8">
                    <SidebarGroupLabel className="text-gray-600 font-semibold text-xl mb-5">Dashbaord</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
export default AppSidebar