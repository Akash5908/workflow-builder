import { Badge } from "@/components/ui/badge";
import config from "@/config";
import {
  Position,
  Handle,
  useNodeConnections,
  useNodesData,
} from "@xyflow/react";
import axios, { AxiosError, isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Send, Mail, Loader2, CircleAlert } from "lucide-react";

interface Data {
  kind: string;
  type: string;
  metadata: {
    email: string;
    message: string;
    subject: string;
  };
}

const EmailAction = ({
  id,
  data,
  isConnectable,
}: {
  id: string;
  data: Data;
  isConnectable: boolean;
}) => {
  const [sendingMail, setSendingMail] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connections = useNodeConnections({
    id,
    handleType: "target",
  });
  const nodeData = useNodesData(connections[0]?.source)?.data;

  useEffect(() => {
    const handleSendMail = async () => {
      const { email, subject, message } = data.metadata;
      setSendingMail(true);
      setError(null);

      try {
        const res = await axios.post(
          `${config.serverApiUrl}/send-mail`,
          {
            recipentEmail: email,
            subject: subject,
            message: message,
          },
          {
            headers: {
              Authorization: `Bearer ${config.accessToken}`,
            },
          },
        );
        if (res.status === 200) {
          toast.success(res.data.message);
        }
      } catch (error: unknown) {
        if (isAxiosError(error)) {
          const err = error as AxiosError<{ error: string }>;
          const errorMsg = err.response?.data?.error || "Failed to send email";
          setError(errorMsg);
          toast.error(errorMsg);
        } else {
          setError("Unknown error occurred");
          toast.error("Unknown error occurred");
        }
      } finally {
        setSendingMail(false);
      }
    };

    if (nodeData?.value === true) {
      handleSendMail();
    }
  }, [nodeData, data.metadata, id]);

  const getStatusVariant = (): BadgeProps["variant"] => {
    if (sendingMail) return "default";
    if (error) return "destructive";
    return "outline";
  };

  const getStatusIcon = () => {
    if (sendingMail) return <Loader2 className="w-3 h-3 animate-spin mr-1" />;
    if (error) return <CircleAlert className="w-3 h-3 mr-1" />;
    return <Mail className="w-3 h-3 mr-1" />;
  };

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0.8 }}
      animate={{ scale: 1, opacity: 1 }}
      className="group relative bg-gradient-to-br from-orange-500/10 to-orange-600/5 
                 backdrop-blur-md border border-orange-500/40 shadow-xl rounded-xl p-4 
                 w-[240px] hover:shadow-orange/25 hover:border-orange-400/60 
                 transition-all duration-300 hover:-translate-y-0.5"
      style={{ minHeight: 120 }}
    >
      {/* Animated gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent 
                      to-red-500/5 rounded-xl opacity-0 group-hover:opacity-100 
                      transition-opacity duration-500"
      />

      {/* Input handle */}
      <Handle
        type="target"
        position={Position.Left}
        className="!w-3 !h-3 bg-orange-500 hover:bg-orange-400 
                   border-2 border-white/30 rounded-sm ring-2 ring-orange-500/40 
                   shadow-md hover:shadow-lg transition-all"
        isConnectable={isConnectable}
      />

      {/* Header */}
      <div className="flex items-start space-x-3 mb-4">
        <motion.div
          animate={{
            scale: sendingMail ? [1, 1.1, 1] : 1,
            backgroundColor: sendingMail ? "#f97316" : "#fed7aa",
          }}
          transition={{ duration: 0.4 }}
          className="flex-shrink-0 p-2.5 bg-orange-500/20 rounded-xl border border-orange-400/40 
                     backdrop-blur-sm shadow-lg"
        >
          <Send className="w-5 h-5 text-orange-400 drop-shadow-sm" />
        </motion.div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white text-sm leading-tight tracking-tight mb-0.5">
            Send Email
          </h3>
          <Badge className="text-xs bg-orange-500/20 text-orange-100 border-orange-400/30 h-5">
            Action
          </Badge>
        </div>
      </div>

      {/* Email preview */}
      <div className="space-y-2 mb-4">
        <div
          className="text-xs text-slate-300 truncate font-mono bg-slate-800/60 
                       border border-slate-700/50 rounded-lg px-3 py-2 backdrop-blur-sm 
                       shadow-inner group-hover:border-orange-500/40"
        >
          To: {data.metadata.email}
        </div>
        <div
          className="text-xs text-slate-400 truncate bg-slate-800/50 
                       border border-slate-700/30 rounded-lg px-3 py-1 backdrop-blur-sm"
        >
          "{data.metadata.subject}"
        </div>
      </div>

      {/* Status */}
      <div className="flex items-center justify-between pt-1">
        <Badge
          variant={getStatusVariant()}
          className={`text-xs h-6 flex items-center gap-1.5 px-2.5 ${
            sendingMail
              ? "bg-orange-500/20 text-orange-100 border-orange-400/30 animate-pulse"
              : error
                ? "bg-red-500/20 text-red-100 border-red-400/30"
                : "bg-emerald-500/20 text-emerald-100 border-emerald-400/30"
          }`}
        >
          {getStatusIcon()}
          {sendingMail ? "Sending..." : error ? "Failed" : "Ready"}
        </Badge>

        <div className="text-xs font-medium text-slate-400 flex items-center gap-1">
          <div
            className={`w-2 h-2 rounded-full transition-all ${
              sendingMail
                ? "bg-orange-400 animate-ping"
                : error
                  ? "bg-red-400 animate-pulse"
                  : "bg-emerald-400"
            }`}
          />
          {error && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-400 max-w-[140px] truncate"
              title={error}
            >
              {error.slice(0, 25)}...
            </motion.span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default EmailAction;
