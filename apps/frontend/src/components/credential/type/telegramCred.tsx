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
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Key, Hash, Lock, Zap, Bot } from "lucide-react";
import { motion } from "framer-motion";
import config from "@/config";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "sonner";

interface TelegramCred {
  token: string;
  chatId: string;
}

export function TelegramCred() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<TelegramCred>({
    chatId: "",
    token: "",
  });
  const [loading, setLoading] = useState(false);

  // Fixed: Actually send the form data!
  const createCredential = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${config.serverApiUrl}/credential`,
        {
          name: "Telegram",
          type: "telegram",
          token: formData.token,
          chatId: formData.chatId,
        },
        {
          headers: {
            Authorization: `Bearer ${config.accessToken}`,
          },
        },
      );

      if (res.status === 200) {
        toast.success("Telegram credential created successfully!");
        setOpen(false);
        setFormData({ token: "", chatId: "" });
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const err = error as AxiosError<{ error: string }>;
        toast.error(err.response?.data?.error || "Credential creation failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange =
    (field: keyof TelegramCred) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button className="group h-48 w-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-500/20 to-blue-600/20 hover:from-blue-500/30 hover:to-blue-600/30 border-2 border-blue-500/30 hover:border-blue-500/50 shadow-xl hover:shadow-2xl transition-all duration-300 text-blue-300 hover:text-blue-200 font-medium rounded-2xl backdrop-blur-sm">
            <MessageCircle className="h-12 w-12 mb-3 opacity-80 group-hover:opacity-100 group-hover:rotate-6 transition-all" />
            <span className="text-lg font-semibold">Telegram</span>
            <p className="text-xs text-blue-400 mt-1">Bot API</p>
          </Button>
        </motion.div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[450px] p-0 bg-gradient-to-b from-slate-900/95 to-slate-800/95 backdrop-blur-2xl border-slate-700 shadow-3xl max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="p-8 border-b border-slate-800/50">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-xl">
              <Bot className="h-7 w-7 text-white" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-slate-100">
                Telegram Bot Setup
              </DialogTitle>
              <DialogDescription className="text-slate-400">
                Enter your bot token and chat ID
              </DialogDescription>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="p-8 space-y-6">
          <div className="space-y-4">
            {/* Chat ID */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                <Hash className="h-4 w-4" />
                Chat ID
              </Label>
              <Input
                placeholder="-1001234567890"
                value={formData.chatId}
                onChange={handleInputChange("chatId")}
                className="h-12 bg-slate-800/50 border-slate-700 hover:border-slate-600 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl text-slate-200 placeholder-slate-500"
              />
              <p className="text-xs text-slate-500 mt-1">
                Use @userinfobot or /getUpdates
              </p>
            </div>

            {/* Token */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                <Key className="h-4 w-4" />
                Bot Token
              </Label>
              <Input
                placeholder="1234567890:ABCdefGHIjklMNOpqrsTUVwxyz"
                value={formData.token}
                onChange={handleInputChange("token")}
                className="h-12 bg-slate-800/50 border-slate-700 hover:border-slate-600 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl text-slate-200 placeholder-slate-500"
              />
              <p className="text-xs text-slate-500 mt-1">
                Get from @BotFather → /newbot → /token
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 pt-0 border-t border-slate-800/50 bg-slate-900/50 backdrop-blur-sm rounded-b-2xl flex gap-3 justify-end">
          <DialogClose asChild>
            <Button
              variant="outline"
              className="h-12 px-8 border-slate-600/50 text-slate-400 hover:bg-slate-800/50 hover:border-slate-500 hover:text-slate-200 shadow-lg backdrop-blur-sm transition-all"
              disabled={loading}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={createCredential}
            disabled={loading || !formData.chatId || !formData.token}
            className="h-12 px-8 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-xl border-blue-600 text-white font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Zap className="h-4 w-4" />
                Create Credential
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
