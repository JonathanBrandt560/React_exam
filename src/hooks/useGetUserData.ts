import { useQuery } from "@tanstack/react-query";
import type { User } from "../types/users";

export const MAX_CALLS_PER_DAY = 100;
const STORAGE_KEY = "api-call-count";

const getToday = () => new Date().toISOString().slice(0, 10);

export const getTodaysCallCount = (): number => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");
    return saved?.date === getToday() ? saved.count : 0;
};

const checkAndCountCall = () => {
    const count = getTodaysCallCount();

    if (count >= MAX_CALLS_PER_DAY) {
        throw new Error("Max antal API-anrop för idag är nått (100).")
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: getToday(), count: count + 1 }));

};

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

export const useGetUserData = () => {
    const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['get-user-data'],
    queryFn: fetchUsers,
    staleTime: 1000 * 60 * 15,
    gcTime: 1000 * 60 * 15,
    retry: false,
});

    return {
         users: data ?? [], 
         isUserDataLoading: isLoading,
         isError,
         getUserData: refetch 
        };
};