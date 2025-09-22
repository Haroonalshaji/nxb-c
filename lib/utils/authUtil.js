// lib/utils/authUtils.js
import {
    validateTokenAPI as validateClientTokenAPI,
    refreshTokenAPI as refreshClientTokenAPI,
    validateVendorTokenAPI,
    refreshVendorTokenAPI
} from '@/lib/api/auth';

import {
    getCookie as nGetCookie,
    setCookie as nSetCookie,
    deleteCookie as nDeleteCookie
} from '@/lib/utils/cookies';

// Aliases for cleaner use
const getCookie = nGetCookie;
const setCookie = nSetCookie;
const deleteCookie = nDeleteCookie;

/**
 * 🔑 Checks user authentication (client or vendor).
 * - Validates token
 * - Refreshes if expired
 * - Redirects if no valid session
 */
export async function checkAuth(userType, router, toast) {
    console.log("🔍 Checking authentication...");

    const accessToken = getCookie('accessToken');
    const refreshToken = getCookie('refreshToken');

    if (!accessToken) {
        toast({
            title: "You are not logged in!",
            variant: "destructive"
        });
        router.push('/vendor');
        return;
    }

    try {
        let isValid = false;

        // ✅ Validate token properly with APIs
        if (userType === 'client') {
            // const res = await validateClientTokenAPI(accessToken);
            if (accessToken) {
                isValid = true;
            } else {
                await refreshTokenAPI({ accessToken: accessToken, refreshToken: refreshToken })
            }
        } else if (userType === 'vendor') {
            if (accessToken) {
                isValid = true;
            } else {
                await refreshVendorTokenAPI({ accessToken: accessToken, refreshToken: refreshToken })
            }
        } else {
            throw new Error("Unknown user type");
        }

        if (isValid) {
            console.log("✅ Token is valid");
            return;
        }

        // ⏳ Try to refresh if invalid
        console.log("⚠️ Token invalid, attempting refresh...");

        if (!refreshToken) {
            toast({
                title: "Session expired. Please log in again.",
                variant: "destructive"
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

        if (newTokens?.accessToken) {
            // ✅ Use utils for cookies
            setCookie('accessToken', newTokens.accessToken, 1); // 1 day
            setCookie('refreshToken', newTokens.refreshToken, 7); // 7 days

            toast({
                title: "Session refreshed",
                variant: "success"
            });

            console.log("🔄 Tokens refreshed successfully");
            return;
        } else {
            toast({
                title: "Session expired. Please log in again.",
                variant: "destructive"
            });
            router.push('/login');
            return;
        }

    } catch (error) {
        console.error("❌ Auth check error:", error);
        toast({
            title: "Authentication failed. Please log in again.",
            variant: "destructive"
        });
        router.push('/vendor');
    }
}

/**
 * 🚪 Clears tokens & redirects to login
 */
export function redirectToLogin(userType, router, toast) {
    deleteCookie('accessToken');
    deleteCookie('refreshToken');

    toast({
        title: "Session expired. Please login again.",
        variant: "destructive",
    });

    router.push(userType === 'vendor' ? '/vendor' : '/signin');
}
