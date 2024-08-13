import { Dispatch } from 'redux'
import { decksAPI, instance, UpdateDeckParams } from './decks-api.ts'
import { addDeckAC, deleteDeckAC, setDecksAC, updateDeckAC } from './decks-reducer.ts'
import { setAppErrorAC, setAppStatusAC } from '../../app/app-reducer.ts'
import axios, { AxiosError, isAxiosError } from 'axios'
import { AppDispatch } from '../../app/store.ts'
import { handleError } from '../../common/utils/handle-error.ts'

export const fetchDecksTC = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setAppStatusAC('loading'))
    const res = await decksAPI.fetchDecks()
    dispatch(setDecksAC(res.data.items))
    dispatch(setAppStatusAC('succeeded'))
  } catch (e) {
    handleError(e, dispatch)
  }
}


// errors : 1. error from server; 2. network error; 3. sync error in code
export const addDeckTC = (name: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setAppStatusAC('loading'))
    const res = await decksAPI.addDeck(name)
    dispatch(addDeckAC(res.data))
  } catch (e) {
    handleError(e, dispatch)
  }
}

export const deleteDeckTC = (id: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setAppStatusAC('loading'))
    const res = await decksAPI.deleteDeck(id)
    dispatch(deleteDeckAC(res.data.id))
    dispatch(setAppStatusAC('succeeded'))
  } catch (e) {
    handleError(e, dispatch)
  }
}

export const updateDeckTC = (params: UpdateDeckParams) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setAppStatusAC('loading'))
    const res = await decksAPI.updateDeck(params)
    dispatch(updateDeckAC(res.data))
    dispatch(setAppStatusAC('succeeded'))
  } catch (e) {
    handleError(e, dispatch)
  }
}

