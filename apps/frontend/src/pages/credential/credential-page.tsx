import { CreateCredential } from "@/components/credential/createCredential";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BadgeCheck, Key, Calendar, Trash2, ChevronRight } from "lucide-react";
import { useCredential } from "@/hooks/useCredential";
import { motion } from "framer-motion";
import { ViewCredComponent } from "@/components/credential/viewCredComponent";
import { useState } from "react";

const CredentialPage = () => {
  const [toggle, setToggle] = useState(false);
  const { creds } = useCredential();
  const handleToggle = () => {
    setToggle((prev: boolean) => !prev);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen py-12 px-6 lg:px-12 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto mb-12"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-2xl">
              <Key className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent">
                Credentials
              </h1>
              <p className="text-xl text-slate-400 mt-1">
                Manage your API keys & tokens
              </p>
            </div>
          </div>
          <CreateCredential toggle={toggle} setToggle={handleToggle} />
        </div>
      </motion.div>

      {/* Credentials Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="max-w-6xl mx-auto"
      >
        <Card className="border-0 bg-slate-800/70 backdrop-blur-md border-slate-700 shadow-2xl">
          <CardHeader className="pb-6">
            <div className="flex items-center gap-3">
              <BadgeCheck className="h-6 w-6 text-emerald-400" />
              <div>
                <h2 className="text-2xl font-bold text-slate-100">
                  {creds?.length || 0} Credentials
                </h2>
                <p className="text-sm text-slate-500">
                  {creds !== undefined && creds.length > 0
                    ? `${creds?.length} credential${creds?.length !== 1 ? "s" : ""} found`
                    : "No credentials created yet"}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-b-2 border-slate-700/50 bg-slate-800/30 backdrop-blur-sm">
                    <TableHead className="w-[200px] font-semibold text-slate-300 text-left">
                      Name
                    </TableHead>
                    <TableHead className="w-[150px] font-semibold text-slate-300 text-left">
                      Type
                    </TableHead>
                    <TableHead className="w-[200px] font-semibold text-slate-300 text-left">
                      Created
                    </TableHead>
                    <TableHead className="w-[140px] font-semibold text-slate-300 text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                {creds !== null && creds !== undefined && creds.length > 0 ? (
                  creds.map((c) => (
                    <TableBody>
                      <TableRow className="hover:bg-slate-700/50 w-full border-b border-slate-700/50 transition-all duration-200 group h-16 data-[state=selected]:bg-slate-700">
                        {/* Name */}
                        <TableCell className="font-semibold text-slate-200 group-hover:text-white pr-4 w-[200px]">
                          <div className="flex items-center gap-3 w-full">
                            <div className="p-2 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-xl border border-blue-500/30">
                              <Key className="h-4 w-4 text-blue-400" />
                            </div>
                            <span className="truncate">{c.name}</span>
                          </div>
                        </TableCell>

                        {/* Type */}
                        <TableCell className="pr-4">
                          <Badge
                            className={`px-3 py-1 text-xs font-medium border capitalize ${
                              c.type === "api"
                                ? "bg-blue-900/50 text-blue-300 border-blue-500/50"
                                : "bg-purple-900/50 text-purple-300 border-purple-500/50"
                            }`}
                          >
                            {c.type}
                          </Badge>
                        </TableCell>

                        {/* Date */}
                        <TableCell className="text-sm text-slate-400 pr-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-slate-500 flex-shrink-0" />
                            <span>{formatDate(c.createdAt)}</span>
                          </div>
                        </TableCell>

                        {/* Actions */}
                        <TableCell className="text-right py-4 pr-6">
                          <div className="flex items-center gap-2 justify-end">
                            <ViewCredComponent credData={c} />

                            <Button
                              size="sm"
                              variant="destructive"
                              className="h-9 px-4 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 shadow-lg border-rose-600 text-white"
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="h-96 text-center py-20 text-slate-500"
                    >
                      <div className="max-w-md mx-auto space-y-4">
                        <div className="p-8 bg-slate-800/50 rounded-3xl shadow-2xl border border-slate-700 mx-auto w-28 h-28 flex items-center justify-center">
                          <Key className="h-12 w-12 text-slate-600" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold mb-2 text-slate-300">
                            No credentials yet
                          </h3>
                          <p className="text-slate-500">
                            Add your first API key or token to get started.
                          </p>
                        </div>
                        <CreateCredential />
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default CredentialPage;
