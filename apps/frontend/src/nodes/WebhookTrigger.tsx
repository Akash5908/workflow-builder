import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import config from "@/config";
import { Position, Handle } from "@xyflow/react";
import { Copy, CopyCheck, Zap, Globe, Link2 } from "lucide-react";
import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface Data {
  kind: string;
  value: string;
  workflowId: string;
}

const WebhookTrigger = ({
  id,
  data,
  isConnectable,
}: {
  id: string;
  Data;
  isConnectable: boolean;
}) => {
  const [copy, setCopy] = useState(false);

  const handleCopyUrl = useCallback(async () => {
    const url = `${config.serverApiUrl}/webhook/${data.workflowId}`;
    setCopy(true);
    await navigator.clipboard.writeText(url);
    toast.success("Webhook URL copied!");
    setTimeout(() => setCopy(false), 2000);
  }, [data.workflowId]);

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0.8 }}
      animate={{ scale: 1, opacity: 1 }}
      className="group relative bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 
                 backdrop-blur-md border border-emerald-500/40 shadow-lg rounded-lg p-3 
                 w-[160px] hover:shadow-emerald/25 hover:border-emerald-400/60 
                 transition-all duration-300 hover:-translate-y-0.5"
      style={{ minHeight: 96 }}
    >
      {/* Animated gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent 
                      to-cyan-500/5 rounded-lg opacity-0 group-hover:opacity-100 
                      transition-opacity duration-500"
      />

      {/* Output handle */}
      <Handle
        type="source"
        position={Position.Right}
        className="!w-2.5 !h-2.5 bg-emerald-500 hover:bg-emerald-400 
                   border-2 border-white/30 rounded-sm ring-1 ring-emerald-500/40 
                   shadow-md hover:shadow-lg transition-all"
        isConnectable={isConnectable}
      />

      {/* Header - Compact */}
      <div className="flex items-start space-x-2 mb-2">
        <motion.div
          animate={{ rotate: copy ? 360 : 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex-shrink-0 p-1.5 bg-emerald-500/20 rounded-lg border border-emerald-400/40 
                     backdrop-blur-sm shadow-md"
        >
          <Zap className="w-3 h-3 text-emerald-400" />
        </motion.div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white text-xs leading-tight tracking-tight mb-0.5">
            Webhook
          </h3>
          <Badge className="text-[9px] bg-emerald-500/20 text-emerald-100 border-emerald-400/30 h-4 px-1.5">
            Instant
          </Badge>
        </div>
      </div>

      {/* URL preview & copy - Compact */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-medium text-slate-300 flex items-center gap-1">
            <Globe className="w-3 h-3 text-slate-400" />
            Endpoint
          </span>
          <div
            className=" flex justify-center items-center h-6 w-6 p-0 bg-white/10 hover:bg-white/20 border-white/20 
                     text-slate-300 hover:text-emerald-300 shadow-md hover:shadow-emerald/20 
                     rounded-md transition-all text-xs z-30"
          >
            {copy ? (
              <CopyCheck className="w-3 h-3" />
            ) : (
              <Copy className="w-3 h-3" onClick={handleCopyUrl} />
            )}
          </div>
        </div>

        {/* Truncated URL preview */}
        <div
          className="bg-slate-800/60 hover:bg-slate-800/80 border border-slate-700/50 
                       rounded-md px-2 py-1.5 backdrop-blur-sm shadow-inner transition-colors
                       group-hover:border-emerald-500/40 text-[10px]"
        >
          <div className="flex items-center gap-1 text-xs font-mono text-slate-300 truncate">
            <Link2 className="w-2.5 h-2.5 flex-shrink-0 text-slate-500" />
            <span className="truncate">
              /webhook/{data.workflowId.slice(-8)}
            </span>
          </div>
        </div>
      </div>

      {/* Status footer */}
      <div className="absolute bottom-1.5 right-1.5 text-[10px] text-emerald-400 font-medium flex items-center gap-0.5">
        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
        Ready
      </div>
    </motion.div>
  );
};

export default WebhookTrigger;
