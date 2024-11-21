import { Attribute } from "@/lib/course-types";
import { Building, Landmark, Laptop, Star, Waves } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { RiToothLine } from "react-icons/ri";
import { ReactNode } from "react";

interface BadgeProps {
  attribute: Attribute;
}

const attributeIcons: Record<string, ReactNode> = {
  "AGAL": <Waves className="w-4 h-4"/>,
  "HONR": <Star className="w-4 h-4"/>,
  "AWDC": <Landmark className="w-4 h-4"/>,
  "ADAL": <RiToothLine className="w-4 h-4"/>,
  "DIST": <Laptop className="w-4 h-4"/>,
  "ABRY": <Building className="w-4 h-4"/>,
};

export default function AttributeBadge({attribute}: BadgeProps) {

  return <>
    {attribute.SSRATTR_ATTR_CODE in attributeIcons ?
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className={"transition-transform hover:scale-110"}>
            {attributeIcons[attribute.SSRATTR_ATTR_CODE]}
          </TooltipTrigger>
          <TooltipContent className={"rounded-none text-xs"}>
            <p>{attribute.STVATTR_DESC}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      : <></>}
  </>;
}

