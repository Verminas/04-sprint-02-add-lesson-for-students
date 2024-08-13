import { AppRootState } from './store.ts'

export const appStatusSelector = (state: AppRootState) => state.app.status

export const appErrorSelector = (state: AppRootState) => state.app.error