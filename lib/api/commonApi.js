import api from './index'

const api_key = process.env.NEXT_PUBLIC_API_KEY;

export const businessStatus = () => api.get("/business/status");
export const getSubscriptionPlans = () => api.get(`/website/subscription-plan?key=${api_key}`);

// Service Types
export const getServiceTypes = () => api.get(`/website/service-types?key=${api_key}`)
export const changeCustomerServiceStatus = (payload) => api.post("/enquiry/change-status", payload)

//subscription Orders
export const createSubscriptionOrder = (payload) => api.post("/subscription/create-order", payload);
export const updateSubscriptionOrder = (payload) => api.put("/subscription/update-order-status", payload);