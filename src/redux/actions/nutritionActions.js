import { GET_NUTRITION_ERROR, GET_NUTRITION_REQUEST, GET_NUTRITION_SUCCESS } from './actions'

const getNutritionRequest = () => ({ type: GET_NUTRITION_REQUEST })
const getNutritionSuccess = (data) => ({
  type: GET_NUTRITION_SUCCESS,
  payload: data,
})
const getNutritionError = (err) => ({
  type: GET_NUTRITION_ERROR,
  payload: err,
})

export const getNutrition = (data) => async (dispatch) => {
  //dispatch getNutritionRequest()
  // dispatch(getNutritionRequest());
  dispatch(getNutritionSuccess(data))
  try {
    //endpoint call with axios stored in a variable
    // variable value dispatched in getNutritionSuccess
  } catch (err) {
    //catch error and dispatch it in getNutritionError
  }
}
