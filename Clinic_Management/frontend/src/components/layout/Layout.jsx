import { SidebarProvider } from "@/components/ui/sidebar"
import AppSidebar from "./App-Sidebar"
import ProfileMenu from "../profile-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export default function Layout({ children }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-screen">
                <div className="px-10 py-2 flex justify-between items-center w-full border-2">
                    <h1 className="text-gray-600 text-xl font-bold">Khan'sClinic</h1>
                    <div className="gap-4 flex items-center justify-center">
                        <Avatar className="w-10 cursor-pointer">
                            <AvatarImage className="rounded-full" src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <ProfileMenu />
                    </div>
                </div>
                {children}
            </main>
        </SidebarProvider>
    )
}
