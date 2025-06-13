import { motion } from "framer-motion";
import { Bell, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function TopBar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl px-6 flex items-center justify-between"
    >
      <div className="flex items-center space-x-4">
        <div className="text-slate-400">
          <Calendar className="w-5 h-5 inline mr-2" />
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
          <Bell className="w-5 h-5" />
        </Button>
        
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <p className="text-white font-medium">John Carter</p>
            <p className="text-slate-400 text-sm">Admin</p>
          </div>
          <Avatar>
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" />
            <AvatarFallback>JC</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </motion.header>
  );
}