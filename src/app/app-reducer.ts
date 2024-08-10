export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
  status: 'idle' as RequestStatusType,
  error: null as string | null,
}

type AppStateType = typeof initialState

export const appReducer = (state: AppStateType = initialState, action: ActionsType): AppStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS': {
      const {status, error} = action.payload
      return {...state, status, error}
    }
    default:
      return state
  }
}

export const setAppStatusAC = (status: RequestStatusType, error: null | string = null) => ({
  type: 'APP/SET-STATUS',
  payload: {
    status,
    error
  }
}) as const



type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>

type ActionsType = SetAppStatusActionType
