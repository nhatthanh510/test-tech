import { useState } from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { PossibilitiesItem } from '@/util/transform'
import { ChevronsUpDown } from "lucide-react";
import RoomPlan from './RoomPlan'

const Possibilities: React.FC<PossibilitiesItem> = ({ suppliercode, supplieraccomcode, currency, TotalPrice, RoomPlans }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="mt-10 flex justify-center w-full">
      <Collapsible
        open={isOpen}
        className="space-y-2 w-full"
        onOpenChange={setIsOpen}
      >
        <CollapsibleTrigger asChild>
          <div className="flex border-white items-center border-[0.5px] pr-2">
            <div className="h-[50px] flex flex-1 items-center justify-between p-5 ">
              <span>
                {suppliercode} ({supplieraccomcode})
              </span>
              <span className="pointer-events-none">
                <b>Price:</b> {TotalPrice.net} {currency}
              </span>
            </div>
            <ChevronsUpDown className="w-[30px] h-[30px]" />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 h-[500px] overflow-scroll">
          {RoomPlans.map((roomPlan, index) => {
            return <RoomPlan key={index} {...roomPlan} />
          })}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default Possibilities