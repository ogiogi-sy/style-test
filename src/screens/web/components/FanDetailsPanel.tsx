import { MapPinIcon, UserIcon, MailIcon, PhoneIcon, BuildingIcon, ChevronRightIcon } from '../../shared/Icons'
import { fanDetails, productFootprint, activeApplications } from '../data/fanOverviewData'

const productIcons = {
  accounts: <BuildingIcon className="w-4 h-4" />,
  savings: <BuildingIcon className="w-4 h-4" />,
  loan: <BuildingIcon className="w-4 h-4" />,
}

const statusTagStyles = {
  info: 'bg-metro-primary text-metro-primary-foreground',
  warning: 'bg-metro-warning-soft text-metro-amber-800',
}

export function FanDetailsPanel() {
  return (
    <div className="flex flex-col gap-metro-xl">
      {/* Fan Details */}
      <div className="border border-metro-border rounded-metro-card p-metro-lg flex flex-col gap-metro-lg bg-metro-surface">
        <h3 className="text-metro-base font-metro-display font-semibold text-metro-foreground m-0">Fan Details</h3>

        {/* Address */}
        <div className="flex gap-metro-sm">
          <div className="w-8 h-8 rounded-full bg-metro-surface-element flex items-center justify-center shrink-0">
            <MapPinIcon className="w-4 h-4 text-metro-foreground-muted" />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-metro-xs font-semibold text-metro-foreground">{fanDetails.address.label}</span>
            {fanDetails.address.lines.map((line, i) => (
              <span key={i} className="text-metro-xs text-metro-foreground-muted">{line}</span>
            ))}
          </div>
        </div>

        {/* Primary Contact */}
        <div className="flex gap-metro-sm">
          <div className="w-8 h-8 rounded-full bg-metro-surface-element flex items-center justify-center shrink-0">
            <UserIcon className="w-4 h-4 text-metro-foreground-muted" />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-metro-xs font-semibold text-metro-foreground">{fanDetails.contact.label}</span>
            <span className="text-metro-xs text-metro-foreground-muted">{fanDetails.contact.name}</span>
            <span className="text-metro-xs text-metro-foreground-muted flex items-center gap-1">
              <MailIcon className="w-3 h-3" />
              {fanDetails.contact.email}
            </span>
            <span className="text-metro-xs text-metro-foreground-muted flex items-center gap-1">
              <PhoneIcon className="w-3 h-3" />
              {fanDetails.contact.phone}
            </span>
          </div>
        </div>

        {/* Contact Preferences */}
        <div className="flex gap-metro-sm">
          <div className="w-8 h-8 rounded-full bg-metro-surface-element flex items-center justify-center shrink-0">
            <MailIcon className="w-4 h-4 text-metro-foreground-muted" />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-metro-xs font-semibold text-metro-foreground">{fanDetails.preferences.label}</span>
            {fanDetails.preferences.lines.map((line, i) => (
              <span key={i} className="text-metro-xs text-metro-foreground-muted">{line}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Product Footprint */}
      <div className="border border-metro-border rounded-metro-card p-metro-lg flex flex-col gap-metro-md bg-metro-surface">
        <div className="flex items-center justify-between">
          <h3 className="text-metro-base font-metro-display font-semibold text-metro-foreground m-0">Product Footprint</h3>
        </div>
        <div className="flex flex-col gap-metro-sm">
          {productFootprint.map((product) => (
            <div key={product.label} className="flex items-center justify-between py-1">
              <div className="flex items-center gap-metro-sm">
                <span className="text-metro-foreground-muted">{productIcons[product.icon]}</span>
                <span className="text-metro-sm text-metro-foreground">
                  {product.count} {product.label}
                </span>
              </div>
            </div>
          ))}
        </div>
        <span className="text-metro-xs text-metro-primary font-semibold cursor-pointer hover:underline">
          View All &rsaquo;
        </span>
      </div>

      {/* Active Applications */}
      <div className="border border-metro-border rounded-metro-card p-metro-lg flex flex-col gap-metro-md bg-metro-surface">
        <h3 className="text-metro-base font-metro-display font-semibold text-metro-foreground m-0">Active Applications</h3>
        <div className="flex flex-col gap-metro-sm">
          {activeApplications.map((app, i) => (
            <div key={i} className="flex items-center justify-between py-metro-sm border-b border-metro-border last:border-b-0 cursor-pointer hover:bg-metro-surface-element -mx-metro-sm px-metro-sm rounded-metro-input transition-colors">
              <div className="flex items-center gap-metro-sm">
                <div className="w-8 h-8 rounded-metro-input bg-metro-surface-element flex items-center justify-center">
                  <BuildingIcon className="w-4 h-4 text-metro-foreground-muted" />
                </div>
                <div className="flex flex-col">
                  <span className="text-metro-sm text-metro-foreground">
                    {app.name} {app.amount && <span className="font-semibold">{app.amount}</span>}
                  </span>
                  <span className={`text-metro-xs font-semibold px-2 py-0.5 rounded-metro-button w-fit ${statusTagStyles[app.statusColor]}`}>{app.status}</span>
                </div>
              </div>
              <ChevronRightIcon className="w-4 h-4 text-metro-foreground-muted" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
