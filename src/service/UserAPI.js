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
      const endpoint = formatSuffix(`updateUserEmail/${userId}`)
      return Axios.patch(endpoint, newEmail)
   }

   static async updatePasswordByMail(email) {
      return Axios.patch(formatSuffix(`updateUserPasswordWithMail`), { email: email })
   }

   static async updatePassword(newPassword, userId) {
      return Axios.patch(formatSuffix(`updateUserPassword/${userId}`), { newPassword: newPassword })
   }

   static async createArticleData(formData) {
      return Axios.post(formatSuffix(`createArticle`), formData)

   static getAllArticles() {
      return Axios.get(formatSuffix('getAllArticles'))
   }
}

export default UserAPI
