import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

function ProfileMenu() {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <DropdownMenu>
            {/* Trigger that toggles dropdown open/close */}
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="cursor-pointer">
                    Profile
                </Button>
            </DropdownMenuTrigger>

            {/* Dropdown content shown when clicking "Profile" */}
            <DropdownMenuContent className="w-40" align="start">
                <DropdownMenuItem onClick={handleLogout}>
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default ProfileMenu;
