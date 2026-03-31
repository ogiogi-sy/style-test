import { useState, useEffect } from 'react'
import { PreviewPage } from './screens/PreviewPage'
import { WebIndexPage } from './screens/WebIndexPage'
import { WebDashboardScreen } from './screens/web/WebDashboardScreen'
import { WebWelcomeScreen } from './screens/web/WebWelcomeScreen'
import { WebWelcomeSarahScreen } from './screens/web/WebWelcomeSarahScreen'
import { WebConnectBankScreen } from './screens/web/WebConnectBankScreen'
import { WebBusinessLendingScreen } from './screens/web/WebBusinessLendingScreen'
import { WebOnboardingStepperScreen } from './screens/web/WebOnboardingStepperScreen'
import { WebPurposeScreen } from './screens/web/WebPurposeScreen'
import { WebConnectBankV2Screen } from './screens/web/WebConnectBankV2Screen'
import { Agentation } from 'agentation'

function useHashRoute() {
  const [hash, setHash] = useState(window.location.hash)
  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])
  return hash
}

const webScreens: Record<string, React.ComponentType> = {
  '#/web/dashboard': WebDashboardScreen,
  '#/web/welcome': WebWelcomeScreen,
  '#/web/welcome-sarah': WebWelcomeSarahScreen,
  '#/web/connect-bank': WebConnectBankScreen,
  '#/web/business-lending': WebBusinessLendingScreen,
  '#/web/onboarding-stepper': WebOnboardingStepperScreen,
  '#/web/purpose': WebPurposeScreen,
  '#/web/connect-bank-v2': WebConnectBankV2Screen,
}

function App() {
  const hash = useHashRoute()

  const WebScreen = webScreens[hash]
  if (WebScreen) {
    return (
      <>
        <div className="h-screen">
          <WebScreen />
        </div>
        {import.meta.env.DEV && <Agentation />}
      </>
    )
  }

  if (hash === '#/web') {
    return (
      <>
        <WebIndexPage />
        {import.meta.env.DEV && <Agentation />}
      </>
    )
  }

  return (
    <>
      <PreviewPage />
      {import.meta.env.DEV && <Agentation />}
    </>
  )
}

export default App
