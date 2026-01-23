import { Button } from "@/components/ui/button";
import { Position, Handle } from "@xyflow/react";
import { MousePointer, MousePointerClick } from "lucide-react";

interface ClickType {
  kind: string;
}

const ManualTrigger = ({
  data,
  isConnectable,
}: {
  data: ClickType;
  isConnectable: boolean;
}) => {
  console.log(data);
  return (
    <div className="p-[3px] rounded-sm border-1 ">
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
      />
      <div>
        <Button className="active:bg-slate-700">
          Click <MousePointerClick />
        </Button>
      </div>
    </div>
  );
};

export default ManualTrigger;
