import { TriggerSheet } from "@/components/sheet/trigger-sheet";
import { useState, useCallback } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  useReactFlow,
  Background,
  MiniMap,
  MarkerType,
  BackgroundVariant,
  // type NodeChange,
  // type Node,
  // type EdgeChange,
  type Connection,
  type FinalConnectionState,
  type NodeChange,
  type EdgeChange,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {
  type EdgeType,
  type NodeProp,
  type NodeType,
  type WorkflowProp,
} from "common/types";
import ManualTrigger from "@/nodes/ManualTrigger";
import { ActionSheet } from "@/components/sheet/action-sheet";
import EmailAction from "@/nodes/EmailAction";
import TelegramAction from "@/nodes/TelegramAction";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { Button } from "../ui/button";
import {
  Plus,
  Save,
  Trash2,
  PanelLeft,
  PanelRight,
  FlaskConical,
} from "lucide-react";
import { Spinner } from "../ui/spinner";
import { SaveWorkflow } from "@/hooks/useSaveWorkflow";
import { motion } from "framer-motion";
import { ExecuteWorkflow } from "@/hooks/useExecuteWorkflow";
import WebhookTrigger from "@/nodes/WebhookTrigger";

const WorkflowEditor = ({ workflow }: { workflow: WorkflowProp }) => {
  useAuthGuard("/login", false);
  const [workflowData, setWorkflowData] = useState(workflow);
  const { screenToFlowPosition } = useReactFlow();
  const { saveWorkflow } = SaveWorkflow();
  const { executeWorkflow } = ExecuteWorkflow(workflow._id);

  const [saving, setSaving] = useState(false);
  const [executing, setExecuting] = useState(false);
  const [nodes, setNodes] = useState<NodeType[]>(workflow.nodes);
  const [edges, setEdges] = useState<EdgeType[]>(workflow.edges);
  const [showSidebar, setShowSidebar] = useState(false);

  const nodeTypes = {
    Manual: ManualTrigger,
    Email: EmailAction,
    Telegram: TelegramAction,
    Webhook: WebhookTrigger,
  };

  const [toggleSheet, setToggleSheet] = useState(false);
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
    (changes: NodeChange<NodeType>[]) =>
      setNodes((nds: NodeType[]) => applyNodeChanges<NodeType>(changes, nds)),
    [],
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange<EdgeType>[]) =>
      setEdges((eds: EdgeType[]) => applyEdgeChanges(changes, eds)),
    [],
  );

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [],
  );

  const onConnectionEnd = useCallback(
    (_event: MouseEvent | TouchEvent, connectionInfo: FinalConnectionState) => {
      if (!connectionInfo.to) return;
      const dropPosition = screenToFlowPosition({
        x: connectionInfo.to.x,
        y: connectionInfo.to.y,
      });
      setNodeData({
        xCordinate: dropPosition.x,
        yCordinate: dropPosition.y,
        fromNodeId: connectionInfo.fromNode!.id,
      });
      setOpenAction(true);
    },
    [screenToFlowPosition],
  );

  const onSelect = (item: NodeProp) => {
    const newNodeId = item.id;
    const newNode = {
      id: newNodeId,
      workflowId: workflow._id,
      position: { x: nodeData.xCordinate, y: nodeData.yCordinate },
      data: { ...item.data, workflowId: workflow._id },
      type: item.data.kind as keyof typeof nodeTypes,
      isConnectable: true,
    };
    if (item.data.type === "trigger") {
      setNodes((prev) => prev.filter((n) => n.data.type !== "trigger"));
    }
    setNodes((nds) => [...nds, newNode]);

    if (nodeData.fromNodeId && item.data.type === "target") {
      setEdges((eds) => [
        ...eds,
        {
          id: `${nodeData.fromNodeId}-${newNodeId}`,
          source: nodeData.fromNodeId,
          style: {
            stroke: "#3b82f6",
            strokeWidth: 1,
            strokeDasharray: "10,5",
            strokeLinecap: "round",
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: "#3b82f6",
            width: 10,
            height: 10,
          },
          target: newNodeId,
        },
      ]);
    }

    setOpenAction(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveWorkflow({
        _id: workflow._id,
        workflowName: workflow.workflowName,
        nodes: nodes,
        edges: edges,
        createdAt: workflow.createdAt,
        userId: workflow.userId,
      });
    } finally {
      setSaving(false);
    }
  };

  const handleExecute = async () => {
    setExecuting(true);
    try {
      await executeWorkflow(); // func to execute workflow
      setWorkflowData((prev) => ({
        ...prev,
        executed: true,
      }));
    } finally {
      setExecuting(false);
    }
  };

  const handleClear = () => {
    setNodes([]);
    setEdges([]);
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-slate-900 text-white">
      {/* Top Toolbar */}
      <div className=" w-auto absolute top-5  right-4 z-50 flex items-center justify-between bg-white/5 backdrop-blur-md rounded-2xl p-3 border border-white/10 shadow-xl">
        <div className="flex items-center gap-2">
          {/* Sidebar Toggle */}
          <Button
            size="icon"
            variant="ghost"
            className=" z-50 h-12 w-12 text-slate-400 hover:bg-white/20 bg-white/10 hover:text-white"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            {showSidebar ? (
              <PanelLeft className="h-6 w-6" />
            ) : (
              <PanelRight className="h-6 w-6" />
            )}
          </Button>

          <Button
            onClick={handleSave}
            disabled={saving || nodes.length === 0}
            className="h-12 px-6 bg-slate-600 hover:bg-slate-700 text-white shadow-lg border-emerald-600"
          >
            {saving ? (
              <Spinner className="h-4 w-4 mr-2" />
            ) : (
              <Save className="h-5 w-5 mr-2" />
            )}
            Save Workflow
          </Button>
          <Button
            onClick={handleClear}
            variant="outline"
            className="h-12 px-6 border-white/30 text-slate-200 hover:bg-white/10 shadow-xl bg-red-500"
          >
            <Trash2 className="h-5 w-5 mr-2" />
            Clear All
          </Button>
        </div>
      </div>

      {/* Execute workflow Button */}
      {!workflowData.executed && (
        <Button
          className="bg-orange-500 fixed top-[90vh] left-[50vw] z-50  hover:bg-orange-600 shadow-lg h-12 px-6 gap-2"
          onClick={handleExecute}
        >
          <FlaskConical className="h-5 w-5" />
          {executing ? (
            <div className="flex justify-center items-center">
              {" "}
              Executing <Spinner />
            </div>
          ) : (
            "Execute Workflow"
          )}
        </Button>
      )}

      {/* Sidebar */}
      {showSidebar && (
        <div className="absolute left-4 top-20 z-40 w-72 h-[calc(100vh-8rem)] bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-white/10 bg-white/5">
            <h2 className="text-xl font-bold text-white">Node Library</h2>
            <p className="text-sm text-slate-400 mt-1">
              Drag nodes to build workflows
            </p>
          </div>
          <div className="p-4 overflow-auto flex-1">
            <div className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start h-14 bg-white/10 hover:bg-white/20 text-slate-200 rounded-xl"
                onClick={() => setToggleSheet(true)}
              >
                <Plus className="h-5 w-5 mr-3 flex-shrink-0" />
                Add Trigger Node
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start h-14 bg-white/10 hover:bg-white/20 text-slate-200 rounded-xl"
                onClick={() => setOpenAction(true)}
              >
                <Plus className="h-5 w-5 mr-3 flex-shrink-0" />
                Add Action Node
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Trigger & Action Sheets */}
      <TriggerSheet
        toggleSheet={toggleSheet}
        setToggleSheet={setToggleSheet}
        onSelect={onSelect}
      />
      <ActionSheet
        toggleSheet={openAction}
        setToggleSheet={setOpenAction}
        onSelect={onSelect}
      />

      {/* Floating Add Button */}
      {nodes.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="pointer-events-auto group"
            onClick={() => setToggleSheet(true)}
          >
            <Button
              size="icon"
              className="h-20 w-20 bg-white/10 backdrop-blur-md border-2 border-white/20 shadow-2xl hover:bg-white/20 text-white hover:scale-105 transition-all duration-200"
            >
              <Plus className="h-10 w-10" />
            </Button>
            <p className="text-center text-slate-400 mt-4 font-medium text-sm">
              Click to add your first node
            </p>
          </motion.div>
        </div>
      )}

      {/* React Flow */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectEnd={onConnectionEnd}
        nodeTypes={nodeTypes}
        fitView
        nodesDraggable={true}
        elementsSelectable={workflowData.executed}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color="#ffffff30"
        />

        <MiniMap
          className="!backdrop-blur-md !bg-white/5 !border-white/1s0 !rounded-xl !shadow-xl"
          nodeColor={(node) => {
            switch (node.type) {
              case "Manual":
                return "#3b82f6";
              case "Email":
                return "#10b981";
              case "Telegram":
                return "#f59e0b";
              default:
                return "#6366f1";
            }
          }}
        />
      </ReactFlow>
    </div>
  );
};

export default WorkflowEditor;
