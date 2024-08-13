import './App.css'
import { Decks } from '../features/decks/Decks.tsx'
import { GlobalError } from './GlobalError/GlobalError.tsx'
import { LinearLoader } from '../common/components/Loader/LinearLoader.tsx'
import { useAppSelector } from './store.ts'
import { appStatusSelector } from './app-selectors.ts'

export const App = () => {
  const appStatus = useAppSelector(appStatusSelector)

  return (
    <div>
      {appStatus === 'loading' && <LinearLoader/>}
      <Decks />
      <GlobalError />
    </div>
  )
}
