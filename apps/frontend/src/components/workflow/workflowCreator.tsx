import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import config from "@/config";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { FieldDescription } from "../ui/field";
import { Zap, Workflow, PlayCircle, Clock, MousePointer } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Spinner } from "../ui/spinner";

export function CreateWorkflow() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [error, setError] = useState({
    name: "",
    isNameValid: true,
  });
  const [isCreating, setIsCreating] = useState(false);

  const createWorkflow = async () => {
    if (name.trim() === "") {
      return setError((prevError) => ({
        ...prevError,
        name: "Workflow name is required",
        isNameValid: false,
      }));
    }

    setIsCreating(true);
    setError((prev) => ({ ...prev, isNameValid: true }));

    try {
      const res = await axios.post(
        `${config.serverApiUrl}/workflow`,
        {
          workflowName: name.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${config.accessToken}`,
          },
        },
      );

      if (res.status === 200) {
        const workflowId = res.data.workflowId;
        toast.success(`Workflow created! 🎉 ID: ${workflowId.slice(-8)}`);
        navigate(`/workflow/${workflowId}`, { replace: true });
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const err = error as AxiosError<{ error: string }>;
        toast.error(err.response?.data?.error || "Workflow creation failed.");
      }
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            variant="secondary"
            className="group hover:bg-slate-300 font-semibold px-6 py-2.5 rounded-xl 
                       shadow-lg hover:shadow-slate/20 transition-all duration-300
                       hover:-translate-y-0.5"
          >
            <Zap className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
            Create Workflow
          </Button>
        </motion.div>
      </DialogTrigger>

      <DialogContent
        className="sm:max-w-md bg-gradient-to-b from-slate-900/95 to-slate-900/80 
                               backdrop-blur-3xl border-white/10 shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        <DialogHeader>
          <div className="flex items-center gap-3 mb-4">
            <div
              className="p-3 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 
                           rounded-2xl border border-emerald-500/30 backdrop-blur-sm shadow-xl"
            >
              <Workflow className="w-7 h-7 text-emerald-400 drop-shadow-lg" />
            </div>
            <div>
              <DialogTitle
                className="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 
                                     bg-clip-text text-transparent tracking-tight"
              >
                New Workflow
              </DialogTitle>
              <DialogDescription className="text-slate-400 font-medium">
                Create a new automation workflow. Name it and we'll open the
                editor instantly.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Workflow templates preview */}
          <div
            className="grid grid-cols-2 gap-2 p-4 bg-slate-800/50 border border-slate-700/50 
                         rounded-2xl backdrop-blur-sm"
          >
            <motion.div
              className="group cursor-pointer p-3 rounded-xl bg-slate-700/50 border border-slate-600/50 
                        hover:bg-emerald-500/10 hover:border-emerald-400/30 transition-all"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-2 mb-1">
                <MousePointer className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-medium text-slate-400 group-hover:text-emerald-400">
                  Manual
                </span>
              </div>
              <div className="h-1 bg-slate-600/50 group-hover:bg-emerald-400 rounded-full transition-colors" />
            </motion.div>

            <motion.div
              className="group cursor-pointer p-3 rounded-xl bg-slate-700/50 border border-slate-600/50 
                        hover:bg-blue-500/10 hover:border-blue-400/30 transition-all"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-medium text-slate-400 group-hover:text-blue-400">
                  Schedule
                </span>
              </div>
              <div className="h-1 bg-slate-600/50 group-hover:bg-blue-400 rounded-full transition-colors" />
            </motion.div>

            <motion.div
              className="group cursor-pointer p-3 rounded-xl bg-slate-700/50 border border-slate-600/50 
                        hover:bg-orange-500/10 hover:border-orange-400/30 transition-all col-span-2"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-2 mb-1">
                <PlayCircle className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-medium text-slate-400 group-hover:text-orange-400">
                  Webhook
                </span>
              </div>
              <div className="h-1 bg-slate-600/50 group-hover:bg-orange-400 rounded-full transition-colors" />
            </motion.div>
          </div>

          {/* Name input */}
          <div className="space-y-2">
            <Label className="text-slate-300 font-semibold text-sm tracking-tight">
              Workflow Name
            </Label>
            <div className="relative">
              <Input
                id="name-1"
                name="name"
                placeholder="e.g. Daily Report Sender"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError((prev) => ({ ...prev, isNameValid: true }));
                }}
                className="h-12 bg-slate-800/70 border-slate-700/50 backdrop-blur-sm 
                          text-white placeholder-slate-500 font-medium 
                          focus-visible:ring-2 focus-visible:ring-emerald-500/50 
                          focus-visible:border-emerald-500/50 hover:border-slate-600/50 
                          transition-all duration-200 pl-12 pr-4 rounded-xl shadow-inner"
                aria-invalid={!error.isNameValid}
              />
              <Workflow
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 
                                 text-slate-500 pointer-events-none"
              />
            </div>
            <AnimatePresence>
              {!error.isNameValid && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <FieldDescription
                    className="text-red-400 bg-red-500/10 border border-red-400/30 
                                             px-3 py-2 rounded-lg text-sm font-medium"
                  >
                    {error.name}
                  </FieldDescription>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Stats preview */}
          <div
            className="grid grid-cols-3 gap-3 text-center p-4 bg-slate-800/30 border border-slate-700/30 
                         rounded-2xl backdrop-blur-sm text-sm"
          >
            <div>
              <div className="text-2xl font-bold text-emerald-400 mb-1">0</div>
              <div className="text-slate-500 text-xs uppercase tracking-wider">
                Nodes
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400 mb-1">0</div>
              <div className="text-slate-500 text-xs uppercase tracking-wider">
                Triggers
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-400 mb-1">0s</div>
              <div className="text-slate-500 text-xs uppercase tracking-wider">
                Runtime
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-3 pt-6 border-t border-slate-800/50">
          <DialogClose asChild>
            <Button
              variant="outline"
              className="h-12 px-8 border-slate-700/50 hover:border-slate-600/50 bg-slate-800/50 
                        hover:bg-slate-800 backdrop-blur-sm text-white hover:text-slate-200 
                        font-semibold rounded-xl shadow-lg hover:shadow-slate/20 transition-all"
              disabled={isCreating}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={createWorkflow}
            disabled={isCreating || !name.trim()}
            className="h-12 px-8 flex items-center gap-2 
                      hover:from-emerald-600 hover:to-blue-700 text-white font-semibold shadow-xl 
                      hover:shadow-emerald/25 rounded-xl border border-emerald-400/50 transition-all 
                      disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
          >
            {isCreating ? (
              <>
                <Spinner className="w-4 h-4 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                Create & Edit
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
