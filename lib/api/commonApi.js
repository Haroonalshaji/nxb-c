import api from './index'

const api_key = process.env.NEXT_PUBLIC_API_KEY;

export const businessStatus = () => api.get("/business/status");
export const getSubscriptionPlans = () => api.get(`/website/subscription-plan?key=${api_key}`);
export const websiteContactForm = (payload) => api.post("/website/contact-us", payload);
export const getIndividualCustomerEnquiry = (enquiryGuid) => api.get(`/enquiry?enquiryGuid=${enquiryGuid}`);
export const getQuotesByEnquiry = (enquiryGuid) => api.get(`/quote?enquiryGuid=${enquiryGuid}`)

// customerSide
export const fetchCustomerEnquiry = (payload) => api.post("/enquiry/filters", payload);
export const changeCustomerEnquiryStatus = (payload) => api.post("/enquiry/change-status", payload);
export const dashboardEnquiryStatus = () => api.get("/dashboard/enquiry-stats");
export const attachmentFromCustomer = (enquiryGuid) => api.get(`/enquiry/attachments?enquiryGuid=${enquiryGuid}`)
export const basicProfileDetails = () => api.get("/profile");

// Service Types
export const getServiceTypes = () => api.get(`/website/service-types?key=${api_key}`)
export const changeCustomerServiceStatus = (payload) => api.post("/enquiry/change-status", payload)

//subscription Orders
export const createSubscriptionOrder = (payload) => api.post("/subscription/create-order", payload);
export const updateSubscriptionOrder = (payload) => api.put("/subscription/update-order-status", payload);

//vendor enquiry filters
export const getAndSearchEnquiryFilters = (payload) => api.post("/vendor/enquiry/filters", payload);
export const getIndividualVendorEnquiry = (enquiryGuid) => api.get(`/vendor/enquiry?enquiryGuid=${enquiryGuid}`);
export const submitVendorQuoteForm = (payload) => api.post("/vendor/quote", payload, { headers: { 'Content-Type': 'multipart/form-data' } });
export const updateVendorQuoteForm = (payload) => api.put("/vendor/quote", payload, { headers: { 'Content-Type': 'multipart/form-data' } });
export const getVendorQuote = (enquiryGuid) => api.get(`/vendor/quote?enquiryGuid=${enquiryGuid}`);
export const getVendorProfileData = () => api.get("/vendor/profile");
export const attachmentForVendor = (enquiryGuid) => api.get(`/vendor/enquiry/attachments?enquiryGuid=${enquiryGuid}`)

//vendorBusiness
export const updateVendorProfileData = (payload) => api.put("/vendor/profile", payload);
export const getVendorBusiness = () => api.get("/business");
export const updateVendorBusiness = (payload) => api.put("/business", payload);
export const getBusinessAddress = () => api.get("/business/address");
export const updateBusinessAddress = (payload) => api.put("/business/address", payload);
export const getBusinessServices = () => api.get("/business/services");
export const setBusinessServices = (payload) => api.post("/business/services", payload);
export const deleteBusinessServices = (payload) => api.delete("/business/services", { data: payload });

//vendorLicence
export const getVendorLicences = () => api.get("/license");
export const uploadVendorLicense = (payload) => api.post("/license", payload, { headers: { 'Content-Type': 'multipart/form-data' } });
export const deleteVendorLicense = (licenseId) => api.delete(`/license?fileGuid=${licenseId}`);

//vendorSubscriptionStatus
export const vendorSubscriptionStatus = () => api.get("/subscription/active");