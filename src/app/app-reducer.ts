export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
  status: 'idle' as RequestStatusType,
  error: null as string | null,
}

type AppStateType = typeof initialState

export const appReducer = (state: AppStateType = initialState, action: ActionsType): AppStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS': {
      const {status} = action.payload
      return {...state, status}
    }

    case 'APP/SET-ERROR': {
      const {error} = action.payload
      return {...state, error}
    }

    default:
      return state
  }
}

export const setAppStatusAC = (status: RequestStatusType) => ({
  type: 'APP/SET-STATUS',
  payload: {
    status
  }
}) as const

export const setAppErrorAC = (error: string | null) => ({
  type: 'APP/SET-ERROR',
  payload: {
    error
  }
}) as const



type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>

type ActionsType = SetAppStatusActionType | SetAppErrorActionType
