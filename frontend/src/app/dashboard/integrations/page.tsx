import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const IntegrationsPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-ink-700">Integrations</h1>
        <p className="text-sm text-ink-600">Connect ERP, storage, and messaging tools.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-mist-200 bg-white p-6 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-ink-700">Tally Integration</div>
              <div className="text-xs text-ink-500">ERP sync status</div>
            </div>
            <Badge label="Connected" variant="success" />
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
              <div className="text-sm font-semibold text-ink-700">WhatsApp Upload</div>
              <div className="text-xs text-ink-500">Vendor intake channel</div>
            </div>
            <Badge label="Coming soon" variant="warning" />
          </div>
          <p className="mt-4 text-sm text-ink-600">
            Send invoices to a dedicated WhatsApp number and auto-create entries.
          </p>
          <Button className="mt-4" variant="secondary">
            Join waitlist
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IntegrationsPage;
