import { AppDispatch } from '../../app/store.ts'
import { isAxiosError } from 'axios'
import { setAppErrorAC, setAppStatusAC } from '../../app/app-reducer.ts'

export const handleError = (e: unknown, dispatch: AppDispatch) => {
  let message: string = 'Something went wrong :('

  // my variant
  // if (axios.isAxiosError(e) && e.response) {
  //   message = e.response.data.errorMessages[0].message
  // } else if (axios.isAxiosError(e) && e.code === 'ERR_NETWORK') {
  //   message = e.message
  // } else if (e instanceof Error) {
  //   message = e.message
  // }

  // variant from answers
  if(isAxiosError<ServerError>(e)) {
    message = e.response ? e.response.data.errorMessages[0].message : e.message;
  } else {
    message = (e as Error).message
  }

  console.log(message)
  dispatch(setAppStatusAC('failed'))
  dispatch(setAppErrorAC(message))
}

type ServerError = {
  errorMessages: {field: string; message: string}[]
}