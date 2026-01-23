import { Position, Handle } from "@xyflow/react";

interface ClickType {
  kind: string;
}

const TelegramAction = ({
  data,
  isConnectable,
}: {
  data: ClickType;
  isConnectable: boolean;
}) => {
  console.log("Action node ht");
  return (
    <div className="p-[3px] rounded-sm border-1 ">
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
      />
      <div>{data.kind}</div>
    </div>
  );
};

export default TelegramAction;
