import api from "./index";

// Client Authentication Systems:
export const signInUser = (credentials) => api.post("/auth/customer-login", credentials);
export const signUpUser = (credentials) => api.post("/auth/register", credentials);
export const verifyUserEmailwithOTP = (credentials) => api.post(`/auth/register/verify-otp?custGuid=${credentials.custGuid}&otp=${credentials.otp}`, credentials);
export const resendUserVerificatinOTP = (credentials) => api.post("/auth/register/resend-otp", credentials);
export const passwordReset = (credentials) => api.post("/auth/customer-forgot-password", credentials);
export const customerPasswordReset = (credentials) => api.post("/auth/customer-reset-password", credentials);


// Vendor Authentication Systems:
export const vendorSignin = (credentials) => api.post("/auth/vendor/login", credentials);
export const vendorRegister = (credentials) => api.post("/auth/vendor/register", credentials);
export const verifyVendorEmailwithOtp = (credentials) => api.post(`/auth/vendor/register/verify-otp?vendGuid=${credentials.vendGuid}&otp=${credentials.otp}`, credentials);
export const resendVendorEmailwithOtp = (credentials) => api.post(`/auth/vendor/register/resend-otp`, credentials);
export const vendorForgotPassword = (credentials) => api.post("/auth/vendor/forgot-password", credentials);
export const vendorResetPassword = (credentials) => api.post("/auth/vendor/reset-password", credentials);

// Token validation and refresh APIs
export const refreshTokenAPI = (refreshToken) => api.post("/auth/refresh-token", { refreshToken });
export const refreshVendorTokenAPI = (refreshToken) => api.post("/auth/vendor/refresh-token", { refreshToken });

// Enquiry submission API
export const submitEnquiry = (enquiryData) => {
    // Create FormData for multipart/form-data submission
    const formData = new FormData();
    
    // Add all required fields as per API documentation
    formData.append('FullName', enquiryData.name);
    formData.append('EmailAddress', enquiryData.email);
    formData.append('PhoneNo', enquiryData.phone);
    formData.append('PriorityLevel', enquiryData.priority);
    formData.append('ServiceRequired', enquiryData.service);
    formData.append('Description', enquiryData.description);
    
    // Add attachments if any
    if (enquiryData.attachments && enquiryData.attachments.length > 0) {
        enquiryData.attachments.forEach((attachment, index) => {
            formData.append('Attachments', attachment.file);
        });
    }
    
    // Submit with multipart/form-data content type
    return api.post('/enquiry', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};