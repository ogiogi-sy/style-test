const sampleHeading = 'Built for Business'
const sampleBody =
  'Metro Bank is built for the way modern businesses actually work. Fast, flexible, and always on — so you can focus on what matters most.'

interface StyleRowProps {
  name: string
  className: string
  specs: string
  weights: { label: string; weight: string }[]
  sample?: string
}

function StyleRow({ name, className, specs, weights, sample = sampleHeading }: StyleRowProps) {
  return (
    <div className="border-b border-metro-border py-8">
      <div className="flex items-baseline justify-between mb-3">
        <span className="typo-caption font-semibold text-metro-foreground-muted uppercase tracking-wider">
          {name}
        </span>
        <span className="typo-caption text-metro-foreground-muted">{specs}</span>
      </div>
      <div className="space-y-3">
        {weights.map((w) => (
          <div key={w.label} className="flex items-baseline gap-6">
            <span className="typo-caption text-metro-foreground-muted w-20 shrink-0 text-right">
              {w.label}
            </span>
            <span className={`${className} ${w.weight} text-metro-foreground`}>{sample}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function PatternExample({
  name,
  description,
  code,
  preview,
}: {
  name: string
  description: string
  code: string
  preview: React.ReactNode
}) {
  return (
    <div className="border border-metro-border rounded-metro-card overflow-hidden">
      <div className="p-5 border-b border-metro-border">
        <span className="typo-caption font-semibold text-metro-foreground-muted uppercase tracking-wider">
          {name}
        </span>
        <p className="typo-body-sm text-metro-foreground-muted mt-1">{description}</p>
      </div>
      <div className="p-5 bg-metro-surface">{preview}</div>
      <div className="p-4 bg-metro-surface-element">
        <code className="typo-caption text-metro-foreground">{code}</code>
      </div>
    </div>
  )
}

const styles = {
  display: [
    {
      name: 'Display',
      className: 'typo-display',
      specs: '64px → 40px / line-height 1.1 / tracking -3% / FT Polar',
      weights: [{ label: 'Light', weight: 'font-light' }],
    },
    {
      name: 'Title Screen LG',
      className: 'typo-title-screen-lg',
      specs: '48px → 32px / line-height 1.1 / tracking -3% / FT Polar',
      weights: [{ label: 'Light', weight: 'font-light' }],
    },
  ],
  title: [
    {
      name: 'Title Screen',
      className: 'typo-title-screen',
      specs: '32px → 28px / line-height 36px / tracking -3% / FT Polar',
      weights: [{ label: 'Regular', weight: 'font-normal' }],
    },
    {
      name: 'Title Section',
      className: 'typo-title-section',
      specs: '24px / line-height 28px / tracking -1.5% / FT Polar',
      weights: [
        { label: 'Regular', weight: 'font-normal' },
        { label: 'SemiBold', weight: 'font-semibold' },
      ],
    },
    {
      name: 'Title Subsection',
      className: 'typo-title-subsection',
      specs: '20px / line-height 24px / tracking -1% / FT Polar',
      weights: [
        { label: 'Regular', weight: 'font-normal' },
        { label: 'SemiBold', weight: 'font-semibold' },
      ],
    },
  ],
  body: [
    {
      name: 'Body Large',
      className: 'typo-body-lg',
      specs: '18px / line-height 24px / tracking 1% / Inter',
      weights: [
        { label: 'Regular', weight: 'font-normal' },
        { label: 'SemiBold', weight: 'font-semibold' },
      ],
      sample: sampleBody,
    },
    {
      name: 'Body',
      className: 'typo-body',
      specs: '16px / line-height 24px / tracking 1% / Inter',
      weights: [
        { label: 'Regular', weight: 'font-normal' },
        { label: 'SemiBold', weight: 'font-semibold' },
      ],
      sample: sampleBody,
    },
    {
      name: 'Body Small',
      className: 'typo-body-sm',
      specs: '14px / line-height 20px / tracking 1.5% / Inter',
      weights: [
        { label: 'Regular', weight: 'font-normal' },
        { label: 'SemiBold', weight: 'font-semibold' },
      ],
      sample: sampleBody,
    },
  ],
  caption: [
    {
      name: 'Caption',
      className: 'typo-caption',
      specs: '12px / line-height 16px / tracking 2% / Inter',
      weights: [
        { label: 'Regular', weight: 'font-normal' },
        { label: 'SemiBold', weight: 'font-semibold' },
      ],
      sample: 'Last updated 2 minutes ago',
    },
  ],
}

export function TypographyScreen() {
  return (
    <div className="min-h-screen bg-metro-surface">
      <div className="max-w-4xl mx-auto px-8 py-16">
        {/* Header */}
        <div className="mb-16">
          <span className="typo-caption font-semibold text-metro-foreground-muted uppercase tracking-wider block mb-3">
            Design System
          </span>
          <h1 className="typo-display font-light text-metro-foreground">Typography</h1>
          <p className="typo-body-lg text-metro-foreground-muted mt-4 max-w-2xl">
            Two fonts. Three weights. Nine styles. FT Polar for display and titles, Inter for body
            text and UI elements. Light, Regular, and SemiBold — nothing more.
          </p>
        </div>

        {/* Font families */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
          <div className="bg-metro-surface-element rounded-metro-card p-6">
            <span className="typo-caption font-semibold text-metro-foreground-muted uppercase tracking-wider block mb-3">
              Display Font
            </span>
            <span className="font-metro-display text-[2.5rem] font-light text-metro-foreground leading-tight block">
              FT Polar
            </span>
            <div className="mt-4 flex gap-6">
              <span className="typo-body-sm font-metro-display font-light text-metro-foreground-muted">
                Light 300
              </span>
              <span className="typo-body-sm font-metro-display font-normal text-metro-foreground-muted">
                Regular 400
              </span>
              <span className="typo-body-sm font-metro-display font-semibold text-metro-foreground-muted">
                SemiBold 600
              </span>
            </div>
          </div>
          <div className="bg-metro-surface-element rounded-metro-card p-6">
            <span className="typo-caption font-semibold text-metro-foreground-muted uppercase tracking-wider block mb-3">
              Body Font
            </span>
            <span className="font-metro-body text-[2.5rem] font-normal text-metro-foreground leading-tight block">
              Inter
            </span>
            <div className="mt-4 flex gap-6">
              <span className="typo-body-sm font-light text-metro-foreground-muted">
                Light 300
              </span>
              <span className="typo-body-sm font-normal text-metro-foreground-muted">
                Regular 400
              </span>
              <span className="typo-body-sm font-semibold text-metro-foreground-muted">
                SemiBold 600
              </span>
            </div>
          </div>
        </div>

        {/* Type scale */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-2">
            <h2 className="typo-title-section font-semibold text-metro-foreground">Type Scale</h2>
            <span className="typo-caption text-metro-foreground-muted">9 styles total</span>
          </div>
          <p className="typo-body-sm text-metro-foreground-muted mb-8">
            Resize your browser to see fluid styles scale between mobile (375px) and desktop
            (1440px).
          </p>

          {/* Display */}
          <div className="mb-2">
            <h3 className="typo-caption font-semibold text-metro-primary uppercase tracking-wider mb-0">
              Display
            </h3>
            <p className="typo-caption text-metro-foreground-muted">
              Hero headings and marketing moments. FT Polar Light only. Fluid scaling.
            </p>
          </div>
          {styles.display.map((s) => (
            <StyleRow key={s.name} {...s} />
          ))}

          {/* Title */}
          <div className="mb-2 mt-10">
            <h3 className="typo-caption font-semibold text-metro-primary uppercase tracking-wider mb-0">
              Title
            </h3>
            <p className="typo-caption text-metro-foreground-muted">
              Screen headings, section headings, subsections. FT Polar.
            </p>
          </div>
          {styles.title.map((s) => (
            <StyleRow key={s.name} {...s} />
          ))}

          {/* Body */}
          <div className="mb-2 mt-10">
            <h3 className="typo-caption font-semibold text-metro-primary uppercase tracking-wider mb-0">
              Body
            </h3>
            <p className="typo-caption text-metro-foreground-muted">
              Paragraphs, descriptions, buttons, and general content. Inter.
            </p>
          </div>
          {styles.body.map((s) => (
            <StyleRow key={s.name} {...s} sample={s.sample} />
          ))}

          {/* Caption */}
          <div className="mb-2 mt-10">
            <h3 className="typo-caption font-semibold text-metro-primary uppercase tracking-wider mb-0">
              Caption
            </h3>
            <p className="typo-caption text-metro-foreground-muted">
              Smallest text. Regular for informational, SemiBold for labels and overlines.
            </p>
          </div>
          {styles.caption.map((s) => (
            <StyleRow key={s.name} {...s} sample={s.sample} />
          ))}
        </div>

        {/* Patterns */}
        <div className="mb-16">
          <h2 className="typo-title-section font-semibold text-metro-foreground mb-2">
            Patterns
          </h2>
          <p className="typo-body-sm text-metro-foreground-muted mb-8">
            These aren't separate styles — they're combinations of existing styles with utility
            classes.
          </p>

          <div className="grid gap-6">
            <PatternExample
              name="Link"
              description="Apply underline + font-semibold to any body size. Links inherit their parent's text style."
              code='class="typo-body font-semibold underline"'
              preview={
                <div className="space-y-3">
                  <p className="typo-body font-semibold underline text-metro-primary">
                    View all transactions
                  </p>
                  <p className="typo-body-sm font-semibold underline text-metro-primary">
                    View all transactions
                  </p>
                </div>
              }
            />

            <PatternExample
              name="Label"
              description="Use Caption SemiBold for form labels, field labels, and UI tags."
              code='class="typo-caption font-semibold"'
              preview={
                <div className="space-y-1">
                  <span className="typo-caption font-semibold text-metro-foreground block">
                    Account number
                  </span>
                  <div className="bg-metro-surface-element rounded-metro-input px-3 py-2">
                    <span className="typo-body text-metro-foreground-muted">12345678</span>
                  </div>
                </div>
              }
            />

            <PatternExample
              name="Overline"
              description="Use Caption SemiBold + uppercase for section overlines and category headers."
              code='class="typo-caption font-semibold uppercase tracking-wider"'
              preview={
                <div className="space-y-2">
                  <span className="typo-caption font-semibold uppercase tracking-wider text-metro-foreground-muted block">
                    Recent activity
                  </span>
                  <span className="typo-title-subsection font-semibold text-metro-foreground block">
                    Your transactions
                  </span>
                </div>
              }
            />
          </div>
        </div>

        {/* Quick reference */}
        <div className="mb-16">
          <h2 className="typo-title-section font-semibold text-metro-foreground mb-6">
            Quick Reference
          </h2>

          <div className="bg-metro-surface-element rounded-metro-card overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-metro-border">
                  <th className="text-left p-4 typo-caption font-semibold text-metro-foreground-muted uppercase tracking-wider">
                    Style
                  </th>
                  <th className="text-left p-4 typo-caption font-semibold text-metro-foreground-muted uppercase tracking-wider">
                    Class
                  </th>
                  <th className="text-left p-4 typo-caption font-semibold text-metro-foreground-muted uppercase tracking-wider">
                    Size
                  </th>
                  <th className="text-left p-4 typo-caption font-semibold text-metro-foreground-muted uppercase tracking-wider">
                    Weight(s)
                  </th>
                  <th className="text-left p-4 typo-caption font-semibold text-metro-foreground-muted uppercase tracking-wider">
                    Font
                  </th>
                </tr>
              </thead>
              <tbody className="typo-body-sm text-metro-foreground">
                <tr className="border-b border-metro-border">
                  <td className="p-4">Display</td>
                  <td className="p-4">
                    <code className="typo-caption bg-metro-surface px-1.5 py-0.5 rounded">
                      typo-display
                    </code>
                  </td>
                  <td className="p-4 tabular-nums">64 → 40px</td>
                  <td className="p-4">Light</td>
                  <td className="p-4">FT Polar</td>
                </tr>
                <tr className="border-b border-metro-border">
                  <td className="p-4">Title Screen LG</td>
                  <td className="p-4">
                    <code className="typo-caption bg-metro-surface px-1.5 py-0.5 rounded">
                      typo-title-screen-lg
                    </code>
                  </td>
                  <td className="p-4 tabular-nums">48 → 32px</td>
                  <td className="p-4">Light</td>
                  <td className="p-4">FT Polar</td>
                </tr>
                <tr className="border-b border-metro-border">
                  <td className="p-4">Title Screen</td>
                  <td className="p-4">
                    <code className="typo-caption bg-metro-surface px-1.5 py-0.5 rounded">
                      typo-title-screen
                    </code>
                  </td>
                  <td className="p-4 tabular-nums">32 → 28px</td>
                  <td className="p-4">Regular</td>
                  <td className="p-4">FT Polar</td>
                </tr>
                <tr className="border-b border-metro-border">
                  <td className="p-4">Title Section</td>
                  <td className="p-4">
                    <code className="typo-caption bg-metro-surface px-1.5 py-0.5 rounded">
                      typo-title-section
                    </code>
                  </td>
                  <td className="p-4 tabular-nums">24px</td>
                  <td className="p-4">Regular, SemiBold</td>
                  <td className="p-4">FT Polar</td>
                </tr>
                <tr className="border-b border-metro-border">
                  <td className="p-4">Title Subsection</td>
                  <td className="p-4">
                    <code className="typo-caption bg-metro-surface px-1.5 py-0.5 rounded">
                      typo-title-subsection
                    </code>
                  </td>
                  <td className="p-4 tabular-nums">20px</td>
                  <td className="p-4">Regular, SemiBold</td>
                  <td className="p-4">FT Polar</td>
                </tr>
                <tr className="border-b border-metro-border">
                  <td className="p-4">Body Large</td>
                  <td className="p-4">
                    <code className="typo-caption bg-metro-surface px-1.5 py-0.5 rounded">
                      typo-body-lg
                    </code>
                  </td>
                  <td className="p-4 tabular-nums">18px</td>
                  <td className="p-4">Regular, SemiBold</td>
                  <td className="p-4">Inter</td>
                </tr>
                <tr className="border-b border-metro-border">
                  <td className="p-4">Body</td>
                  <td className="p-4">
                    <code className="typo-caption bg-metro-surface px-1.5 py-0.5 rounded">
                      typo-body
                    </code>
                  </td>
                  <td className="p-4 tabular-nums">16px</td>
                  <td className="p-4">Regular, SemiBold</td>
                  <td className="p-4">Inter</td>
                </tr>
                <tr className="border-b border-metro-border">
                  <td className="p-4">Body Small</td>
                  <td className="p-4">
                    <code className="typo-caption bg-metro-surface px-1.5 py-0.5 rounded">
                      typo-body-sm
                    </code>
                  </td>
                  <td className="p-4 tabular-nums">14px</td>
                  <td className="p-4">Regular, SemiBold</td>
                  <td className="p-4">Inter</td>
                </tr>
                <tr>
                  <td className="p-4">Caption</td>
                  <td className="p-4">
                    <code className="typo-caption bg-metro-surface px-1.5 py-0.5 rounded">
                      typo-caption
                    </code>
                  </td>
                  <td className="p-4 tabular-nums">12px</td>
                  <td className="p-4">Regular, SemiBold</td>
                  <td className="p-4">Inter</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Usage */}
        <div>
          <h2 className="typo-title-section font-semibold text-metro-foreground mb-6">Usage</h2>

          <div className="bg-metro-surface-element rounded-metro-card p-6">
            <pre className="typo-body-sm text-metro-foreground overflow-x-auto">
              <code>{`<!-- Display heading — Light only -->
<h1 class="typo-display font-light">Welcome back</h1>

<!-- Screen heading — Regular only -->
<h2 class="typo-title-screen">Your accounts</h2>

<!-- Section heading -->
<h3 class="typo-title-section font-semibold">Transactions</h3>

<!-- Body text -->
<p class="typo-body">Your balance is up to date.</p>

<!-- Button text -->
<button class="typo-body-sm font-semibold">Continue</button>

<!-- Caption -->
<span class="typo-caption">Last updated 2 mins ago</span>

<!-- Label (pattern: caption + semibold) -->
<label class="typo-caption font-semibold">Account number</label>

<!-- Link (pattern: body + semibold + underline) -->
<a class="typo-body font-semibold underline">View details</a>

<!-- Overline (pattern: caption + semibold + uppercase) -->
<span class="typo-caption font-semibold uppercase tracking-wider">Recent activity</span>`}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
