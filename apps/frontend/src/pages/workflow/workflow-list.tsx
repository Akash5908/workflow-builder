import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, WorkflowIcon, Clock, Copy } from "lucide-react";
import { CreateWorkflow } from "@/components/workflow/workflowCreator";
import { useWorkflow } from "@/hooks/useWorkflow";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/lib/formatDate";
import { useAuthGuard } from "@/hooks/useAuthGuard";

const Workflow = () => {
  const workflows = useWorkflow();
  const navigate = useNavigate();

  // Check if the user is logged in
  useAuthGuard("/login", false);
  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  if (!workflows) {
    return (
      <div className="space-y-6 p-8 bg-slate-900 min-h-screen">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-64 bg-slate-800" />
          <Skeleton className="h-12 w-44 bg-slate-800" />
        </div>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-8 space-y-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full bg-slate-700" />
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 text-white">
      {/* Enhanced Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-xl">
              <WorkflowIcon className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent">
                Workflow Dashboard
              </h1>
              <p className="text-slate-400">
                Manage all your automation workflows
              </p>
            </div>
          </div>
          <CreateWorkflow />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 bg-slate-800/50 backdrop-blur-md hover:shadow-2xl border-slate-700/50 shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-blue-400">
                {workflows.length}
              </div>
              <p className="text-sm text-slate-400 mt-1">Total Workflows</p>
            </CardContent>
          </Card>
          <Card className="border-0 bg-slate-800/50 backdrop-blur-md hover:shadow-2xl border-slate-700/50 shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-emerald-400">0</div>
              <p className="text-sm text-slate-400 mt-1">Active</p>
            </CardContent>
          </Card>
          <Card className="border-0 bg-slate-800/50 backdrop-blur-md hover:shadow-2xl border-slate-700/50 shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-orange-400">0</div>
              <p className="text-sm text-slate-400 mt-1">Paused</p>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Table Card */}
        <Card className="border-0 bg-slate-800/70 backdrop-blur-md border-slate-700 shadow-2xl">
          <CardHeader className="pb-6">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold text-slate-100">
                  Your Workflows
                </CardTitle>
                <CardDescription className="text-slate-400 mt-1">
                  {workflows.length > 0
                    ? `${workflows.length} workflow${workflows.length !== 1 ? "s" : ""} found`
                    : "No workflows created yet"}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-b border-slate-700 bg-slate-800/50">
                    <TableHead className="w-[140px] font-semibold text-slate-300 text-left">
                      ID
                    </TableHead>
                    <TableHead className="w-[300px] font-semibold text-slate-300">
                      Name
                    </TableHead>
                    <TableHead className="w-[200px] font-semibold text-slate-300 hidden md:table-cell text-left">
                      Created
                    </TableHead>
                    <TableHead className="w-[160px] font-semibold text-slate-300 text-right pr-4">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {workflows.length > 0 ? (
                    workflows.map((wf) => (
                      <TableRow
                        key={wf._id}
                        className="hover:bg-slate-700/50 border-b border-slate-700/50 transition-all duration-200 group data-[state=selected]:bg-slate-700 h-14"
                      >
                        {/* ID Column - Fixed width, proper alignment */}
                        <TableCell className="font-mono text-sm text-slate-400 group-hover:text-slate-200 max-w-[140px] truncate pr-4">
                          <div className="flex items-center gap-2">
                            <span className="truncate">{wf._id.slice(-8)}</span>
                            <button
                              onClick={() => copyToClipboard(wf._id)}
                              className="opacity-0 group-hover:opacity-100 p-1 hover:bg-slate-600/80 rounded-lg transition-all backdrop-blur-sm flex-shrink-0"
                              title="Copy ID"
                            >
                              <Copy className="h-4 w-4 text-slate-400 hover:text-slate-200" />
                            </button>
                          </div>
                        </TableCell>

                        {/* Name Column - Proper truncation */}
                        <TableCell className="font-medium text-slate-200 max-w-[300px] truncate pr-4">
                          <div className="flex items-center gap-2">
                            <span className="truncate">{wf.workflowName}</span>
                            <Badge className="text-xs bg-slate-700/50 text-slate-300 border-slate-600/50 whitespace-nowrap">
                              v1
                            </Badge>
                          </div>
                        </TableCell>

                        {/* Date Column - Hidden on mobile */}
                        <TableCell className="text-sm text-slate-400 hidden md:table-cell pr-4">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-slate-500 flex-shrink-0" />
                            <span className="truncate">
                              {formatDate(wf.createdAt)}
                            </span>
                          </div>
                        </TableCell>

                        {/* Actions Column - Right aligned */}
                        <TableCell className="text-right py-3 px-4">
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-lg h-10 px-6 backdrop-blur-md border-transparent text-white font-medium rounded-xl transition-all duration-200 whitespace-nowrap"
                            onClick={() =>
                              navigate(`/workflow/${wf._id}`, { replace: true })
                            }
                          >
                            <ChevronRight className="mr-2 h-4 w-4" />
                            Open
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        className="h-80 text-center py-12 text-slate-400"
                      >
                        <div className="max-w-md mx-auto">
                          <div className="p-8 bg-slate-800/50 rounded-3xl shadow-2xl border border-slate-700 mx-auto mb-6 w-32 h-32 flex items-center justify-center">
                            <WorkflowIcon className="h-16 w-16 text-slate-600" />
                          </div>
                          <h3 className="text-xl font-bold mb-2 text-slate-200">
                            No workflows yet
                          </h3>
                          <p className="text-slate-500 mb-8 max-w-sm mx-auto">
                            Get started by creating your first automation
                            workflow.
                          </p>
                          <CreateWorkflow />
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Workflow;
