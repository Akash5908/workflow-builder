import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, MessageCircle, Key, Shield, Zap, Plus } from "lucide-react";
import { motion } from "framer-motion";
import config from "@/config";
import { EmailCred } from "./type/emailCred";
import { TelegramCred } from "./type/telegramCred";

export function CreateCredential() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
          <Button className="group relative h-14 px-8 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 shadow-xl border-emerald-600 text-white font-semibold rounded-2xl transition-all duration-300 hover:shadow-2xl">
            <Plus className="h-5 w-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
            Create Credential
            <div className="absolute inset-0 bg-white/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Button>
        </motion.div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px] p-0 bg-gradient-to-b from-slate-900/95 to-slate-800/95 backdrop-blur-2xl border-slate-700 shadow-2xl">
        {/* Header */}
        <div className="p-8 border-b border-slate-800">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl shadow-lg">
              <Key className="h-6 w-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-3xl font-bold text-slate-100">
                Create New Credential
              </DialogTitle>
              <DialogDescription className="text-slate-400 mt-1">
                Choose the service you want to connect
              </DialogDescription>
            </div>
          </div>
        </div>

        {/* Credential Cards */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <EmailCred />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <TelegramCred />
          </motion.div>
        </div>

        {/* Footer */}
        <div className="p-6 pt-0 border-t border-slate-800 bg-slate-900/50 backdrop-blur-sm rounded-b-2xl flex justify-center">
          <DialogClose asChild>
            <Button
              variant="outline"
              className="mt-6 h-12 px-8 border-slate-600 text-slate-700 hover:bg-slate-800 hover:border-slate-500 hover:text-slate-200 shadow-lg backdrop-blur-sm transition-all duration-200"
            >
              Cancel
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
