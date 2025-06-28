import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, DollarSign, TrendingUp, Pause, Play, X } from "lucide-react";

const Subscription = () => {
  const [subscriptions, setSubscriptions] = useState([
    {
      id: 1,
      name: "Netflix",
      cost: 799,
      billingCycle: "monthly",
      nextBilling: "2024-02-15",
      category: "Entertainment",
      status: "active",
      description: "Video streaming service"
    },
    {
      id: 2,
      name: "Spotify Premium",
      cost: 119,
      billingCycle: "monthly",
      nextBilling: "2024-02-10",
      category: "Entertainment",
      status: "active",
      description: "Music streaming service"
    },
    {
      id: 3,
      name: "Adobe Creative Suite",
      cost: 1699,
      billingCycle: "monthly",
      nextBilling: "2024-02-20",
      category: "Productivity",
      status: "active",
      description: "Design and creative tools"
    },
    {
      id: 4,
      name: "Gym Membership",
      cost: 2000,
      billingCycle: "monthly",
      nextBilling: "2024-02-05",
      category: "Health",
      status: "paused",
      description: "Fitness center membership"
    },
    {
      id: 5,
      name: "Microsoft 365",
      cost: 4200,
      billingCycle: "yearly",
      nextBilling: "2024-08-15",
      category: "Productivity",
      status: "active",
      description: "Office suite and cloud storage"
    }
  ]);

  const totalMonthly = subscriptions
    .filter(s => s.status === 'active')
    .reduce((sum, s) => sum + (s.billingCycle === 'monthly' ? s.cost : s.cost / 12), 0);
  
  const totalYearly = totalMonthly * 12;

  const pauseSubscription = (id: number) => {
    setSubscriptions(prev => prev.map(sub => 
      sub.id === id ? { ...sub, status: 'paused' } : sub
    ));
  };

  const resumeSubscription = (id: number) => {
    setSubscriptions(prev => prev.map(sub => 
      sub.id === id ? { ...sub, status: 'active' } : sub
    ));
  };

  const cancelSubscription = (id: number) => {
    setSubscriptions(prev => prev.map(sub => 
      sub.id === id ? { ...sub, status: 'cancelled' } : sub
    ));
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Entertainment': return 'bg-purple-900/30 text-purple-400';
      case 'Productivity': return 'bg-blue-900/30 text-blue-400';
      case 'Health': return 'bg-green-900/30 text-green-400';
      default: return 'bg-slate-900/30 text-slate-400';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Subscription Management</h1>
        <p className="text-slate-400">Track and optimize your recurring expenses</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Monthly Total</p>
                <p className="text-2xl font-bold text-white">₹{totalMonthly.toFixed(0)}</p>
              </div>
              <DollarSign className="w-8 h-8 text-slate-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Yearly Cost</p>
                <p className="text-2xl font-bold text-yellow-400">₹{totalYearly.toFixed(0)}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Active</p>
                <p className="text-2xl font-bold text-green-400">{subscriptions.filter(s => s.status === 'active').length}</p>
              </div>
              <Play className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Paused</p>
                <p className="text-2xl font-bold text-orange-400">{subscriptions.filter(s => s.status === 'paused').length}</p>
              </div>
              <Pause className="w-8 h-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subscriptions List */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Your Subscriptions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {subscriptions.map((subscription, index) => (
              <motion.div
                key={subscription.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getCategoryColor(subscription.category)}`}>
                    {subscription.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-white font-medium">{subscription.name}</h3>
                      <Badge className={getCategoryColor(subscription.category)}>
                        {subscription.category}
                      </Badge>
                      <Badge variant={subscription.status === 'active' ? 'default' : 'secondary'}>
                        {subscription.status}
                      </Badge>
                    </div>
                    <p className="text-slate-400 text-sm">{subscription.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-slate-400 mt-1">
                      <span>₹{subscription.cost}/{subscription.billingCycle}</span>
                      <span className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        Next: {subscription.nextBilling}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="text-right mr-4">
                    <p className="text-white font-bold">₹{subscription.cost}</p>
                    <p className="text-slate-400 text-sm">{subscription.billingCycle}</p>
                  </div>
                  
                  {subscription.status === 'active' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => pauseSubscription(subscription.id)}
                      className="text-orange-400 hover:text-orange-300"
                    >
                      <Pause className="w-4 h-4" />
                    </Button>
                  )}
                  
                  {subscription.status === 'paused' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => resumeSubscription(subscription.id)}
                      className="text-green-400 hover:text-green-300"
                    >
                      <Play className="w-4 h-4" />
                    </Button>
                  )}
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => cancelSubscription(subscription.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Analysis */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">💡 AI Subscription Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
              <h4 className="text-white font-semibold mb-2">Cost Optimization</h4>
              <p className="text-slate-300 text-sm">
                You could save ₹2,400 annually by switching to yearly billing for Netflix and Spotify. 
                Consider bundling entertainment services for better deals.
              </p>
            </div>
            
            <div className="p-4 bg-yellow-900/20 rounded-lg border border-yellow-500/30">
              <h4 className="text-white font-semibold mb-2">Usage Alert</h4>
              <p className="text-slate-300 text-sm">
                Your gym membership has been paused for 2 months. Consider canceling if not planning to resume soon.
              </p>
            </div>
            
            <div className="p-4 bg-green-900/20 rounded-lg border border-green-500/30">
              <h4 className="text-white font-semibold mb-2">Budget Impact</h4>
              <p className="text-slate-300 text-sm">
                Subscriptions account for 8% of your monthly expenses. This is within the recommended 10% limit.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Subscription;
