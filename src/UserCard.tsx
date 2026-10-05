import type { User } from "./types"
import { UserRound } from "lucide-react" 

interface UserCardProps {
    user : User;
    onSelect: (user: User) => void;
}

export const UserCard = ({ user, onSelect } : UserCardProps) => {
    return (
        <div className="flex flex-col pb-2">
            <UserRound className="text-black"/>
            <h3>användarnamn: {user.username}</h3>
            <p>namn: {user.profile.name}</p>
            <p>email: {user.profile.email}</p>
            <p>roller: {user.roles.join(", ")}</p>
            <button className="border-2 rounded-lg p-0.5 self-center hover:bg-slate-400" onClick={() => onSelect(user)}>Visa detaljer</button>
        </div>
    )
} 