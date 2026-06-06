import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const SettingsPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-ink-700">Settings</h1>
        <p className="text-sm text-ink-600">Manage your profile, team, and integrations.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {"Profile,Team,Integrations,Billing,Notifications".split(",").map((tab) => (
          <Button key={tab} variant={tab === "Profile" ? "primary" : "secondary"}>
            {tab}
          </Button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-mist-200 bg-white p-6 shadow-card">
          <div className="text-sm font-semibold text-ink-700">Profile</div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <Input label="Name" defaultValue="Rhea Kapoor" />
            <Input label="Email" defaultValue="rhea@ledgerly.ai" />
            <Input label="Company" defaultValue="Ledgerly AI" />
            <Input label="GSTIN" defaultValue="27AAPFU0939F1ZV" />
            <Input label="Address" defaultValue="Lower Parel, Mumbai" />
          </div>
          <Button className="mt-4">Save changes</Button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-mist-200 bg-white p-6 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-ink-700">Tally Integration</div>
                <div className="text-xs text-ink-500">Connected</div>
              </div>
              <Badge label="Active" variant="success" />
            </div>
            <div className="mt-4">
              <Input label="Tally server URL" defaultValue="http://192.168.1.24:9000" />
            </div>
            <Button className="mt-4" variant="secondary">
              Test connection
            </Button>
          </div>
          <div className="rounded-2xl border border-mist-200 bg-white p-6 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-ink-700">WhatsApp Integration</div>
                <div className="text-xs text-ink-500">Coming soon</div>
              </div>
              <Badge label="Waitlist" variant="warning" />
            </div>
            <Button className="mt-4" variant="secondary">
              Join waitlist
            </Button>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-mist-200 bg-white p-6 shadow-card">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-ink-700">Current plan</div>
            <div className="text-xs text-ink-500">Renews on 30 Jun 2026</div>
          </div>
          <Badge label="Razorpay" variant="indigo" />
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-mist-200 bg-mist-100 p-4">
            <div className="text-xs text-ink-500">Plan</div>
            <div className="text-sm font-semibold text-ink-700">Pro</div>
          </div>
          <div className="rounded-xl border border-mist-200 bg-mist-100 p-4">
            <div className="text-xs text-ink-500">Invoices used</div>
            <div className="text-sm font-semibold text-ink-700">680 / 1000</div>
          </div>
          <div className="rounded-xl border border-mist-200 bg-mist-100 p-4">
            <div className="text-xs text-ink-500">Upgrade</div>
            <Button className="mt-2" variant="secondary">
              Upgrade plan
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
