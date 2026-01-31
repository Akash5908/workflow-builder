import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Position, Handle, useReactFlow } from "@xyflow/react";
import { MousePointerClick, Play, Zap, Circle } from "lucide-react";
import { useCallback, useState } from "react";
import { motion } from "framer-motion";

interface ClickType {
  kind: string;
  value: string;
}

const ManualTrigger = ({
  id,
  data,
  isConnectable,
}: {
  id: string;
  data: ClickType;
  isConnectable: boolean;
}) => {
  const { updateNodeData } = useReactFlow();
  const [isClicked, setIsClicked] = useState(false);

  const handleTrigger = useCallback(() => {
    setIsClicked(true);
    updateNodeData(id, { value: true });
    setTimeout(() => {
      updateNodeData(id, { value: false });
      setIsClicked(false);
    }, 3000);
  }, [id, updateNodeData]);

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0.8 }}
      animate={{ scale: 1, opacity: 1 }}
      className="group relative bg-gradient-to-br from-blue-500/10 to-blue-600/5 
                 backdrop-blur-md border border-blue-500/40 shadow-xl rounded-xl p-4 
                 w-[240px] hover:shadow-blue/25 hover:border-blue-400/60 
                 transition-all duration-300 hover:-translate-y-0.5"
      style={{ minHeight: 120 }}
    >
      {/* Animated gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent 
                      to-indigo-500/5 rounded-xl opacity-0 group-hover:opacity-100 
                      transition-opacity duration-500"
      />

      {/* Output handle */}
      <Handle
        type="source"
        position={Position.Right}
        className="!w-3 !h-3 bg-blue-500 hover:bg-blue-400 
                   border-2 border-white/30 rounded-sm ring-2 ring-blue-500/40 
                   shadow-md hover:shadow-lg transition-all"
        isConnectable={isConnectable}
      />

      {/* Header */}
      <div className="flex items-start space-x-3 mb-3">
        <motion.div
          animate={{ scale: isClicked ? [1, 1.1, 1] : 1 }}
          transition={{ duration: 0.4 }}
          className="flex-shrink-0 p-2.5 bg-blue-500/20 rounded-xl border border-blue-400/40 
                     backdrop-blur-sm shadow-lg"
        >
          {isClicked ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Play className="w-5 h-5 text-blue-400 drop-shadow-sm" />
            </motion.div>
          ) : (
            <MousePointerClick className="w-5 h-5 text-blue-400 drop-shadow-sm" />
          )}
        </motion.div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white text-sm leading-tight tracking-tight mb-0.5">
            Manual Trigger
          </h3>
          <Badge className="text-xs bg-blue-500/20 text-blue-100 border-blue-400/30 h-5">
            On-Demand
          </Badge>
        </div>
      </div>

      {/* Action Button */}
      <div className="space-y-3">
        <Button
          onClick={handleTrigger}
          disabled={isClicked}
          size="lg"
          className="w-full h-12 bg-gradient-to-r from-blue-500/90 to-blue-600/90 
                     hover:from-blue-500 to-blue-600 text-white font-semibold shadow-2xl 
                     hover:shadow-blue/30 border-2 border-blue-400/50 rounded-xl 
                     backdrop-blur-sm transition-all duration-300 group/btn
                     disabled:opacity-50 disabled:cursor-not-allowed 
                     disabled:shadow-none hover:scale-[1.02] active:scale-[0.98]"
        >
          <motion.div
            className="flex items-center gap-2 w-full justify-center"
            animate={
              isClicked ? { scale: [1, 1.05, 1], opacity: [1, 0.8, 1] } : {}
            }
            transition={{ duration: 0.3 }}
          >
            {isClicked ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4"
                >
                  <Circle className="w-4 h-4 text-white/80" />
                </motion.div>
                Running...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 group-hover/btn:rotate-6 transition-transform" />
                Trigger Workflow
              </>
            )}
          </motion.div>
        </Button>

        {/* Status indicator */}
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400 font-medium flex items-center gap-1.5">
            <div
              className={`w-2 h-2 rounded-full ${isClicked ? "bg-green-400 animate-ping" : "bg-slate-500/50"}`}
            />
            Status
          </span>
          <Badge
            variant={isClicked ? "default" : "outline"}
            className={`text-xs h-4 ${isClicked ? "bg-green-500/20 text-green-100 border-green-400/30" : "border-slate-500/30 text-slate-400 bg-slate-500/10"}`}
          >
            {isClicked ? "Active" : "Ready"}
          </Badge>
        </div>
      </div>
    </motion.div>
  );
};

export default ManualTrigger;
