import { writable, derived } from "svelte/store"

const TIMEOUT = 3000

function createNotificationStore(timeout) {
  const _notifications = writable([])

  function send(message, type = "default", timeout, icon) {
    _notifications.update((state) => {
      return [...state, { id: id(), type, message, timeout, icon }]
    })
  }

  let timers = []

  const notifications = derived(_notifications, ($_notifications, set) => {
    set($_notifications)
    if ($_notifications.length > 0) {
      const timer = setTimeout(() => {
        _notifications.update((state) => {
          state.shift()
          return state
        })
      }, $_notifications[0].timeout)
      return () => {
        clearTimeout(timer)
      }
    }
  })
  const { subscribe } = notifications

  return {
    subscribe,
    send,
    default: (msg, timeout) => send(msg, "default", timeout),
    danger: (msg, timeout) => send(msg, "danger", timeout, "dashicons:warning"),
    warning: (msg, timeout) => send(msg, "warning", timeout),
    info: (msg, timeout) => send(msg, "info", timeout, "dashicons:warning"),
    success: (msg, timeout) =>
      send(msg, "success", timeout, "clarity:success-standard-solid"),
  }
}

function id() {
  return "_" + Math.random().toString(36).substr(2, 9)
}

export const notifications = createNotificationStore()
