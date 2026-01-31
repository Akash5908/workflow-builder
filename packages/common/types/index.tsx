export const SUPPORTED_TRIGGERS = [
  { id: "1", title: "Manual", description: "Manually triggers the workflow." },
  { id: "2", title: "Webhook", description: "When the webhook is triggered" },
];

export const SUPPORTED_ACTIONS = [
  { id: "a1", title: "Email", description: "Email Action to send email." },
  { id: "a2", title: "Telegram", description: "Telegram Action" },
];
export interface TriggerProp {
  id: string;
  metadata: {
    title: string;
  };
}
export interface WorkflowProp {
  _id: string;
  workflowName: string;
  userId: string;
  nodes: NodeType[];
  edges: EdgeType[];
  executed?: boolean;
  createdAt: string;
}

export interface ActionProp {
  id: string;
  data: { kind: string; type: string; metadata: any };
}

export interface NodeType {
  id: string;
  position: {
    x: number;
    y: number;
  };
  data: { kind: string; type: string; value: string; metadata: any };
  type: string;
}

export interface EdgeType {
  id: string;
  source: string;
  target: string;
}

export interface NodeProp {
  id: string;
  data: any;
}
