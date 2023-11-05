import Axios from '../axios'
const PREFIX = 'program'

const formatSuffix = (suffix) => `${PREFIX}/${suffix}`

class ProgramAPI {
   static getNewSportProgram(data) {
      return Axios.post(formatSuffix('newSportProgram'), data)
   }
}

export default ProgramAPI
