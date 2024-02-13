import { writable, readable } from "svelte/store"

export const showCalculator = writable(false)
export const showTesting = writable(false)
export const showCoupons = writable(false)
export const allPackages = writable([])
export const allFeatures = writable([])
export const allTestEmails = writable([])
