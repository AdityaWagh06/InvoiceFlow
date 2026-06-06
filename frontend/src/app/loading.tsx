import { Spinner } from "@/components/ui/Spinner";
import { copy } from "@/constants/copy";

/**
 * App-level loading state.
 */
const RootLoading = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-mist-100">
      <Spinner label={copy.states.loading} />
    </div>
  );
};

export default RootLoading;
