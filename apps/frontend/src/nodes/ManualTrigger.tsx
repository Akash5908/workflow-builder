import { Position, Handle } from "@xyflow/react";

interface ClickType {
  metadata: {
    kind: string;
  };
}

const ManualTrigger = ({
  data,
  isConnectable,
}: {
  data: ClickType;
  isConnectable: boolean;
}) => {
  return (
    <div className="p-[3px] rounded-sm border-1 ">
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
      />
      <div>{data.metadata.kind}</div>
    </div>
  );
};

export default ManualTrigger;
