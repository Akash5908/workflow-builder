import {
  Sheet,
  SheetTitle,
  SheetContent,
  SheetFooter,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Zap,
  PlayCircle,
  Clock,
  MousePointer,
  Calendar,
  MessageCircle,
} from "lucide-react";
import { useState } from "react";
import { SUPPORTED_TRIGGERS, type NodeProp } from "common/types";
import { motion } from "framer-motion";

export const TriggerSheet = ({
  onSelect,
  toggleSheet,
  setToggleSheet,
}: {
  onSelect: (item: NodeProp) => void;
  toggleSheet: boolean;
  setToggleSheet: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [selectedTrigger, setSelectedTrigger] = useState<NodeProp>();

  function handleClose() {
    setToggleSheet(false);
    setSelectedTrigger(undefined);
  }

  function handleSelect(value: string) {
    const data = SUPPORTED_TRIGGERS.find((item) => item.title === value);
    if (!data) return;
    setSelectedTrigger({
      id: data.id,
      data: {
        kind: data.title,
        type: "trigger",
      },
    });
  }

  function handleSubmit() {
    if (selectedTrigger) {
      onSelect(selectedTrigger);
      handleClose();
    }
  }

  const GetTriggerIcon = ({ title }: { title: string }) => {
    switch (title) {
      case "Manual":
        return <MousePointer className="h-4 w-6 text-white" />;
      case "Schedule":
        return <Clock className="h-6 w-6 text-white" />;
      case "Webhook":
        return <Zap className="h-6 w-6 text-white" />;
      case "Form":
        return <PlayCircle className="h-6 w-6 text-white" />;
      case "Message":
        return <MessageCircle className="h-6 w-6 text-white" />;
      case "Date":
        return <Calendar className="h-6 w-6 text-white" />;
      default:
        return <Zap className="h-6 w-6 text-white" />;
    }
  };

  const getTriggerColor = (title: string) => {
    switch (title) {
      case "Manual":
        return "bg-blue-500";
      case "Schedule":
        return "bg-emerald-500";
      case "Webhook":
        return "bg-purple-500";
      case "Form":
        return "bg-orange-500";
      case "Message":
        return "bg-pink-500";
      case "Date":
        return "bg-indigo-500";
      default:
        return "bg-slate-500";
    }
  };

  return (
    <Sheet open={toggleSheet} onOpenChange={setToggleSheet}>
      <SheetContent className="w-[425px] max-w-[90vw] p-0 sm:p-6 bg-gradient-to-b from-slate-50 to-white border border-slate-200 shadow-2xl">
        {/* Header Card */}
        <Card className="border-0 shadow-none bg-transparent">
          <CardContent className="py-6 pb-2 pt-2">
            <div className="flex items-center gap-3 mb-0">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <SheetTitle className="text-2xl font-bold text-slate-900 mb-1">
                  Add Trigger
                </SheetTitle>
                <SheetDescription className="text-slate-600">
                  Choose what starts your workflow
                </SheetDescription>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trigger Selection */}
        <div className="py-2 px-6 space-y-4">
          <div>
            <label className="text-sm font-semibold text-slate-900 mb-3 block">
              Select Trigger Type
            </label>
            <Select
              value={selectedTrigger?.data.kind}
              onValueChange={handleSelect}
            >
              <SelectTrigger className="w-full h-14 rounded-2xl border-2 border-slate-200 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 shadow-sm">
                <SelectValue
                  placeholder={
                    <span className="flex items-center gap-2">
                      <PlayCircle className="h-4 w-4 text-slate-400" />
                      Choose a trigger to get started
                    </span>
                  }
                />
              </SelectTrigger>
              <SelectContent className="w-full p-2 bg-white border border-slate-200 rounded-2xl shadow-xl">
                <SelectGroup>
                  <SelectLabel className="font-semibold text-slate-800 py-3">
                    Available Triggers
                  </SelectLabel>
                  {SUPPORTED_TRIGGERS.map((item) => (
                    <SelectItem
                      key={item.id}
                      value={item.title}
                      className="h-14 rounded-xl hover:bg-blue-50 focus:bg-blue-50 text-lg flex items-center gap-3 p-3 cursor-pointer transition-all duration-150"
                    >
                      <div
                        className={`p-2 rounded-xl ${getTriggerColor(item.title)}`}
                      >
                        <GetTriggerIcon title={item.title} />
                      </div>
                      <span className="font-medium text-slate-900">
                        {item.title}
                      </span>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Preview Card */}
          {selectedTrigger && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-100 rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`p-3 rounded-2xl ${getTriggerColor(selectedTrigger.data.kind)} shadow-lg`}
                >
                  <GetTriggerIcon title={selectedTrigger.data.kind} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-xl text-slate-900 mb-1 truncate">
                    {selectedTrigger.data.kind} Trigger
                  </h3>
                  <p className="text-sm text-slate-600 mb-2">
                    This trigger will start your workflow when activated
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-100 text-blue-800 border-blue-200 text-xs">
                      Ready to connect
                    </Badge>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Footer */}
        <SheetFooter className="p-6 pt-0 border-t border-slate-200 bg-slate-50/50 backdrop-blur-sm rounded-b-2xl">
          <div className="flex w-full gap-3 mt-6">
            <Button
              variant="outline"
              className="h-12 px-6 flex-1 border-slate-200 hover:bg-slate-50 shadow-md transition-all duration-200"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!selectedTrigger}
              className="h-12 px-8 flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none transition-all duration-200"
            >
              <Zap className="h-5 w-5 mr-2" />
              Create Trigger
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
