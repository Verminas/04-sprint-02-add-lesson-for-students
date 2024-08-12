import { Dispatch } from 'redux'
import { decksAPI, instance, UpdateDeckParams } from './decks-api.ts'
import { addDeckAC, deleteDeckAC, setDecksAC, updateDeckAC } from './decks-reducer.ts'
import { setAppStatusAC } from '../../app/app-reducer.ts'
import axios, { AxiosError } from 'axios'
import { AppDispatch } from '../../app/store.ts'

export const fetchDecksTC = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setAppStatusAC('loading'))
    const res = await decksAPI.fetchDecks()
    dispatch(setDecksAC(res.data.items))
    dispatch(setAppStatusAC('succeeded'))
  } catch (e) {
    setErrorMessage(e, dispatch)
  }
}


// errors : 1. error from server; 2. network error; 3. sync error in code
export const addDeckTC = (name: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setAppStatusAC('loading'))
    const res = await decksAPI.addDeck(name)
    dispatch(addDeckAC(res.data))
  } catch (e) {
    setErrorMessage(e, dispatch)
  }
}

export const deleteDeckTC = (id: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setAppStatusAC('loading'))
    const res = await decksAPI.deleteDeck(id)
    dispatch(deleteDeckAC(res.data.id))
    dispatch(setAppStatusAC('succeeded'))
  } catch (e) {
    setErrorMessage(e, dispatch)
  }
}

export const updateDeckTC = (params: UpdateDeckParams) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setAppStatusAC('loading'))
    const res = await decksAPI.updateDeck(params)
    dispatch(updateDeckAC(res.data))
    dispatch(setAppStatusAC('succeeded'))
  } catch (e) {
    setErrorMessage(e, dispatch)
  }
}

const setErrorMessage = (e: unknown, dispatch: AppDispatch) => {
  let message: string = 'Something went wrong :('
  if (axios.isAxiosError(e) && e.response) {
    message = e.response.data.errorMessages[0].message
  } else if (axios.isAxiosError(e) && e.code === 'ERR_NETWORK') {
    message = e.message
  } else if (e instanceof Error) {
    message = e.message
  }

  console.log(message)
  dispatch(setAppStatusAC('failed', message))
}