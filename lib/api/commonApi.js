import api from './index'

export const businessStatus = () => api.get("/business/status")