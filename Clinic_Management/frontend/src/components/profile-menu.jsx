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
            <Button onClick={handleLogout} variant="outline" className="cursor-pointer">
                Log out
            </Button>
        </DropdownMenu>
    );
}

export default ProfileMenu;
