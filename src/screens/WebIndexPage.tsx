const webScreens = [
  { name: 'Portfolio Overview Dashboard', path: '#/web/dashboard', description: 'Enterprise banking dashboard with sidebar, stat cards, and customer table' },
  { name: 'Welcome', path: '#/web/welcome', description: 'Welcome landing screen' },
  { name: 'Welcome Sarah', path: '#/web/welcome-sarah', description: 'Personalised onboarding welcome screen' },
  { name: 'Connect Your Bank', path: '#/web/connect-bank', description: 'Open Banking connection screen with 3D card illustration' },
  { name: 'Business Lending', path: '#/web/business-lending', description: 'Personalised loan offer landing page with indicative quote' },
  { name: 'Onboarding Stepper', path: '#/web/onboarding-stepper', description: 'Onboarding progress stepper with card selection and account setup steps' },
  { name: 'Connect Your Bank (V2)', path: '#/web/connect-bank-v2', description: 'Open Banking connection screen with photo illustration' },
  { name: 'Loan Purpose', path: '#/web/purpose', description: 'Business lending wizard — select loan purpose and connect Open Banking' },
]

export function WebIndexPage() {
  return (
    <div className="min-h-screen bg-metro-slate-100 p-metro-2xl font-metro-body">
      <header className="mb-metro-2xl flex items-end justify-between">
        <div>
          <h1 className="text-metro-3xl font-metro-display font-light text-metro-foreground">
            Web Screens
          </h1>
          <p className="text-metro-lg text-metro-foreground-muted">
            Desktop-optimised screens using the Metro design system
          </p>
        </div>
        <a
          href="#/"
          className="text-metro-sm font-medium text-metro-primary hover:text-metro-primary-hover transition-colors"
        >
          &larr; View Mobile Screens
        </a>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-metro-lg">
        {webScreens.map((screen) => (
          <a
            key={screen.path}
            href={screen.path}
            className="bg-metro-surface border border-metro-border rounded-metro-card p-metro-xl flex flex-col gap-metro-sm hover:border-metro-primary transition-colors no-underline"
          >
            <h2 className="text-metro-lg font-metro-display font-light text-metro-foreground">{screen.name}</h2>
            <p className="text-metro-sm text-metro-foreground-muted">{screen.description}</p>
            <span className="text-metro-sm font-medium text-metro-primary mt-metro-sm">Open screen &rarr;</span>
          </a>
        ))}
      </div>
    </div>
  )
}
