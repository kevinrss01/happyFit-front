import Axios from './axios'

const PREFIX = 'users'
const formatSuffix = (suffix) => `${PREFIX}/${suffix}`

class UserAPI {
   static async getUserInfo(userId) {
      return Axios.get(formatSuffix(`userInfo/${userId}`))
   }

   static async updatePersonalUserInfo(userData, userId) {
      return Axios.patch(formatSuffix(`updateUserInfo/${userId}`), userData)
   }

   static async updateUserEmail(newEmail, userId) {
      const endpoint = formatSuffix(`updateEmail/${userId}`)
      return Axios.patch(endpoint, newEmail)
   }
}

export default UserAPI
