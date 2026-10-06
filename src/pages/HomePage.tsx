import { useGetUserData, getTodaysCallCount, MAX_CALLS_PER_DAY } from "../hooks/useGetUserData"
import { UserRound, UserStar } from "lucide-react"

export const HomePage = () => {

    const { users, isUserDataLoading, isError } = useGetUserData();
    const usersCount = users.length;
    const adminRoleCount = users.filter((user) => user.roles.includes("admin")).length;
    const apiCallCount = getTodaysCallCount();

    if (isUserDataLoading) return <p className="p-4">Laddar användare...</p>;

    if (isError) return <p>Något gick fel när användarna skulle hämtas</p>

    return (
        <section className="flex gap-4 pt-[25vh]">
            <div className="flex flex-col bg-slate-300 text-slate-700 border-2 rounded-2xl shadow-2xl w-70 justify-center p-2">
                <h2>Välkommen till Jonathans React-sida</h2>
            </div>
            
            <div className="flex flex-col bg-slate-300 text-slate-700 border-2 rounded-2xl shadow-2xl w-70 justify-center p-2 gap-2">
                <h2 className="self-center text-xl font-bold">Statistik</h2>
                <div className="flex items-center">
                    <UserRound size={35} />
                    <p className="text-lg px-2.5">Antal användare: {usersCount}</p>
                </div>
                <div className="flex items-center">
                    <UserStar size={40}/>
                    <p className="text-lg px-1">Antal admins: {adminRoleCount}</p>
                </div>
                <p>API-anrop idag: {apiCallCount} / {MAX_CALLS_PER_DAY}</p>
            </div>
        </section>
    )
}