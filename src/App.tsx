import { PreviewPage } from './screens/PreviewPage'
import { Agentation } from 'agentation'

function App() {
  return (
    <>
      <PreviewPage />
      {import.meta.env.DEV && <Agentation />}
    </>
  )
}

export default App
