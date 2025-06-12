import { Users, Activity, TrendingUp, Clock } from "lucide-react";

const Statistics = () => {
  const stats = [
    {
      icon: Users,
      number: "50,000+",
      label: "Active Users",
      description: "Managing their finances daily"
    },
    {
      icon: Activity,
      number: "2.5M+",
      label: "Transactions",
      description: "Processed this month"
    },
    {
      icon: TrendingUp,
      number: "47%",
      label: "Average Savings",
      description: "Increase after 3 months"
    },
    {
      icon: Clock,
      number: "24/7",
      label: "Real-time Updates",
      description: "Continuous monitoring"
    }
  ];

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Trusted by Thousands
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Join the growing community of smart financial managers
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="bg-gradient-to-r from-blue-500 to-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              
              <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                {stat.number}
              </div>
              
              <div className="text-xl font-semibold text-white mb-2">
                {stat.label}
              </div>
              
              <p className="text-gray-400 text-sm">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
