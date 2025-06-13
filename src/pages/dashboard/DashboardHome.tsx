import React from 'react'
import { motion } from "framer-motion";
import { DashboardStats } from '@/components/AdminDashboard/DashboardStats';
import { CreditCards } from '@/components/AdminDashboard/CreditCards';
import { ExchangeRates } from '@/components/AdminDashboard/ExchangeRates';
import { ChartSection } from '@/components/AdminDashboard/ChartSection';
import { TransactionHistory } from '@/components/AdminDashboard/TranscationHistory';

const DashboardHome = () => {
  return (
      <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-slate-400">AI-powered financial overview and insights</p>
      </motion.div>

      <DashboardStats />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <CreditCards />
        </div>
        <div>
          <ExchangeRates />
        </div>
      </div>

      <ChartSection />
      <TransactionHistory />
    </motion.div>
  )
}

export default DashboardHome
