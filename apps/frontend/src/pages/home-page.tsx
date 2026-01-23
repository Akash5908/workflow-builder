import useAuthStore from "@/lib/useAuthStore";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LayoutGrid, Play, Zap, Workflow, Users, Settings } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { user } = useAuthStore() as {
    user: {
      id: string;
      email: string;
      name: string;
    };
  };

  const stats = [
    {
      label: "Active Workflows",
      value: "0",
      icon: Workflow,
      href: "/workflows",
    },
    { label: "Executions", value: "0", icon: Play, href: "/executions" },
    { label: "Credentials", value: "2", icon: Settings, href: "/credentials" },
  ];

  return (
    <div className="min-h-screen bg-slate-900">
      {/* n8n-style grid background */}
      <div className="absolute inset-0 bg-grid-slate-800/20 [background-image:linear-gradient(rgba(255,255,255,.08),transparent_1px,transparent)] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_40%,black,transparent)]" />

      <div className="relative z-10">
        {/* Top Navigation - SIMPLIFIED */}
        <div className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Workflow className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-100 tracking-tight">
                    Workflow Builder
                  </h1>
                  <p className="text-sm text-slate-500">
                    Welcome back, {user?.name || user?.email}
                  </p>
                </div>
              </div>
              {/* REMOVED: Workflow & Credentials buttons */}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 bg-slate-800/50 backdrop-blur-sm px-6 py-2 rounded-xl border border-slate-700 mb-8"
            >
              <Zap className="h-5 w-5 text-emerald-400" />
              <span className="text-slate-300 font-medium">Ready to build</span>
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-100 via-slate-200 to-slate-300 bg-clip-text text-transparent mb-6 leading-tight">
              Build powerful automations
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
              Connect your apps, automate repetitive tasks, and scale your
              workflows with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                asChild
                className="group bg-emerald-600 hover:bg-emerald-700 shadow-xl h-14 px-8 text-lg font-semibold rounded-xl"
              >
                <Link to="/workflows">
                  <LayoutGrid className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                  Create Workflow
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="h-14 px-8 text-lg border-slate-600 hover:bg-slate-800"
              >
                <Link to="/credentials">Manage Credentials</Link>
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {stats.map(({ label, value, icon: Icon, href }, index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className="border-0 bg-slate-800/80 backdrop-blur-md hover:bg-slate-700/80 border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 h-full group cursor-pointer"
                  asChild
                >
                  <Link to={href}>
                    <CardContent className="p-8 pt-10">
                      <div className="w-16 h-16 bg-slate-700/50 group-hover:bg-slate-600/50 rounded-2xl flex items-center justify-center mb-6 transition-all group-hover:scale-110">
                        <Icon className="h-8 w-8 text-slate-300" />
                      </div>
                      <div className="text-3xl font-bold text-slate-100 mb-2">
                        {value}
                      </div>
                      <CardDescription className="text-slate-400 group-hover:text-slate-300 transition-colors">
                        {label}
                      </CardDescription>
                    </CardContent>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Card className="border-0 bg-slate-800/60 backdrop-blur-md border-slate-700/30 shadow-2xl">
              <CardContent className="p-12">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                  <h3 className="text-2xl font-bold text-slate-100">
                    Quick Start
                  </h3>
                </div>
                <div className="grid md:grid-cols-3 gap-8 text-left">
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-slate-200">
                      1. Add Credentials
                    </h4>
                    <p className="text-slate-400">
                      Connect your apps like Email, Telegram, Slack, and more.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-slate-200">
                      2. Build Workflow
                    </h4>
                    <p className="text-slate-400">
                      Drag & drop nodes to create powerful automations.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-slate-200">
                      3. Run & Scale
                    </h4>
                    <p className="text-slate-400">
                      Test, save, and run your workflows automatically.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
