import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Shield, Lock, Server, User, Zap } from "lucide-react";
import { motion } from "framer-motion";
import config from "@/config";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "sonner";

interface EmailCred {
  port: string;
  host: string;
  user: string;
  pass: string;
}

export function EmailCred() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<EmailCred>({
    port: "",
    host: "",
    user: "",
    pass: "",
  });
  const [loading, setLoading] = useState(false);

  const createCredential = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${config.serverApiUrl}/credential`,
        {
          credential: {
            name: "Email",
            type: "SMTP",
            port: Number(formData.port),
            host: formData.host,
            user: formData.user,
            pass: formData.pass,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${config.accessToken}`,
          },
        },
      );

      if (res.status === 200) {
        toast.success("Email credential created successfully!");
        setOpen(false);
        setFormData({ port: "", host: "", user: "", pass: "" });
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
    (field: keyof EmailCred) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button className="group h-48 w-full flex flex-col items-center justify-center bg-gradient-to-br from-orange-500/20 to-orange-600/20 hover:from-orange-500/30 hover:to-orange-600/30 border-2 border-orange-500/30 hover:border-orange-500/50 shadow-xl hover:shadow-2xl transition-all duration-300 text-orange-300 hover:text-orange-200 font-medium rounded-2xl backdrop-blur-sm">
            <Mail className="h-12 w-12 mb-3 opacity-80 group-hover:opacity-100 group-hover:rotate-6 transition-all" />
            <span className="text-lg font-semibold">Email</span>
            <p className="text-xs text-orange-400 mt-1">SMTP Service</p>
          </Button>
        </motion.div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[450px] p-0 bg-gradient-to-b from-slate-900/95 to-slate-800/95 backdrop-blur-2xl border-slate-700 shadow-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-8 border-b border-slate-800/50">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-xl">
              <Mail className="h-7 w-7 text-white" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-slate-100">
                Email SMTP Setup
              </DialogTitle>
              <DialogDescription className="text-slate-400">
                Configure your SMTP server credentials
              </DialogDescription>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Host & Port */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                <Server className="h-4 w-4" />
                Host
              </Label>
              <Input
                placeholder="smtp.gmail.com"
                value={formData.host}
                onChange={handleInputChange("host")}
                className="h-12 bg-slate-800/50 border-slate-700 hover:border-slate-600 focus:border-orange-500 focus:ring-orange-500/20 rounded-xl text-slate-200 placeholder-slate-500"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Port
              </Label>
              <Input
                type="number"
                placeholder="587"
                value={formData.port}
                onChange={handleInputChange("port")}
                className="h-12 bg-slate-800/50 border-slate-700 hover:border-slate-600 focus:border-orange-500 focus:ring-orange-500/20 rounded-xl text-slate-200 placeholder-slate-500"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                <User className="h-4 w-4" />
                Username
              </Label>
              <Input
                placeholder="your-email@gmail.com"
                value={formData.user}
                onChange={handleInputChange("user")}
                className="h-12 bg-slate-800/50 border-slate-700 hover:border-slate-600 focus:border-orange-500 focus:ring-orange-500/20 rounded-xl text-slate-200 placeholder-slate-500"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Password
              </Label>
              <Input
                type="password"
                placeholder="••••••••"
                value={formData.pass}
                onChange={handleInputChange("pass")}
                className="h-12 bg-slate-800/50 border-slate-700 hover:border-slate-600 focus:border-orange-500 focus:ring-orange-500/20 rounded-xl text-slate-200 placeholder-slate-500"
              />
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
            disabled={
              loading ||
              !formData.host ||
              !formData.port ||
              !formData.user ||
              !formData.pass
            }
            className="h-12 px-8 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 shadow-xl border-orange-600 text-white font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
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
