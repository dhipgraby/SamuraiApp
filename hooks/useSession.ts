"use client";
import { useLocalStorage } from "./useLocalStorage";
import { logout } from "@/lib/actions/logout";

export const useSession = () => {

    const { getItem } = useLocalStorage('accessToken');
    const retrieveAccessToken = () => {
        const accessToken = getItem()
        if (!accessToken || accessToken === '') {
            logout()
        }
        return accessToken
    }

    return {
        retrieveAccessToken
    };
};