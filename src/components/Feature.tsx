import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, FileText, Activity, CreditCard, Wallet, TrendingUp } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: PieChart,
      title: "Expense Analysis",
      description: "AI-powered categorization and insights into your spending patterns with predictive analytics."
    },
    {
      icon: FileText,
      title: "Smart Reports",
      description: "Automated financial reports with actionable recommendations tailored to your goals."
    },
    {
      icon: Activity,
      title: "Real-time Scanners",
      description: "Instant transaction monitoring with fraud detection and spending alerts."
    },
    {
      icon: TrendingUp,
      title: "Budget Planning",
      description: "Intelligent budget suggestions based on your income, expenses, and financial goals."
    },
    {
      icon: CreditCard,
      title: "Multi-Account Setup",
      description: "Connect all your bank accounts, credit cards, and investments in one secure platform."
    },
    {
      icon: Wallet,
      title: "Multi-Currency Support",
      description: "Track expenses across different currencies with real-time exchange rates."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to take control of your finances, powered by artificial intelligence
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-gradient-to-br from-gray-50 to-white"
            >
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mb-4">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;