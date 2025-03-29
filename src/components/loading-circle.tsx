import { LoaderCircle } from "lucide-react";

export default function LoadingCircle({ className }: { className?: string }) {
  return (
    <div className={"inline-block animate-spin"}>
      <LoaderCircle className={className} />
    </div>
  );
}
