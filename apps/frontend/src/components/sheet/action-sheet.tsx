import {
  Sheet,
  SheetHeader,
  SheetTitle,
  SheetContent,
  SheetFooter,
  SheetClose,
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
import { Input } from "../ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "lucide-react";
import {
  Mail,
  MessageCircle,
  Send,
  Zap,
  Download,
  AlertTriangle,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  SUPPORTED_ACTIONS,
  type ActionProp,
  type NodeProp,
} from "common/types";

export const ActionSheet = ({
  onSelect,
  toggleSheet,
  setToggleSheet,
}: {
  onSelect: (item: NodeProp) => void;
  toggleSheet: boolean;
  setToggleSheet: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [selectedAction, setSelectedAction] = useState<ActionProp>();
  const [metaData, setMetaData] = useState({
    email: "",
    message: "",
    subject: "",
    chatID: "",
  });

  function handleClose() {
    setToggleSheet(false);
    setSelectedAction(undefined);
    setMetaData({ email: "", message: "", subject: "", chatID: "" });
  }

  function handleSelect(value: string) {
    const data = SUPPORTED_ACTIONS.find((item) => item.title === value);
    if (!data) return;
    setSelectedAction({
      id: data.id,
      data: {
        kind: data.title,
        type: "target",
        metadata: {
          email: metaData.email,
          message: metaData.message,
          subject: metaData.subject,
        },
      },
    });
  }

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newEmail = e.target.value;
    setMetaData((prev) => ({ ...prev, email: newEmail }));
  }

  function handleMessageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newMessage = e.target.value;

    setMetaData((prev) => ({
      ...prev,
      message: newMessage,
    }));

    setSelectedAction((prev) => {
      if (!prev) return;
      return {
        ...prev,
        ...metaData,
        message: newMessage,
      };
    });
  }

  function handleSubjectChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newSubject = e.target.value;

    setMetaData((prev) => ({
      ...prev,
      subject: newSubject,
    }));

    setSelectedAction((prev) => {
      if (!prev) return;
      return {
        ...prev,
        ...metaData,
        subject: newSubject,
      };
    });
  }

  function handleChatIDChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newChatID = e.target.value;

    setMetaData((prev) => ({
      ...prev,
      chatID: newChatID,
    }));

    setSelectedAction((prev) => {
      if (!prev) return;
      return {
        ...prev,
        ...metaData,
        subject: newChatID,
      };
    });
  }

  const typeMetadata = (type: string) => {
    if (type === "Email") {
      return {
        email: metaData.email,
        subject: metaData.subject,
        message: metaData.message,
      };
    } else if (type === "Telegram") {
      return {
        chatID: metaData.chatID,
        message: metaData.message,
      };
    }
  };

  function handleSubmit() {
    if (selectedAction) {
      onSelect({
        id: selectedAction.id,
        data: {
          type: selectedAction.data.type,
          kind: selectedAction.data.kind,
          metadata: typeMetadata(selectedAction.data.kind),
        },
      });
      handleClose();
    }
  }

  const GetActionIcon = ({ title }: { title: string }) => {
    switch (title) {
      case "Email":
        return <Mail className="h-4 w-6 text-white" />;
      case "Telegram":
        return <MessageCircle className="h-4 w-6 text-white" />;
      case "Download":
        return <Download className="h-4 w-6 text-white" />;
      case "Webhook":
        return <Zap className="h-4 w-6 text-white" />;
      default:
        return <Send className="h-4 w-6 text-white" />;
    }
  };

  const getActionColor = (title: string) => {
    switch (title) {
      case "Email":
        return "from-orange-500 to-orange-600";
      case "Telegram":
        return "from-blue-500 to-blue-600";
      case "Download":
        return "from-green-500 to-green-600";
      case "Webhook":
        return "from-purple-500 to-purple-600";
      default:
        return "from-slate-500 to-slate-600";
    }
  };

  const isFormValid =
    selectedAction &&
    (selectedAction.data.kind !== "Email" ||
      (metaData.email && metaData.message && metaData.subject));

  return (
    <Sheet open={toggleSheet} onOpenChange={setToggleSheet}>
      <SheetContent className="w-[450px] max-w-[95vw] p-0 sm:p-6 bg-gradient-to-b from-slate-50 to-white border border-slate-200 shadow-2xl">
        {/* Header */}
        <div className="p-6 pb-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl shadow-lg">
              <Send className="h-6 w-6 text-white" />
            </div>
            <div>
              <SheetTitle className="text-2xl font-bold text-slate-900 mb-1">
                Add Action
              </SheetTitle>
              <SheetDescription className="text-slate-600">
                Choose the automation step to execute
              </SheetDescription>
            </div>
          </div>
        </div>

        {/* Action Selection */}
        <div className="px-6 space-y-6">
          <div>
            <label className="text-sm font-semibold text-slate-900 mb-3 block">
              Action Type
            </label>
            <Select
              value={selectedAction?.data.kind}
              onValueChange={handleSelect}
            >
              <SelectTrigger className="w-full h-14 rounded-2xl border-2 border-slate-200 hover:border-slate-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 shadow-sm">
                <SelectValue placeholder="Select an action..." />
              </SelectTrigger>
              <SelectContent className="w-full p-2 bg-white border border-slate-200 rounded-2xl shadow-xl">
                <SelectGroup>
                  <SelectLabel className="font-semibold text-slate-800 py-3">
                    Automation Actions
                  </SelectLabel>
                  {SUPPORTED_ACTIONS.map((item) => {
                    return (
                      <SelectItem
                        key={item.id}
                        value={item.title}
                        className="h-14 rounded-xl hover:bg-emerald-50 focus:bg-emerald-50 p-3 flex items-center gap-3 text-lg cursor-pointer transition-all"
                      >
                        <div
                          className={`p-2 rounded-xl bg-gradient-to-br ${getActionColor(item.title)} shadow-sm`}
                        >
                          <GetActionIcon title={item.title} />
                        </div>
                        <span className="font-medium text-slate-900">
                          {item.title}
                        </span>
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {/* Configuration Form */}
          {selectedAction?.data.kind === "Email" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="space-y-4"
            >
              <Card className="border-2 border-orange-100 bg-gradient-to-r from-orange-50 to-orange-25 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg text-orange-900 mb-4 flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Email Configuration
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-2 block">
                        Recipient Email
                      </label>
                      <Input
                        type="email"
                        placeholder="user@example.com"
                        value={metaData.email}
                        onChange={handleEmailChange}
                        className="h-12 rounded-xl border-orange-200 focus:border-orange-500 focus:ring-orange-200 shadow-sm"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-2 block">
                        Subject
                      </label>
                      <Input
                        type="text"
                        placeholder="Enter your subject..."
                        value={metaData.subject}
                        onChange={handleSubjectChange}
                        className="h-12 rounded-xl border-orange-200 focus:border-orange-500 focus:ring-orange-200 shadow-sm"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-2 block">
                        Message Content
                      </label>
                      <Input
                        type="text"
                        placeholder="Enter your message..."
                        value={metaData.message}
                        onChange={handleMessageChange}
                        className="h-12 rounded-xl border-orange-200 focus:border-orange-500 focus:ring-orange-200 shadow-sm"
                      />
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <Badge className="bg-orange-100 text-orange-800 border-orange-200 text-xs">
                        Sends to: {metaData.email || "No email selected"}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="text-xs border-slate-300"
                      >
                        Message: {metaData.message.length || 0}/500 chars
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
          {selectedAction?.data.kind === "Telegram" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="space-y-4"
            >
              <Card className="border-2 border-orange-100 bg-gradient-to-r from-orange-50 to-orange-25 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg text-orange-900 mb-4 flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Telegram Configuration
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-2 block">
                        Chat ID
                      </label>
                      <Input
                        type="chatID"
                        placeholder="user@example.com"
                        value={metaData.chatID}
                        onChange={handleChatIDChange}
                        className="h-12 rounded-xl border-orange-200 focus:border-orange-500 focus:ring-orange-200 shadow-sm"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-2 block">
                        Message Content
                      </label>
                      <Input
                        type="text"
                        placeholder="Enter your message..."
                        value={metaData.message}
                        onChange={handleMessageChange}
                        className="h-12 rounded-xl border-orange-200 focus:border-orange-500 focus:ring-orange-200 shadow-sm"
                      />
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <Badge className="bg-orange-100 text-orange-800 border-orange-200 text-xs">
                        Sends to: {metaData.chatID || "No chatBot selected"}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="text-xs border-slate-300"
                      >
                        Message: {metaData.message.length || 0}/500 chars
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
          {/* Action Preview
          {selectedAction && !selectedAction.data.kind?.includes("Email") && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-emerald-50 border-2 border-emerald-100 rounded-2xl shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`p-3 rounded-2xl bg-gradient-to-br ${getActionColor(selectedAction.data.kind)} shadow-lg`}
                >
                  <GetActionIcon title={selectedAction.data.kind} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-xl text-slate-900 mb-2">
                    {selectedAction.data.kind} Action
                  </h3>
                  <p className="text-sm text-slate-600 mb-4">
                    Ready to execute when triggered
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-emerald-100 text-emerald-800">
                      Ready
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Input: data
                    </Badge>
                  </div>
                </div>
              </div>
            </motion.div>
          )} */}
        </div>

        {/* Footer */}
        <SheetFooter className="p-6 pt-0 border-t  border-slate-200 bg-slate-50/50 backdrop-blur-sm rounded-b-2xl">
          <div className="flex w-full gap-3 mt-6">
            <Button
              variant="outline"
              className="h-14 px-6 flex-1 border-slate-200 hover:bg-slate-50 shadow-md rounded-xl"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!isFormValid}
              className="h-14 px-8 flex-1 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-xl rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
            >
              <Zap className="h-5 w-5" />
              Create Action
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
