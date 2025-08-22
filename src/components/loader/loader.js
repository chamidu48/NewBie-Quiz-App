import { ArrowPathIcon } from "@heroicons/react/24/outline";

export default function Loader() {
  return (
    <div className="flex items-center justify-center">
      <ArrowPathIcon className="h-6 w-6 animate-spin text-white" />
    </div>
  );
}
