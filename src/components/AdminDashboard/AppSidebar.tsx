import { useState } from "react";
import { motion } from "framer-motion";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Calendar,
  CreditCard,
  ChartBar,
  Receipt,
  Wallet,
  FileText,
} from "lucide-react";

const sidebarItems = [
  { title: "Dashboard", url: "/dashboard", icon: ChartBar },
  { title: "Cards", url: "/dashboard/cards", icon: CreditCard },
  { title: "Transactions", url: "/dashboard/transactions", icon: Receipt },
  { title: "Analytics", url: "/dashboard/analytics", icon: Calendar },
  { title: "Wallet", url: "/dashboard/wallets", icon: Wallet },
  { title: "Reports", url: "/dashboard/reports", icon: FileText },
];


export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;

  return (
    <Sidebar className={`${collapsed ? "w-16" : "w-64"} border-r border-slate-700 bg-slate-800/50 backdrop-blur-xl`}>
      <SidebarContent>
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-6 border-b border-slate-700"
        >
          {!collapsed ? (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-slate-600 to-slate-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">FM</span>
              </div>
              <span className="text-white font-bold text-xl">FinanceAI</span>
            </motion.div>
          ) : (
            <div className="w-8 h-8 bg-gradient-to-r from-slate-600 to-slate-700 rounded-lg flex items-center justify-center mx-auto">
              <span className="text-white font-bold text-sm">FM</span>
            </div>
          )}
        </motion.div>

        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="text-slate-400 text-xs uppercase tracking-wider px-6 mb-4">
            {!collapsed && "Main Menu"}
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2 px-3">
              {sidebarItems.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        className={({ isActive }) =>
                          `flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-200 ${
                            isActive
                              ? "bg-slate-700/50 text-white border border-slate-600"
                              : "text-slate-400 hover:text-white hover:bg-slate-700/30"
                          }`
                        }
                      >
                        <item.icon className="w-5 h-5" />
                        {!collapsed && <span className="font-medium">{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </motion.div>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <div className="absolute top-6 right-3">
        <SidebarTrigger className="text-slate-400 hover:text-white" />
      </div>
    </Sidebar>
  );
}
