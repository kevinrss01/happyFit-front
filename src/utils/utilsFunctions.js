/**
 * Calculate the age based on the birthdate.
 * @param {string} birthdate - The birthdate in "YYYY-MM-DD" format.
 * @returns {number} The age.
 */
export const calculateAge = (birthdate) => {
   const today = new Date()
   const birthDate = new Date(birthdate)
   let age = today.getFullYear() - birthDate.getFullYear()
   const monthDifference = today.getMonth() - birthDate.getMonth()

   // Adjust the age based on the month and day.
   if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--
   }

   return age
}
