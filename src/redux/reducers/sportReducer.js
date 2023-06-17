// reducer to handle all of the actions for program part

import { produce } from 'immer'
import { GET_SPORT_ERROR, GET_SPORT_REQUEST, GET_SPORT_SUCCESS } from '../actions/actions'

export const initialSportState = {
   isFetching: true,
   programs: [],
}

export const sportComputer = {
   [GET_SPORT_REQUEST]: (state, data = undefined) =>
      produce(state, (draftState) => {
         draftState.isFetching = true
      }),
   [GET_SPORT_SUCCESS]: (state, { programs }) =>
      produce(state, (draftState) => {
         draftState.isFetching = false
         draftState.programs = programs
      }),
   [GET_SPORT_ERROR]: (state, err) =>
      produce(state, (draftState) => {
         draftState.isFetching = false
      }),
}
