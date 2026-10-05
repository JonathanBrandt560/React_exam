import { useState } from "react";
import { UserCard } from "./UserCard"
import type { User } from "./types"
import { UserDetailCard } from "./UserDetailCard";
import { useGetUserData } from "./useGetUserData";


export const UserList = () => {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const { users, isUserDataLoading, isError, getUserData } = useGetUserData();

    if (isUserDataLoading) {
        return <p className="p-4">Laddar användare...</p>;
    }

    if (isError) {
        return (
            <div className="p-4">
                <p>Något gick fel när användarna skulle hämtas</p>
                <button onClick={() => getUserData()} className="border-2 rounded-lg p-1 hover:bg-gray-400">
                    Försök igen
                </button>
            </div>
        )
    }

    return (
        <div className="flex flex-col bg-slate-400">
            <ul className="mt-4 items-center list-none p-0 m-0 flex flex-col gap-4">
                {users.map((user) => (
                    <li key={user.id} className="bg-slate-300 text-slate-700 flex border-2 rounded-2xl shadow-2xl w-70 justify-center">
                        <UserCard user={user} onSelect={setSelectedUser} />
                    </li>
                ))}
            </ul>

            {selectedUser && <UserDetailCard userDetail={selectedUser} onClose={() => setSelectedUser(null)} />}
        </div>
    )
}