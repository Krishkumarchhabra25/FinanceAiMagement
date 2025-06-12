import { TrendingUp, DollarSign, PieChart, BarChart3, ArrowUpRight, ArrowDownRight, CreditCard, Wallet, Target, Bell, Settings, User, Calendar, Download, Upload, Eye, EyeOff } from "lucide-react";

const DemoSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-32 h-32 bg-blue-100 rounded-full opacity-20 animate-float"></div>
        <div className="absolute bottom-20 left-10 w-24 h-24 bg-green-100 rounded-full opacity-20 animate-float delay-700"></div>
        <div className="absolute top-1/2 left-20 w-16 h-16 bg-purple-100 rounded-full opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute top-1/4 right-1/3 w-20 h-20 bg-orange-100 rounded-full opacity-25 animate-float delay-500"></div>
        <div className="absolute bottom-1/3 right-20 w-12 h-12 bg-pink-100 rounded-full opacity-20 animate-bounce delay-300"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            See FinanceAI in{" "}
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Action
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the power of AI-driven financial insights with our comprehensive dashboard
          </p>
        </div>
        
        <div className="max-w-7xl mx-auto">
          {/* Enhanced main dashboard with more information */}
          <div className="bg-white rounded-3xl shadow-3xl p-8 mb-8 border border-gray-100 animate-fade-in delay-300 hover:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.25)] transition-all duration-700 relative overflow-hidden">
            {/* Floating decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-10 animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-10 animate-float"></div>
            
            {/* Dashboard header with more elements */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">Financial Dashboard</h3>
                  <p className="text-gray-600">Real-time insights powered by AI</p>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-4 lg:mt-0">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-600">Live updates</span>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Bell className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Settings className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <User className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Enhanced key metrics with more cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                { icon: DollarSign, title: "Total Balance", value: "$47,582.40", change: "+12.5%", positive: true, color: "from-blue-500 to-blue-600" },
                { icon: TrendingUp, title: "Monthly Income", value: "$8,420.00", change: "+5.2%", positive: true, color: "from-green-500 to-green-600" },
                { icon: CreditCard, title: "Expenses", value: "$3,247.80", change: "-8.1%", positive: true, color: "from-purple-500 to-purple-600" },
                { icon: Wallet, title: "Investments", value: "$15,892.60", change: "+15.3%", positive: true, color: "from-orange-500 to-orange-600" }
              ].map((metric, index) => (
                <div 
                  key={index} 
                  className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-100 hover:scale-105 hover:shadow-xl transition-all duration-300 animate-fade-in relative overflow-hidden group"
                  style={{ animationDelay: `${(index + 1) * 200}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${metric.color} shadow-lg`}>
                        <metric.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className={`flex items-center gap-1 text-sm ${metric.positive ? 'text-green-600' : 'text-red-600'}`}>
                        {metric.positive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                        {metric.change}
                      </div>
                    </div>
                    <h4 className="text-sm text-gray-600 mb-2">{metric.title}</h4>
                    <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional quick stats row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Active Cards", value: "3", icon: CreditCard },
                { label: "Savings Goal", value: "68%", icon: Target },
                { label: "This Month", value: "+$1.2K", icon: Calendar },
                { label: "Categories", value: "12", icon: PieChart }
              ].map((stat, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-xl flex items-center gap-3 hover:bg-gray-100 transition-colors duration-200">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    <stat.icon className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">{stat.label}</p>
                    <p className="font-semibold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Enhanced chart visualization with side panels */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Main chart */}
              <div className="lg:col-span-2 bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-lg font-semibold text-gray-900">Spending Analytics</h4>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">7 days</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">30 days</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">1 year</span>
                  </div>
                </div>
                
                {/* Enhanced animated chart */}
                <div className="flex items-end justify-between h-48 gap-1">
                  {[65, 45, 80, 60, 95, 70, 85, 55, 75, 90, 65, 80, 72, 88, 55, 92].map((height, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div 
                        className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all duration-1000 hover:from-green-500 hover:to-green-400 cursor-pointer group relative animate-slide-up"
                        style={{ 
                          height: `${height}%`,
                          width: '100%',
                          animationDelay: `${index * 50}ms`
                        }}
                      >
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          ${Math.floor(height * 50)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between mt-4 text-sm text-gray-600">
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                </div>
              </div>

              {/* Side panel with additional info */}
              <div className="space-y-4">
                {/* Recent transactions */}
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100 shadow-lg">
                  <h5 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Recent Activity
                  </h5>
                  <div className="space-y-3">
                    {[
                      { name: "Netflix", amount: "-$15.99", time: "2m ago", icon: Download },
                      { name: "Salary", amount: "+$2,840", time: "1d ago", icon: Upload },
                      { name: "Grocery", amount: "-$89.32", time: "2d ago", icon: Download }
                    ].map((transaction, index) => (
                      <div key={index} className="flex items-center justify-between p-2 hover:bg-white rounded-lg transition-colors">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${transaction.amount.startsWith('+') ? 'bg-green-100' : 'bg-red-100'}`}>
                            <transaction.icon className={`w-4 h-4 ${transaction.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'}`} />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{transaction.name}</p>
                            <p className="text-xs text-gray-500">{transaction.time}</p>
                          </div>
                        </div>
                        <span className={`text-sm font-semibold ${transaction.amount.startsWith('+') ? 'text-green-600' : 'text-gray-900'}`}>
                          {transaction.amount}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Budget overview */}
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100 shadow-lg">
                  <h5 className="font-semibold text-gray-900 mb-4">Budget Overview</h5>
                  <div className="space-y-3">
                    {[
                      { category: "Food", spent: 420, budget: 500, color: "bg-blue-500" },
                      { category: "Transport", spent: 180, budget: 300, color: "bg-green-500" },
                      { category: "Entertainment", spent: 95, budget: 150, color: "bg-purple-500" }
                    ].map((item, index) => (
                      <div key={index}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-700">{item.category}</span>
                          <span className="text-gray-900 font-medium">${item.spent}/${item.budget}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-1000 ${item.color}`}
                            style={{ 
                              width: `${(item.spent / item.budget) * 100}%`,
                              animationDelay: `${index * 200}ms`
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Enhanced feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in delay-500">
            {[
              { title: "AI Insights", desc: "Smart recommendations based on your spending patterns", color: "blue", icon: Eye },
              { title: "Real-time Sync", desc: "Instant updates across all your connected accounts", color: "green", icon: TrendingUp },
              { title: "Secure Encryption", desc: "Bank-level security to protect your financial data", color: "purple", icon: EyeOff }
            ].map((feature, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:scale-105 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${
                    feature.color === 'blue' ? 'from-blue-500 to-blue-600' :
                    feature.color === 'green' ? 'from-green-500 to-green-600' :
                    'from-purple-500 to-purple-600'
                  } mb-4 flex items-center justify-center shadow-lg`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;