import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { 
  ArrowDown, TrendingUp, Wallet, Play, 
 Shield, Zap, Brain, Users 
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay }
  })
};

const Hero = () => {
 // const navigate = useNavigate();

  const handleAnalyticsDashboard = ()=>{
 //   navigate(isAuthenticated ? "/dashboard" : "/signin")
  }
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center overflow-hidden">
      
      {/* Animated background elements */}
      <motion.div 
        className="absolute inset-0 overflow-hidden"
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full opacity-20 animate-pulse"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-100 rounded-full opacity-20 animate-pulse delay-1000"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-32 h-32 bg-purple-100 rounded-full opacity-10 animate-bounce delay-500"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        />
        <motion.div
          className="absolute top-1/4 right-1/4 w-24 h-24 bg-yellow-100 rounded-full opacity-15 animate-pulse delay-700"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
        />
      </motion.div>

      <div className="container mx-auto px-6 p-4 relative z-10">
        
        {/* Centered content layout */}
        <motion.div 
          className="text-center mb-12"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          custom={0.2}
        >
          {/* Badge */}
          <motion.div 
            className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in hover:scale-105 transition-transform duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <TrendingUp className="w-4 h-4" />
            AI-Powered Financial Intelligence
          </motion.div>

          {/* Main heading */}
          <motion.h1 
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 animate-fade-in"
            variants={fadeIn}
            custom={0.4}
          >
            Advanced Analytics for{" "}
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Bank & Finance
            </span>{" "}
            Management
          </motion.h1>

          {/* Description */}
          <motion.p 
            className="text-xl text-gray-600 mb-8 leading-relaxed animate-fade-in max-w-4xl mx-auto"
            variants={fadeIn}
            custom={0.6}
          >
            Transform your financial operations with cutting-edge AI analytics. Get real-time insights, predictive forecasting, and intelligent automation to optimize your banking and financial management processes.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 mb-16 animate-fade-in justify-center"
            variants={fadeIn}
            custom={0.8}
          >
            <Button   onClick={handleAnalyticsDashboard} size="lg" className="px-8 py-4 text-lg bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              <Wallet className="w-5 h-5 mr-2" />
              Start Advanced Analytics
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-4 text-lg border-2 hover:bg-gray-50 transition-all duration-300 group">
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Watch Demo
            </Button>
          </motion.div>
        </motion.div>

        {/* Enhanced Feature Sections */}
        <motion.div 
          className="max-w-7xl mx-auto space-y-16 animate-fade-in delay-300"
          initial="hidden"
          animate="visible"
        >
          {/* Core Features Grid */}
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              { icon: Brain, title: "AI-Powered Insights", description: "Machine learning algorithms analyze your financial data to provide actionable insights and predictions.", color: "from-purple-500 to-purple-600", bgColor: "from-purple-50 to-purple-100" },
              { icon: Shield, title: "Bank-Level Security", description: "Enterprise-grade encryption and security protocols protect your sensitive financial information.", color: "from-green-500 to-green-600", bgColor: "from-green-50 to-green-100" },
              { icon: Zap, title: "Real-Time Processing", description: "Instant data processing and real-time updates keep you informed of every financial movement.", color: "from-yellow-500 to-yellow-600", bgColor: "from-yellow-50 to-yellow-100" },
              { icon: Users, title: "Team Collaboration", description: "Multi-user access with role-based permissions for seamless team financial management.", color: "from-blue-500 to-blue-600", bgColor: "from-blue-50 to-blue-100" }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className={`bg-gradient-to-br ${feature.bgColor} p-8 rounded-3xl border border-gray-100 hover:scale-105 hover:shadow-2xl transition-all duration-500 animate-fade-in relative overflow-hidden group cursor-pointer`}
                variants={fadeIn}
                custom={1 + index * 0.2}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className={`p-4 rounded-2xl bg-gradient-to-r ${feature.color} shadow-xl mb-6 w-fit`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDown className="w-6 h-6 text-gray-400" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
