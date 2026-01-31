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
  data: Data;
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
                 backdrop-blur-md border border-emerald-500/40 shadow-xl rounded-xl p-4 
                 w-[240px] hover:shadow-emerald/25 hover:border-emerald-400/60 
                 transition-all duration-300 hover:-translate-y-0.5"
      style={{ minHeight: 120 }}
    >
      {/* Animated gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent 
                      to-cyan-500/5 rounded-xl opacity-0 group-hover:opacity-100 
                      transition-opacity duration-500"
      />

      {/* Output handle - enhanced */}
      <Handle
        type="source"
        position={Position.Right}
        className="!w-3 !h-3 bg-emerald-500 hover:bg-emerald-400 
                   border-2 border-white/30 rounded-sm ring-2 ring-emerald-500/40 
                   shadow-md hover:shadow-lg transition-all"
        isConnectable={isConnectable}
      />

      {/* Header with icon */}
      <div className="flex items-start space-x-3 mb-3">
        <motion.div
          animate={{ rotate: copy ? 360 : 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex-shrink-0 p-2.5 bg-emerald-500/20 rounded-xl border border-emerald-400/40 
                     backdrop-blur-sm shadow-lg"
        >
          <Zap className="w-5 h-5 text-emerald-400 drop-shadow-sm" />
        </motion.div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white text-sm leading-tight tracking-tight mb-0.5">
            Webhook Trigger
          </h3>
          <Badge className="text-xs bg-emerald-500/20 text-emerald-100 border-emerald-400/30 h-5">
            Instant
          </Badge>
        </div>
      </div>

      {/* URL preview & copy */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-slate-400" />
            Endpoint
          </span>
          {/* <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}> */}
          <div
            // size="sm"
            // variant="ghost"
            className="h-7 w-7 p-0 bg-white/10 hover:bg-white/20 flex justify-center items-center 
                       border-white/20 text-slate-300 hover:text-emerald-300 
                       shadow-md hover:shadow-emerald/20 rounded-lg transition-all z-40"
          >
            {copy ? (
              <CopyCheck className="w-3.5 h-3.5" />
            ) : (
              <Copy className="w-3.5 h-3.5 z-50 " onClick={handleCopyUrl} />
            )}
          </div>
          {/* </motion.div> */}
        </div>

        {/* Truncated URL preview */}
        <div
          className="bg-slate-800/60 hover:bg-slate-800/80 border border-slate-700/50 
                       rounded-lg px-3 py-2 backdrop-blur-sm shadow-inner transition-colors
                       group-hover:border-emerald-500/40"
        >
          <div className="flex items-center gap-2 text-xs font-mono text-slate-300 truncate">
            <Link2 className="w-3 h-3 flex-shrink-0 text-slate-500" />
            <span className="truncate">
              /webhook/{data.workflowId.slice(-8)}
            </span>
          </div>
        </div>
      </div>

      {/* Status footer */}
      <div className="absolute bottom-2 right-2 text-xs text-emerald-400 font-medium flex items-center gap-1">
        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
        Ready
      </div>
    </motion.div>
  );
};

export default WebhookTrigger;
