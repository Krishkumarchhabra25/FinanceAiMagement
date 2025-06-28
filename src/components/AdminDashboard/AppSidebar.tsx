import { NavLink } from "react-router-dom";
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
   CalendarDays,
  Building,
  RotateCcw,
  Target,
} from "lucide-react";

const sidebarItems = [
  { title: "Dashboard", url: "/dashboard", icon: ChartBar },
  { title: "Wallet", url: "/dashboard/wallets", icon: Wallet },
  { title: "Cards", url: "/dashboard/cards", icon: CreditCard },
  { title: "Transactions", url: "/dashboard/transactions", icon: Receipt },
  { title: "Bills & EMI", url: "/dashboard/bills", icon: CalendarDays },
  { title: "Loans & Debt", url: "/dashboard/loans", icon: Building },
  { title: "Subscriptions", url: "/dashboard/subscriptions", icon: RotateCcw },
  { title: "Analytics", url: "/dashboard/analytics", icon: Calendar },
  
  { title: "Budget", url: "/dashboard/budget", icon: Target },
  { title: "Goals", url: "/dashboard/goals", icon: Target },
  { title: "Reports", url: "/dashboard/reports", icon: FileText },
];


export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";


  return (
    <Sidebar className={`${collapsed ? "w-16" : "w-64"} border-r border-gray-800 bg-black`}>
      <SidebarContent>
        {/* Logo */}
        <div className="p-6 border-b border-gray-800">
          {!collapsed ? (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">FA</span>
              </div>
              <span className="text-white font-semibold text-xl">FinanceAI</span>
            </div>
          ) : (
            <div className="w-8 h-8 bg-gray-600 rounded-lg flex items-center justify-center mx-auto">
              <span className="text-white font-bold text-sm">FA</span>
            </div>
          )}
        </div>

        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="text-gray-400 text-xs uppercase tracking-wider px-6 mb-4">
            {!collapsed && "Navigation"}
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1 px-3">
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
                          isActive
                            ? "bg-gray-800 text-white"
                            : "text-gray-300 hover:bg-gray-800"
                        }`
                      }
                    >
                      <item.icon className="w-5 h-5" />
                      {!collapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <div className="absolute top-6 right-3">
        <SidebarTrigger className="text-gray-400 hover:text-gray-300" />
      </div>
    </Sidebar>
  );
}
