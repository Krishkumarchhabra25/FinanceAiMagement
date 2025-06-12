import { CheckCircle, UserPlus, Activity, TrendingUp } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: UserPlus,
      title: "Create Your Account",
      description: "Sign up in minutes and securely connect your bank accounts and credit cards."
    },
    {
      icon: Activity,
      title: "Track Your Spending",
      description: "Our AI automatically categorizes your transactions and monitors your financial activity."
    },
    {
      icon: TrendingUp,
      title: "Get Smart Insights",
      description: "Receive personalized recommendations and insights to optimize your financial health."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-blue-50 to-green-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get started with intelligent financial management in three simple steps
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((step, index) => (
              <div key={index} className="text-center relative">
                {/* Connection line for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-blue-300 to-green-300 transform translate-x-1/2"></div>
                )}
                
                <div className="relative z-10 bg-white rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center shadow-lg">
                  <step.icon className="w-8 h-8 text-blue-600" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {step.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
                
                <div className="mt-4">
                  <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
