import { Key, View } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Credential {
  port?: string;
  host?: string;
  user?: string;
  pass?: string;
  chatId?: string;
  botToken?: string;
  type: string;
}

type CredProp = Credential;

export const ViewCredComponent = ({ credData }: { credData: CredProp }) => {
  const credArray =
    credData.type === "SMTP"
      ? [
          { label: "Host", value: credData.host, key: "host-1" },
          { label: "Port", value: credData.port, key: "port-1" },
          { label: "User Email", value: credData.user, key: "user-1" },
          { label: "Password", value: credData.pass, key: "pass-1" },
        ]
      : [{ label: "Bot Token", value: credData.botToken, key: "token-1" }];

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Button className="group relative h-9 px-8 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 shadow-xl border-emerald-600 text-white font-semibold rounded-sm transition-all duration-300 hover:shadow-2xl">
              <View className="h-5 w-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
              View
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
          <div className=" grid grid-cols">
            {credArray.map((c) => (
              <div key={c.key} className="px-4">
                <Label htmlFor={c.label} className="text-white text-lg py-2">
                  {c.label}
                </Label>
                <Input
                  id={c.key}
                  type="text"
                  value={c.value}
                  className="h-10 text-white"
                />
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-6 pt-0 border-t border-slate-800 bg-slate-900/50 backdrop-blur-sm rounded-b-2xl flex justify-center">
            <DialogClose asChild>
              <Button
                variant="outline"
                className="w-full mt-6 h-12 px-8 border-slate-600 text-slate-700 hover:bg-slate-800 hover:border-slate-500 hover:text-slate-200 shadow-lg backdrop-blur-sm transition-all duration-200"
              >
                Close
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
