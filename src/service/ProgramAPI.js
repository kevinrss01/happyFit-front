import Axios from './axios'

const PREFIX = 'program'
const formatSuffix = (suffix) => `${PREFIX}/${suffix}`

class ProgramAPI {
  static async findSportProgram() {
    return await Axios.get(formatSuffix('sport'))
  }
}

export default ProgramAPI
