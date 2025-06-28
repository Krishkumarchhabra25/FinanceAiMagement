import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Calculator, CreditCard, Home, Car } from "lucide-react";
import { CreditScorePrediction } from "@/components/AIModules/CreditScorePrediction";

const Loans = () => {
  const [loans] = useState([
    {
      id: 1,
      name: "Home Loan",
      principal: 2500000,
      outstanding: 1850000,
      monthlyEMI: 35000,
      interestRate: 8.5,
      tenure: 240,
      remainingMonths: 168,
      type: "home",
      status: "active"
    },
    {
      id: 2,
      name: "Car Loan",
      principal: 800000,
      outstanding: 450000,
      monthlyEMI: 18000,
      interestRate: 9.2,
      tenure: 60,
      remainingMonths: 28,
      type: "vehicle",
      status: "active"
    },
    {
      id: 3,
      name: "Personal Loan",
      principal: 200000,
      outstanding: 0,
      monthlyEMI: 0,
      interestRate: 12.5,
      tenure: 36,
      remainingMonths: 0,
      type: "personal",
      status: "closed"
    }
  ]);

  const totalOutstanding = loans.reduce((sum, loan) => sum + loan.outstanding, 0);
  const totalEMI = loans.filter(l => l.status === 'active').reduce((sum, loan) => sum + loan.monthlyEMI, 0);

  const getIcon = (type: string) => {
    switch (type) {
      case 'home': return <Home className="w-6 h-6" />;
      case 'vehicle': return <Car className="w-6 h-6" />;
      default: return <CreditCard className="w-6 h-6" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Loans & Debt Management</h1>
        <p className="text-slate-400">Track your loans and manage debt efficiently</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Outstanding</p>
                <p className="text-2xl font-bold text-red-400">₹{(totalOutstanding / 100000).toFixed(1)}L</p>
              </div>
              <TrendingDown className="w-8 h-8 text-red-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Monthly EMI</p>
                <p className="text-2xl font-bold text-yellow-400">₹{totalEMI.toLocaleString()}</p>
              </div>
              <Calculator className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Active Loans</p>
                <p className="text-2xl font-bold text-white">{loans.filter(l => l.status === 'active').length}</p>
              </div>
              <CreditCard className="w-8 h-8 text-slate-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Debt-to-Income</p>
                <p className="text-2xl font-bold text-green-400">25%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Loans List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {loans.map((loan, index) => {
          const repaidPercentage = ((loan.principal - loan.outstanding) / loan.principal) * 100;
          
          return (
            <motion.div
              key={loan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`bg-slate-800/50 border-slate-700 ${loan.status === 'closed' ? 'border-green-500' : ''}`}>
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    <div className="flex items-center">
                      {getIcon(loan.type)}
                      <span className="ml-2">{loan.name}</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${
                      loan.status === 'active' ? 'bg-yellow-900/30 text-yellow-400' : 'bg-green-900/30 text-green-400'
                    }`}>
                      {loan.status.toUpperCase()}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-slate-400 text-sm">Principal</p>
                      <p className="text-white font-semibold">₹{(loan.principal / 100000).toFixed(1)}L</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm">Outstanding</p>
                      <p className="text-red-400 font-semibold">₹{(loan.outstanding / 100000).toFixed(1)}L</p>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-400">Repaid</span>
                      <span className="text-white">{repaidPercentage.toFixed(1)}%</span>
                    </div>
                    <Progress value={repaidPercentage} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-slate-400">Interest Rate</p>
                      <p className="text-white">{loan.interestRate}%</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Monthly EMI</p>
                      <p className="text-white">₹{loan.monthlyEMI.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Remaining</p>
                      <p className="text-white">{loan.remainingMonths} months</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Credit Score Prediction */}
      <CreditScorePrediction />
    </motion.div>
  );
};

export default Loans;
