import { SidebarProvider } from "@/components/ui/sidebar"
import AppSidebar from "./App-Sidebar"
import ProfileMenu from "../profile-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useAuth } from "../../Context/AuthContext";

export default function Layout({ children }) {
    const { user } = useAuth();
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-screen min-h-screen bg-gray-50">
                {/* Header */}
                <div className="px-10 py-4 flex justify-between items-center border-b border-gray-200 bg-white shadow-sm">
                    <h1 className="text-gray-700 text-2xl font-bold">Khan'sClinic</h1>

                    <div className="flex items-center gap-4">
                        {/* Avatar */}
                        <Avatar className="w-12 h-12">
                            <AvatarImage
                                className="rounded-full object-cover"
                                src="https://github.com/shadcn.png"
                            />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>

                        {
                            user &&
                            <div className="flex flex-col">
                                <span className="text-gray-800 font-semibold text-lg">{user.name}</span>
                                <span className="text-gray-500 text-sm capitalize">{user.role}</span>
                            </div>
                        }

                        <ProfileMenu />
                    </div>
                </div>

                {/* Page Content */}
                <div className="pt-5">{children}</div>
            </main>
        </SidebarProvider>
    )
}
