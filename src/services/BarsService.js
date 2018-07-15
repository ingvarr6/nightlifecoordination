import Api from '@/services/Api'
export default {
  getBars (location) {
    return Api().post('getBars', location)
  },
  goingBar (barId) {
    return Api().post('goingBar', barId)
  }
}
