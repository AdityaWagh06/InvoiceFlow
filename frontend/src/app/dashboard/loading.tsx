import { Spinner } from "@/components/ui/Spinner";
import { copy } from "@/constants/copy";

/**
 * Loading state for dashboard pages.
 */
const DashboardLoading = () => {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <Spinner label={copy.states.loading} />
    </div>
  );
};

export default DashboardLoading;
