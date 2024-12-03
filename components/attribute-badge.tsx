import { Laptop, Star, Waves } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ReactNode } from "react";

interface BadgeProps {
  attribute: string;
}

const attributeIcons: Record<string, ReactNode> = {
  "Galveston": <Waves className="w-4 h-4"/>,
  "Honors": <Star className="w-4 h-4"/>,
  // "AWDC": <Landmark className="w-4 h-4"/>,
  // "ADAL": <RiToothLine className="w-4 h-4"/>,
  "Distance Education": <Laptop className="w-4 h-4"/>,
  // "ABRY": <Building className="w-4 h-4"/>,
};

export default function AttributeBadge({attribute}: BadgeProps) {

  return <>
    {attribute in attributeIcons ?
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className={"transition-transform hover:scale-110"}>
            {attributeIcons[attribute]}
          </TooltipTrigger>
          <TooltipContent className={"rounded-none text-xs"}>
            <p>{attribute}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      : <></>}
  </>;
}

