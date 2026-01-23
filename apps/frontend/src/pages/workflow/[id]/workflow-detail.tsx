import { Spinner } from "@/components/ui/spinner";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ChevronLeft,
  Save,
  Play,
  Download,
  Maximize2,
  Settings,
  Copy,
} from "lucide-react";
import WorkflowEditor from "@/components/workflow/workflowEditor";
import config from "@/config";
import { ReactFlowProvider } from "@xyflow/react";
import axios from "axios";
import type { WorkflowProp } from "common/types";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const WorkflowDetail = () => {
  const [workflow, setWorkflow] = useState<WorkflowProp | null>(null);
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      setError("No workflow ID provided");
      setLoading(false);
      return;
    }

    const fetchWorkflow = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(`${config.serverApiUrl}/workflow/${id}`, {
          headers: {
            Authorization: `Bearer ${config.accessToken}`,
          },
        });

        if (res.status === 200 && res.data.workflow?.[0]) {
          setWorkflow(res.data.workflow[0]);
        } else {
          setError("Workflow not found");
        }
      } catch (err: any) {
        console.error(err);
        setError(err.response?.data?.error || "Failed to load workflow");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkflow();
  }, [id]);

  const copyWorkflowId = () => {
    if (workflow?._id) {
      navigator.clipboard.writeText(workflow._id);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            {/* Header Skeleton */}
            <div className="flex items-center justify-between p-6">
              <Skeleton className="h-12 w-96" />
              <div className="flex gap-2">
                <Skeleton className="h-12 w-32" />
                <Skeleton className="h-12 w-32" />
              </div>
            </div>

            {/* Editor Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 border-0 shadow-2xl">
                <CardContent className="p-0 h-[70vh]">
                  <Skeleton className="h-full w-full" />
                </CardContent>
              </Card>
              <Card className="border-0 shadow-2xl">
                <CardContent className="p-6 h-[70vh] overflow-auto">
                  <Skeleton className="h-full w-full" />
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (error || !workflow) {
    return (
      <div className="h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-8">
        <Card className="max-w-md w-full border-0 shadow-2xl">
          <CardContent className="p-12 text-center">
            <div className="w-24 h-24 bg-red-100 rounded-2xl mx-auto mb-6 flex items-center justify-center">
              <ChevronLeft className="h-12 w-12 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              {error || "Workflow not found"}
            </h2>
            <p className="text-slate-500 mb-8">
              The workflow you're looking for doesn't exist or has been deleted.
            </p>
            <div className="flex gap-3 justify-center">
              <Button
                variant="outline"
                onClick={() => navigate("/")}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
              <Button
                onClick={() => window.location.reload()}
                variant="secondary"
              >
                Retry
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <ReactFlowProvider>
        <AnimatePresence mode="wait">
          <WorkflowEditor key={workflow?._id} workflow={workflow!} />
        </AnimatePresence>
      </ReactFlowProvider>
    </div>
  );
};

export default WorkflowDetail;
