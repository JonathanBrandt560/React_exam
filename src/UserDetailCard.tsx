import type { User } from "./types"
import { UserRound } from "lucide-react" 

interface UserDetailCardProps {
    userDetail: User;
    onClose: () => void;
}

export const UserDetailCard = ({userDetail, onClose} : UserDetailCardProps) => {

    return (
        <div onClick={onClose} 
             className="fixed inset-0 z-10 flex items-center justify-center bg-black/50 p-4"
        >     
            <section
                onClick={(e) => e.stopPropagation()} 
                className="flex flex-col w-full max-w-md max-h-full overflow-y-auto bg-gray-300 border-2 rounded-lg p-4"
            >
                <button onClick={onClose} className="self-end border-2 rounded-lg p-1 hover:bg-gray-400">Stäng</button>
                <div className="flex justify-center gap-2">
                    <UserRound size={35} className="text-black" />
                    <h2 className="text-xl font-bold border-b border-gray-400 py-2">Användare: {userDetail.username}</h2>
                </div>
                
                <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 border-b border-gray-400 py-2">
                    <dt className="font-bold">Namn</dt>
                    <dd>{userDetail.profile.name}</dd>

                    <dt className="font-bold">Email</dt>
                    <dd className="break-all">{userDetail.profile.email}</dd>

                    <dt className="font-bold">Roller</dt>
                    <dd>{userDetail.roles.join(", ")}</dd> 
                </dl>
        
                <h3 className="font-bold border-b border-gray-400 py-2">Adress</h3>
                <address className="border-b border-gray-400 py-2">
                    {userDetail.profile.address.street}<br />
                    {userDetail.profile.address.zipCode} {userDetail.profile.address.city}
                </address>
                
                <h3 className="text-lg font-bold border-b border-gray-400 py-2">Inställningar</h3>
                <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 border-b border-gray-400 py-2">
                    <dt className="font-bold">Tema</dt>
                    <dd>{userDetail.settings.theme}</dd>

                    <dt className="font-bold">Email-notiser</dt>
                    <dd>{userDetail.settings.notifications.email ? "på" : "av"}</dd>

                    <dt className="font-bold ">Push-notiser</dt>
                    <dd>{userDetail.settings.notifications.push ? "på" : "av"}</dd>
                </dl>
                
            </section>
        </div>
    )
}