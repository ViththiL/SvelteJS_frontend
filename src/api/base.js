import axios from "axios"

let server = "https://api.romeohr.com/admin/v1"
//let server = "http://localhost:3500/admin/v1"
let token = JSON.parse(window.localStorage.getItem("profile")) ? JSON.parse(window.localStorage.getItem("profile")).token : ""

const API = axios.create({
  baseURL: server,
})
API.defaults.headers.common["Authorization"] = `Bearer ${token}`
API.defaults.headers.common["backendsecret"] = "$#1q2w3e4r"

export const setToken = token => {
  API.defaults.headers.common["Authorization"] = `Bearer ${token}`
}

API.interceptors.response.use(
  response => {
    return response
  },
  error => {
    const originalRequest = error.config
    if (
      error.response.status === 401 &&
      (originalRequest.url === "https://admin.romeohr.com/v1/#/login" || originalRequest.url === "https://admin.romeohr.com/v1/")
    ) {
      window.location.href = "/"
      return Promise.reject(error)
    }
    // if (error.response.status === 401 && !originalRequest._retry) {
    //     const refreshToken = JSON.parse(window.localStorage.getItem("profile")).refreshToken
    //     console.log("refreshToken", refreshToken)
    //     const resRefresh = await API.get(window.location.protocol + "//" + window.location.hostname + ":3500/v1/refresh-token", {
    //         refreshToken: refreshToken,
    //     })
    //     console.log("resRefresh", resRefresh)
    //     if (resRefresh.status === 201) {
    //         let obj = JSON.parse(window.localStorage.getItem("profile"))
    //         window.localStorage.setItem("profile", JSON.stringify({...obj, ...res.data }))
    //         API.defaults.headers.common["Authorization"] = "Bearer " + res.data.token
    //         originalRequest.headers["Authorization"] = "Bearer " + res.data.token
    //         return axios(originalRequest)
    //     } else {
    //         window.location.href = "/"
    //     }
    // }
    return Promise.reject(error)
  }
)

export const login = formData => API.post("/sap/login", formData)
export const getEmailVerify = id => API.get(`/email-verified/${id}`)
export const updateEmailVerify = (id, formData) => API.put(`/sap/email-verified/${id}`, formData)
export const getAllCompaines = () => API.get("/company")

export const getFeaturesCategories = () => API.get("/sap/config/features/categories")

export const getAllFeatures = () => API.get("/sap/config/features")
export const setFeatures = formData => API.post("/sap/config/features", formData)
export const updateFeatures = (id, formData) => API.put(`/sap/config/features/${id}`, formData)
export const deleteFeatures = id => API.delete(`/sap/config/features/${id}`)
export const getAllPackeges = () => API.get("/sap/config/packages")
export const setPackages = formData => API.post(`/sap/config/packages`, formData)
export const updatePackages = (id, formData) => API.put(`/sap/config/packages/${id}`, formData)
export const deletePackages = id => API.delete(`/sap/config/packages/${id}`)
export const getCompanyInfoById = id => API.get(`/${id}/company`)
export const getCompanyFeatuesById = id => API.get(`sap/company/features/${id}`)
export const updateCompantFeatures = (id, formData) => API.put(`sap/company/features/${id}`, formData)
export const getCompanyEmployees = id => API.get(`/${id}/employees`)
export const customerRepayment = formData => API.post(`/package-refund`, formData)
export const getCustomSupport = id => API.get(`sap/customer-support/${id}`)
export const getCustomSupportSubjects = id => API.get(`sap/${id}/customer-support-subjects`)
export const setCustomerSupport = formData => API.post("sap/customer-support", formData)

export const getAccessLevels = () => API.get("settings/sap/access-levels")
export const getAccessLevelsById = id => API.get(`/settings/sap/access-levels/${id}`)

export const getUsers = () => API.get("/settings/sap/employees")
export const setUser = formData => API.post(`/settings/sap/employees`, formData)
export const updateUser = (id, formData) => API.put(`/settings/sap/employees/${id}`, formData)

export const setEmailTemplates = formData => API.post(`/sap/settings/email-template`, formData)
export const getEmailTemplates = () => API.get(`/sap/settings/email-template`)
export const updateEmailTemplates = (id, formData) => API.put(`/sap/settings/email-template/${id}`, formData)
export const deleteEmailTemplates = id => API.delete(`/sap/settings/email-template/${id}`)

export const setEmailCompany = formData => API.post("sap/company/email", formData)
export const getEmailCompany = id => API.get(`/sap/companies/emails/${id}`)

export const addAddonCompany = formData => {
  API.post("package/add-addons", formData)
}

export const setTestEmail = formData => API.post("/sap/test", formData)
export const getTestEmail = () => API.get("/sap/test")
export const updateTestEmail = (id, formData) => API.put(`/sap/test/${id}`, formData)
export const deleteTestEmail = id => API.delete(`/sap/test/${id}`)

export const setCompanyCustomRefund = formData => API.post("/custom-refund", formData)
export const getCompanyCustomRefund = id => API.get(`/custom-refund/${id}`)
export const getSingleCompanyCustomRefundLimit = id => API.get(`/custom-refund-limit/${id}`)
export const getEmailCount = id => API.get(`/sap-company-email-count/${id}`)

export const sendCoupon = formData => API.post("/sap/coupons-send", formData)
