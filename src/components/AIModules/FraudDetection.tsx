import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, AlertTriangle, CheckCircle, MapPin, Clock } from "lucide-react";

const securityAlerts = [
  {
    id: 1,
    type: "suspicious",
    title: "Unusual Location Activity",
    description: "₹15,000 spent in Mumbai but home address in Delhi",
    time: "2 hours ago",
    severity: "high"
  },
  {
    id: 2,
    type: "multiple",
    title: "Multiple Large Transactions",
    description: "4 transactions above ₹5,000 in last 30 minutes",
    time: "45 minutes ago",
    severity: "medium"
  },
  {
    id: 3,
    type: "cleared",
    title: "Previous Alert Cleared",
    description: "ATM withdrawal in Bangalore verified as legitimate",
    time: "1 day ago",
    severity: "low"
  }
];

export function FraudDetection() {
  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Shield className="w-5 h-5 mr-2 text-red-400" />
          AI Fraud Detection
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-green-900/20 rounded-lg border border-green-500/30">
            <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">98.5%</p>
            <p className="text-green-400 text-sm">Security Score</p>
          </div>
          <div className="text-center p-4 bg-yellow-900/20 rounded-lg border border-yellow-500/30">
            <AlertTriangle className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">2</p>
            <p className="text-yellow-400 text-sm">Active Alerts</p>
          </div>
          <div className="text-center p-4 bg-slate-700/30 rounded-lg">
            <Clock className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">24/7</p>
            <p className="text-slate-400 text-sm">Monitoring</p>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-white font-semibold">Security Alerts</h4>
          {securityAlerts.map((alert, index) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg border ${
                alert.severity === 'high' ? 'bg-red-900/20 border-red-500/30' :
                alert.severity === 'medium' ? 'bg-yellow-900/20 border-yellow-500/30' :
                'bg-green-900/20 border-green-500/30'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  {alert.severity === 'high' ? (
                    <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5" />
                  ) : alert.severity === 'medium' ? (
                    <MapPin className="w-5 h-5 text-yellow-400 mt-0.5" />
                  ) : (
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                  )}
                  <div>
                    <h5 className="text-white font-medium">{alert.title}</h5>
                    <p className="text-slate-300 text-sm">{alert.description}</p>
                  </div>
                </div>
                <span className="text-slate-400 text-xs">{alert.time}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
