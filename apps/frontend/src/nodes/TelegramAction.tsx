import { Badge } from "@/components/ui/badge";
// import {BadgePo}

import { Telegram } from "@/hooks/useTelegram";
import {
  Position,
  Handle,
  useNodeConnections,
  useNodesData,
} from "@xyflow/react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  MessageCircle,
  Send,
  Loader2,
  CircleAlert,
  Paperclip,
} from "lucide-react";

interface Data {
  kind: string;
  type: string;
  metadata: {
    chatID: string;
    message: string;
  };
}

const TelegramAction = ({
  id,
  data,
  isConnectable,
}: {
  id: string;
  data: Data;
  isConnectable: boolean;
}) => {
  const connections = useNodeConnections({
    id,
    handleType: "target",
  });
  const nodeData = useNodesData(connections[0]?.source)?.data;
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { sendMessage } = Telegram();

  useEffect(() => {
    const triggerMessage = async () => {
      setSending(true);
      setError(null);
      try {
        await sendMessage(data.metadata.chatID, data.metadata.message);
      } finally {
        setSending(false);
      }
    };

    if (nodeData?.value === true) {
      triggerMessage();
    }
  }, [nodeData, data.metadata.chatID, data.metadata.message]);

  const getStatusVariant = () => {
    if (sending) return "default";
    if (error) return "destructive";
    return "outline";
  };

  const getStatusIcon = () => {
    if (sending) return <Loader2 className="w-3 h-3 animate-spin mr-1" />;
    if (error) return <CircleAlert className="w-3 h-3 mr-1" />;
    return <MessageCircle className="w-3 h-3 mr-1" />;
  };

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0.8 }}
      animate={{ scale: 1, opacity: 1 }}
      className="group relative bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-purple-500/10 
                 backdrop-blur-md border border-blue-500/40 shadow-xl rounded-xl p-4 
                 w-[240px] hover:shadow-blue/25 hover:border-blue-400/60 
                 transition-all duration-300 hover:-translate-y-0.5"
      style={{ minHeight: 120 }}
    >
      {/* Animated gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent 
                      to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 
                      transition-opacity duration-500"
      />

      {/* Input handle */}
      <Handle
        type="target"
        position={Position.Left}
        className="!w-3 !h-3 bg-blue-500 hover:bg-blue-400 
                   border-2 border-white/30 rounded-sm ring-2 ring-blue-500/40 
                   shadow-md hover:shadow-lg transition-all"
        isConnectable={isConnectable}
      />

      {/* Header */}
      <div className="flex items-start space-x-3 mb-4">
        <motion.div
          animate={{
            scale: sending ? [1, 1.1, 1] : 1,
            backgroundColor: sending ? "#3b82f6" : "#93c5fd",
          }}
          transition={{ duration: 0.4 }}
          className="flex-shrink-0 p-2.5 bg-blue-500/20 rounded-xl border border-blue-400/40 
                     backdrop-blur-sm shadow-lg"
        >
          <Send className="w-5 h-5 text-blue-400 drop-shadow-sm" />
        </motion.div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white text-sm leading-tight tracking-tight mb-0.5">
            Send Telegram Message
          </h3>
          <Badge className="text-xs bg-blue-500/20 text-blue-100 border-blue-400/30 h-5">
            Messaging
          </Badge>
        </div>
      </div>

      {/* Message preview */}
      <div className="space-y-2 mb-4">
        <div
          className="text-xs text-slate-300 font-mono bg-slate-800/60 
                       border border-slate-700/50 rounded-lg px-3 py-2 backdrop-blur-sm 
                       shadow-inner group-hover:border-blue-500/40 truncate max-h-12 overflow-hidden"
        >
          <div className="flex items-center gap-2 mb-1">
            <Paperclip className="w-3 h-3 text-blue-400 flex-shrink-0" />
            <span className="text-slate-400">Chat ID:</span>
            <span className="font-mono truncate">`{data.metadata.chatID}`</span>
          </div>
          <div>
            <span className="text-slate-400">Message:</span>
            <p className="mt-1 text-slate-300 font-normal break-words line-clamp-2">
              {data.metadata.message}
            </p>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="flex items-center justify-between pt-1">
        <Badge
          variant={getStatusVariant()}
          className={`text-xs h-6 flex items-center gap-1.5 px-2.5 ${
            sending
              ? "bg-blue-500/20 text-blue-100 border-blue-400/30 animate-pulse"
              : error
                ? "bg-red-500/20 text-red-100 border-red-400/30"
                : "bg-emerald-500/20 text-emerald-100 border-emerald-400/30"
          }`}
        >
          {getStatusIcon()}
          {sending ? "Sending..." : error ? "Failed" : "Ready"}
        </Badge>

        <div className="text-xs font-medium text-slate-400 flex items-center gap-1">
          <div
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              sending
                ? "bg-blue-400 animate-ping"
                : error
                  ? "bg-red-400 animate-pulse"
                  : "bg-emerald-400"
            }`}
          />
          {error && (
            <span className="text-red-400 text-xs truncate max-w-[100px]">
              {error}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TelegramAction;
