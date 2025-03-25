import { LoaderCircle } from "lucide-react";

export default function LoadingCircle({ className }: { className?: string }) {
  return (
    <div className={"animate-spin inline-block"}>
      <LoaderCircle className={className} />
    </div>
  );
}
