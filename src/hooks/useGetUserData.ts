import { useQuery } from "@tanstack/react-query";
import type { User } from "../types/users";

// API:et tillåter ett begränsat antal anrop. Antalet räknas per dag
// och sparas i localStorage så att det överlever sidomladdningar.

export const MAX_CALLS_PER_DAY = 100;
const STORAGE_KEY = "api-call-count";

// Dagens datum i formatet "ÅÅÅÅ-MM-DD"
const getToday = () => new Date().toISOString().slice(0, 10);


// Hämtar antal anrop som gjorts idag.
// Om det sparade datumet är en tidigare dag räknas det som 0.
export const getTodaysCallCount = (): number => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");
    return saved?.date === getToday() ? saved.count : 0;
};

// Stoppar anropet om dagens gräns är nådd, annars räknas det upp med ett.
// Kastar ett fel som React Query fångar upp och visar som isError.
const checkAndCountCall = () => {
    const count = getTodaysCallCount();

    if (count >= MAX_CALLS_PER_DAY) {
        throw new Error("Max antal API-anrop för idag är nått (100).")
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: getToday(), count: count + 1 }));

};

// Hämtar alla användare från API:et.
const fetchUsers = async(): Promise<User[]> => {
    checkAndCountCall();

    const res = await fetch('https://api-userapi.onrender.com/api/users/getUsers', {
        headers: {
            'x-api-key': 'elev-hemlighet-2026',
        },
    });

    if (!res.ok) {
        throw new Error(`Kunde inte hämta användare: ${res.status}`)
    }

    return res.json();
}

// Hämtar och cachar användardata med React Query.
export const useGetUserData = () => {
    const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['get-user-data'],
    queryFn: fetchUsers,
    staleTime: 1000 * 60 * 15, // datan räknas som färsk i 15 min, inga nya anrop under tiden
    gcTime: 1000 * 60 * 15, // oanvänd data ligger kvar i cachen i 15 min
    retry: false, // förhindrar automatiska omförsök till anrop
});

    return {
         users: data ?? [], // tom lista medan data saknas
         isUserDataLoading: isLoading,
         isError,
         getUserData: refetch 
        };
};