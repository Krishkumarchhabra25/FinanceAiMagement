import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, FileText, Calendar, TrendingUp } from "lucide-react";

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  const [selectedReport, setSelectedReport] = useState("financial-summary");

  const reportTypes = [
    { id: "financial-summary", name: "Financial Summary", description: "Complete overview of income, expenses, and savings" },
    { id: "spending-analysis", name: "Spending Analysis", description: "Detailed breakdown of spending categories and patterns" },
    { id: "income-report", name: "Income Report", description: "Analysis of income sources and trends" },
    { id: "tax-report", name: "Tax Report", description: "Tax-relevant transactions and deductions" },
  ];

  const generateReport = () => {
    // In a real app, this would generate and download a PDF report
    console.log(`Generating ${selectedReport} report for ${selectedPeriod} period`);
  };

  const mockReportData = {
    totalIncome: 19200,
    totalExpenses: 14400,
    netSavings: 4800,
    topCategories: [
      { name: "Food & Dining", amount: 3600, percentage: 25 },
      { name: "Transportation", amount: 2400, percentage: 17 },
      { name: "Shopping", amount: 2160, percentage: 15 },
      { name: "Bills & Utilities", amount: 1800, percentage: 13 },
      { name: "Entertainment", amount: 1440, percentage: 10 },
    ]
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Financial Reports</h1>
        <p className="text-slate-400">Generate comprehensive financial reports and insights</p>
      </div>

      {/* Report Generation */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Generate Report</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-slate-300 text-sm font-medium">Report Type</label>
              <Select value={selectedReport} onValueChange={setSelectedReport}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  {reportTypes.map(type => (
                    <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-slate-300 text-sm font-medium">Time Period</label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button onClick={generateReport} className="w-full bg-slate-600 hover:bg-slate-500">
                <Download className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </div>
          
          <div className="bg-slate-700/30 p-4 rounded-lg">
            <p className="text-slate-300">
              {reportTypes.find(type => type.id === selectedReport)?.description}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Report Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Financial Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                <p className="text-2xl font-bold text-green-400">${mockReportData.totalIncome.toLocaleString()}</p>
                <p className="text-slate-400 text-sm">Total Income</p>
              </div>
              <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                <p className="text-2xl font-bold text-red-400">${mockReportData.totalExpenses.toLocaleString()}</p>
                <p className="text-slate-400 text-sm">Total Expenses</p>
              </div>
              <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                <p className="text-2xl font-bold text-slate-300">${mockReportData.netSavings.toLocaleString()}</p>
                <p className="text-slate-400 text-sm">Net Savings</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Top Spending Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockReportData.topCategories.map((category, index) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="text-white font-medium">{category.name}</p>
                    <p className="text-slate-400 text-sm">{category.percentage}% of total</p>
                  </div>
                  <p className="text-white font-bold">${category.amount.toLocaleString()}</p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Available Reports */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Available Report Types</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reportTypes.map((report, index) => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors cursor-pointer"
                onClick={() => setSelectedReport(report.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-semibold">{report.name}</h3>
                  <Calendar className="w-4 h-4 text-slate-400" />
                </div>
                <p className="text-slate-300 text-sm">{report.description}</p>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Reports;
