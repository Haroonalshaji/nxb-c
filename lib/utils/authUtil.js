// lib/utils/authUtils.js
import {
    validateTokenAPI as validateClientTokenAPI,
    refreshTokenAPI as refreshClientTokenAPI,
    validateVendorTokenAPI,
    refreshVendorTokenAPI
} from '@/lib/api/auth';
import { getCookie as nGetCookie, setCookie as nSetCookie, deleteCookie as nDeleteCookie } from '@/lib/utils/cookies';


const getCookie = nGetCookie;
const setCookie = nSetCookie;
const deleteCookie = nDeleteCookie;

export async function checkAuth(userType, router, toast) {

    console.log("Checking authentication");

    const accessToken = getCookie('accessToken');
    const refreshToken = getCookie('refreshToken');

    if (!accessToken) {
        toast({
            title: "You are not logged In !",
            variant: "destructive"
        });
        router.push('/login');
        return;
    }

    try {
        let isValid = false;

        // Validate the token based on user type
        if (userType === 'client' && accessToken) {
            isValid = true;
        } else if (userType === 'vendor' && accessToken) {
            isValid = true;
        } else {
            throw new Error("Unknown user type");
        }

        if (isValid) {
            console.log("Token is valid");
            return; // User is authenticated, allow access
        } else {
            console.log("Token invalid, trying to refresh");

            if (!refreshToken) {
                // toast.error("");
                toast({
                    title: "Session expired. Please log in again.",
                    variant: "error"
                });
                router.push('/login');
                return;
            }

            let newTokens;
            if (userType === 'client') {
                newTokens = await refreshClientTokenAPI(refreshToken);
            } else if (userType === 'vendor') {
                newTokens = await refreshVendorTokenAPI(refreshToken);
            }

            if (newTokens && newTokens.accessToken) {
                // Update cookies
                document.cookie = `accessToken=${newTokens.accessToken}; path=/; max-age=${60 * 60 * 24}`;
                document.cookie = `refreshToken=${newTokens.refreshToken}; path=/; max-age=${60 * 60 * 24 * 7}`;
                // toast.success("Session refreshed");
                toast({
                    title: "Session refreshed",
                    variant: "success"
                });
                console.log("Tokens refreshed successfully");
                return;

            } else {
                // toast.error("Session expired. Please log in again.");
                toast({
                    title: "Session expired. Please log in again.",
                    variant: "error"
                });
                router.push('/login');
                return;
            }
        }
    } catch (error) {
        console.error("Auth check error:", error);
        toast.error("Authentication failed. Please log in again.");
        router.push('/login');
    }

}

function redirectToLogin(userType, router, toast) {
    deleteCookie('accessToken');
    deleteCookie('refreshToken');
    toast({
        title: "Session expired. Please login again.",
        variant: "destructive",
    });
    router.push(userType === 'vendor' ? '/vendor' : '/signin');
}
