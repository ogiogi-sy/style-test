import { PhoneFrame } from './shared/PhoneFrame'
import { YourTeamScreen } from './YourTeamScreen'
import { WhosInvolvedScreen } from './WhosInvolvedScreen'
import { WelcomeSarahScreen } from './WelcomeSarahScreen'
import { BusinessActivityScreen } from './BusinessActivityScreen'
import { PaymentsScreen } from './PaymentsScreen'
import { YourAccountScreen } from './YourAccountScreen'
import { WelcomeScreen } from './WelcomeScreen'
import { PaymentsHubScreen } from './PaymentsHubScreen'
import { PaymentDetailsScreen } from './PaymentDetailsScreen'
import { PaymentConfirmedScreen } from './PaymentConfirmedScreen'
import { PayeeDetailsScreen } from './PayeeDetailsScreen'
import { PaymentFormScreen } from './PaymentFormScreen'
import { ConfirmIdentityScreen } from './ConfirmIdentityScreen'

export function PreviewPage() {
  return (
    <div className="min-h-screen bg-metro-slate-100 p-metro-2xl font-metro-body">
      <header className="mb-metro-2xl">
        <h1 className="text-metro-3xl font-metro-display font-light text-metro-foreground">
          Mobile Banking Screens
        </h1>
        <p className="text-metro-lg text-metro-foreground-muted">
          13 fintech screens built with Metro design tokens and Base UI components
        </p>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-metro-xl justify-items-center">
        <PhoneFrame label="Welcome">
          <WelcomeScreen />
        </PhoneFrame>
        <PhoneFrame label="Your Team">
          <YourTeamScreen />
        </PhoneFrame>
        <PhoneFrame label="Who's Involved?">
          <WhosInvolvedScreen />
        </PhoneFrame>
        <PhoneFrame label="Welcome Sarah">
          <WelcomeSarahScreen />
        </PhoneFrame>
        <PhoneFrame label="Business Activity">
          <BusinessActivityScreen />
        </PhoneFrame>
        <PhoneFrame label="Payments">
          <PaymentsScreen />
        </PhoneFrame>
        <PhoneFrame label="Your Account">
          <YourAccountScreen />
        </PhoneFrame>
        <PhoneFrame label="Payments Hub">
          <PaymentsHubScreen />
        </PhoneFrame>
        <PhoneFrame label="Amount, reference, date">
          <PaymentFormScreen />
        </PhoneFrame>
        <PhoneFrame label="Payment Details">
          <PaymentDetailsScreen />
        </PhoneFrame>
        <PhoneFrame label="Payee Details">
          <PayeeDetailsScreen />
        </PhoneFrame>
        <PhoneFrame label="Biometric or 6-digit PIN">
          <ConfirmIdentityScreen />
        </PhoneFrame>
        <PhoneFrame label="Payment Confirmed">
          <PaymentConfirmedScreen />
        </PhoneFrame>
      </div>
    </div>
  )
}
