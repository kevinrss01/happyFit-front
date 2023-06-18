import {
  GENERATE_PROGRAM_ERROR,
  GENERATE_PROGRAM_REQUEST,
  GENERATE_PROGRAM_SUCCESS,
} from './actions'

const generateProgramRequest = () => ({ type: GENERATE_PROGRAM_REQUEST })
const generateProgramSuccess = (data) => ({
  type: GENERATE_PROGRAM_SUCCESS,
  payload: data,
})
const generateProgramError = (err) => ({
  type: GENERATE_PROGRAM_ERROR,
  payload: err,
})

export const generateProgram = (info) => async (dispatch) => {
  //dispatch generateProgramRequest()
  //endpoint call with axios stored in a variable
  // variable value dispatched in generateProgramSuccess
  //catch error and dispatch it in generateProgramError
}
