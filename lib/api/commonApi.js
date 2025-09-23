import api from './index'

const api_key = process.env.NEXT_PUBLIC_API_KEY;

export const businessStatus = () => api.get("/business/status");
export const getSubscriptionPlans = () => api.get(`/website/subscription-plan?key=${api_key}`);
export const websiteContactForm = (payload) => api.post("/website/contact-us", payload)

// customerSide
export const fetchCustomerEnquiry = (payload) => api.post("/enquiry/filters", payload);
export const changeCustomerEnquiryStatus = (payload) => api.post("/enquiry/change-status", payload);
export const dashboardEnquiryStatus = () => api.get("/dashboard/enquiry-stats");
export const attachmentFromCustomer = (enquiryGuid) => api.get(`/enquiry/attachments?enquiryGuid=${enquiryGuid}`)

// Service Types
export const getServiceTypes = () => api.get(`/website/service-types?key=${api_key}`)
export const changeCustomerServiceStatus = (payload) => api.post("/enquiry/change-status", payload)

//subscription Orders
export const createSubscriptionOrder = (payload) => api.post("/subscription/create-order", payload);
export const updateSubscriptionOrder = (payload) => api.put("/subscription/update-order-status", payload);

//vendor enquiry filters
export const getAndSearchEnquiryFilters = (payload) => api.post("/vendor/enquiry/filters", payload);
export const getIndividualVendorEnquiry = (enquiryGuid) => api.get(`/vendor/enquiry?enquiryGuid=${enquiryGuid}`);
export const submitVendorQuoteForm = (payload) => api.post("/vendor/quote", payload);
export const getVendorQuote = (enquiryGuid) => api.get(`/vendor/quote?enquiryGuid=${enquiryGuid}`);