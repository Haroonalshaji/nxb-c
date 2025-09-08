import api from "./index";

export const signInUser = (credentials) => api.post("/customer-login", credentials);
export const signUpUser = (credentials) => api.post("/register", credentials);
export const verifyUserEmailwithOTP = (credentials) => api.post(`/register/verify-otp?custGuid=${credentials.custGuid}&otp=${credentials.otp}`, credentials);
export const resendUserVerificatinOTP = (credentials) => api.post("/register/resend-otp", credentials);