module.exports = {
  getLocalStorage (itemKey) {
    try {
      return localStorage.getItem(itemKey)
    } catch (error) {
      console.log('getLocalStorage -> error', error)
    }
  },
  setLocalStorage (itemKey, value) {
    try {
      localStorage.setItem(itemKey, value)
    } catch (error) {
      console.log('setLocalStorage -> error', error)
    }
  }
}
