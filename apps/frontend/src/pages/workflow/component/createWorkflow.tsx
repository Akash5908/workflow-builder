import { TriggerSheet } from "@/components/TriggerSheet/TriggerSheet";
import { useState, useCallback } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Handle,
  Position,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {
  type EdgeType,
  type NodeProp,
  type NodeType,
  type TriggerProp,
} from "common/types";
import ManualTrigger from "@/nodes/ManualTrigger";
import { ActionSheet } from "@/components/ActionSheet/ActionSheet";
import EmailAction from "@/nodes/EmailAction";
import TelegramAction from "@/nodes/TelegramAction";

// const initialNodes = [
//   {
//     id: "n1",
//     position: { x: 0, y: 0 },
//     data: { label: "Node 1" },
//     type: "input",
//   },
//   {
//     id: "n2",
//     position: { x: 100, y: 100 },
//     data: { label: "Node 2" },
//   },
//   {
//     id: "n3",
//     position: { x: 200, y: 200 },
//     data: { label: "Node 3" },
//   },
// ];
// const initialEdges = [
//   { id: "n1-n2", source: "n1", sourceHandle: "a", target: "n2" },
// ];

const CreateWorkflow = () => {
  const { screenToFlowPosition } = useReactFlow(); // Add this
  const [nodes, setNodes] = useState<NodeType[]>([]);
  const nodeTypes = {
    Manual: ManualTrigger,
    Email: EmailAction,
    Telegram: TelegramAction,
  };
  const [edges, setEdges] = useState<EdgeType[]>([]);
  const [toggleSheet, setToggleSheet] = useState(true);
  const [openAction, setOpenAction] = useState(false);
  const [nodeData, setNodeData] = useState<{
    xCordinate: number;
    yCordinate: number;
    fromNodeId: string;
  }>({
    xCordinate: 0,
    yCordinate: 0,
    fromNodeId: "",
  });
  const onNodesChange = useCallback(
    (changes) =>
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );
  const onConnect = useCallback(
    (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );

  const onConnectionEnd = useCallback(
    (params, connectionInfo) => {
      const dropPosition = screenToFlowPosition({
        x: connectionInfo.to.x,
        y: connectionInfo.to.y,
      });
      setNodeData({
        xCordinate: dropPosition.x,
        yCordinate: dropPosition.y,
        fromNodeId: connectionInfo.fromNode.id, // Fixed typo: formNode → fromNode
      });
      setOpenAction(true);
    },
    [screenToFlowPosition], // dependencies array
  );

  const onSelect = (item: NodeProp) => {
    console.log(item);
    if (item.metadata.type === "target") {
      setNodes((nodes) => [
        ...nodes,
        {
          id: item.id,
          position: { x: nodeData.xCordinate, y: nodeData.yCordinate },
          data: item.metadata,
          type: item.metadata.kind,
          isConnectable: true,
        },
      ]);
      setEdges((edges) => [
        ...edges,
        {
          id: `${item.id}-${nodeData.fromNodeId}`,
          source: nodeData.fromNodeId,
          target: item.id,
        },
      ]);
    } else {
      setNodes((nodes) => [
        ...nodes,
        {
          id: item.id,
          position: { x: nodeData.xCordinate, y: nodeData.yCordinate },
          data: { metadata: item.metadata },
          type: item.metadata.kind,
          isConnectable: true,
        },
      ]);
    }
  };
  return (
    <div>
      {/* Side bar to select nodes */}

      <div style={{ width: "100vw", height: "100vh" }}>
        <TriggerSheet
          toggleSheet={toggleSheet}
          setToggleSheet={setToggleSheet}
          onSelect={(item) => onSelect(item)}
        />
        <ActionSheet
          toggleSheet={openAction}
          setToggleSheet={setOpenAction}
          onSelect={(item) => onSelect(item)}
        />

        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          onConnectEnd={onConnectionEnd}
          fitView
        />
      </div>
    </div>
  );
};

export default CreateWorkflow;
