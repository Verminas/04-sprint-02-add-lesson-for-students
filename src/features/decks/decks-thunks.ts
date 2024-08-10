import { Dispatch } from 'redux'
import { decksAPI, instance, UpdateDeckParams } from './decks-api.ts'
import { addDeckAC, deleteDeckAC, setDecksAC, updateDeckAC } from './decks-reducer.ts'
import { setAppStatusAC } from '../../app/app-reducer.ts'
import axios, { AxiosError } from 'axios'

export const fetchDecksTC = () => async (dispatch: Dispatch) => {
  try {
    dispatch(setAppStatusAC('loading'))
    const res = await decksAPI.fetchDecks()
    dispatch(setDecksAC(res.data.items))
    dispatch(setAppStatusAC('succeeded'))
  } catch (e) {
    const message = getErrorMessage(e)
    console.log(message)
    dispatch(setAppStatusAC('failed', message))
  }
}


// errors : 1. error from server; 2. network error; 3. sync error in code
export const addDeckTC = (name: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(setAppStatusAC('loading'))
    const res = await decksAPI.addDeck(name);
    dispatch(addDeckAC(res.data))
  } catch (e) {
    const message = getErrorMessage(e)
    console.log(message)
    dispatch(setAppStatusAC('failed', message))
  }
}

export const deleteDeckTC = (id: string) => async (dispatch: Dispatch) => {
  try{
    dispatch(setAppStatusAC('loading'))
    const res = await decksAPI.deleteDeck(id)
    dispatch(deleteDeckAC(res.data.id))
    dispatch(setAppStatusAC('succeeded'))
  } catch (e) {
    const message = getErrorMessage(e)
    console.log(message)
    dispatch(setAppStatusAC('failed', message))
  }
}

export const updateDeckTC = (params: UpdateDeckParams) => async (dispatch: Dispatch) => {
  try {
    dispatch(setAppStatusAC('loading'))
    const res = await decksAPI.updateDeck(params)
    dispatch(updateDeckAC(res.data))
    dispatch(setAppStatusAC('succeeded'))
  } catch (e) {
    const message = getErrorMessage(e)
    console.log(message)
    dispatch(setAppStatusAC('failed', message))
  }
}

const getErrorMessage = (e: unknown) => {
  let message: string = 'Something went wrong :(';
  if(axios.isAxiosError(e) && e.response) {
    message = e.response.data.errorMessages[0].message
  } else if(axios.isAxiosError(e) && e.code === 'ERR_NETWORK') {
    message = e.message
  } else if(e instanceof Error) {
    message = e.message
  }

  return message;
}