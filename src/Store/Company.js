import { writable, readable } from "svelte/store"

export const companyList = writable([])
export const addFeatures = writable(false)

export const user = writable(null)

export const asyncCheckAuthStatus = async () => {
  let profile = JSON.parse(window.localStorage.getItem("profile")).token
  if (profile) {
    user.update(() => true)
  } else {
    user.update(() => false)
  }
}

export const accessLevels = writable([])
export const allFeatures = writable([])
export const allFeaturesCategories = writable([])
export const allpackages = writable([])

export const allUsers = writable([])
export const allEmailTemplates = writable([])

export const sideBarTab = writable("companies")

export const singleCompanyEmails = writable([])
export const userAccessLevel = writable({})
export const showCustomRefund = writable(false)
export const allRefunds = writable([])
