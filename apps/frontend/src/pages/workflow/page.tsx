import React from "react";
import { ReactFlowProvider } from "@xyflow/react";
import CreateWorkflow from "./component/createWorkflow";

const page = () => {
  return (
    <div>
      <ReactFlowProvider>
        <CreateWorkflow />
      </ReactFlowProvider>
    </div>
  );
};

export default page;
