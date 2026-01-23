import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Menu,
  X,
  Home,
  Workflow,
  LogOut,
  LogIn,
  User,
  UserLockIcon,
} from "lucide-react";
import { useProfile } from "@/hooks/useProfile";
import useAuthStore from "@/lib/useAuthStore";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function NavbarSection() {
  const { profile, loading } = useProfile();
  const { login, isLoggedIn, logout } = useAuthStore() as any;
  const navigate = useNavigate();
  const [toggleSheet, setToggleSheet] = useState(false);

  const menuItems = [
    { label: "Home", pageUrl: "/", icon: Home },
    { label: "Workflows", pageUrl: "/workflows", icon: Workflow },
    { label: "Credentials", pageUrl: "/credentials", icon: UserLockIcon },
  ];

  const handleSheetToggle = () => {
    setToggleSheet((prev) => !prev);
  };

  useEffect(() => {
    if (profile?.isLoggedIn) {
      login(
        {
          _id: profile._id,
          email: profile.email,
          name: profile.name,
        },
        true,
      );
    }
  }, [profile, login]);

  const handleLogout = () => {
    logout();
    localStorage.removeItem("access-token");
    navigate("/", { replace: true });
  };

  return (
    <div className="relative">
      {/* Modern Hamburger Button */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={handleSheetToggle}
          className="fixed top-4 left-4 z-50 h-12 w-12 bg-white/20 backdrop-blur-md hover:bg-white/30 border-white/30 shadow-xl text-slate-200 hover:text-white rounded-2xl"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </motion.div>

      <Sheet open={toggleSheet} onOpenChange={setToggleSheet}>
        <SheetContent
          side="left"
          className="w-80 p-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-r-0 shadow-2xl border-white/10"
        >
          {/* Header Section */}
          <div className="p-8 border-b border-white/10 bg-slate-900/95 backdrop-blur-md sticky top-0 z-20">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
                  <Workflow className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
                    Workflow Builder
                  </h2>
                  <p className="text-sm text-slate-400">Automation Platform</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSheetToggle}
                className="h-10 w-10 text-slate-400 hover:text-white hover:bg-white/20 rounded-xl"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="p-2 pt-8 pb-6 flex-1 overflow-auto">
            <nav className="space-y-1 px-4">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.pageUrl}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={item.pageUrl}
                      onClick={handleSheetToggle}
                      className="group flex items-center w-full p-4 rounded-2xl text-slate-300 hover:bg-white/10 hover:text-white transition-all duration-200 font-medium text-sm shadow-sm border border-transparent hover:border-white/20 hover:shadow-md"
                    >
                      <Icon className="h-5 w-5 mr-4 flex-shrink-0 opacity-75 group-hover:opacity-100" />
                      {item.label}
                      <div className="ml-auto w-2 h-2 rounded-full bg-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Profile Section */}
            <Separator className="my-6 mx-4 bg-white/20" />

            <div className="px-4 space-y-4">
              {isLoggedIn && profile ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-200">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="" alt={profile.name} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold text-lg">
                        {profile.name?.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-white truncate">
                        {profile.name}
                      </p>
                      <p className="text-sm text-slate-400 truncate">
                        {profile.email}
                      </p>
                    </div>
                    <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                      Active
                    </Badge>
                  </div>
                </motion.div>
              ) : (
                <div className="p-1 bg-white/5 rounded-2xl">
                  <p className="text-center text-slate-400 text-sm py-4">
                    Sign in to access all features
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-6 pt-0 border-t border-white/10 bg-slate-900/50 backdrop-blur-md sticky bottom-0">
            {isLoggedIn ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <Button
                  onClick={handleLogout}
                  className="w-full h-14 rounded-2xl bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white shadow-xl border-rose-500 font-medium text-sm transition-all duration-200"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Sign Out
                </Button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <Button
                  onClick={() => {
                    handleSheetToggle();
                    navigate("/login", { replace: true });
                  }}
                  className="w-full h-14 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-xl border-blue-500 font-medium text-sm transition-all duration-200"
                >
                  <LogIn className="h-5 w-5 mr-2" />
                  Sign In
                </Button>
              </motion.div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
