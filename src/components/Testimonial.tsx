import { Card, CardContent } from "@/components/ui/card";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Marketing Director",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b0e9?w=100&h=100&fit=crop&crop=face",
      content: "This platform completely transformed how I manage my finances. The AI insights helped me save 30% more than I ever thought possible."
    },
    {
      name: "Michael Rodriguez",
      role: "Software Engineer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      content: "The multi-currency support is a game-changer for my international work. Real-time alerts saved me from several fraudulent transactions."
    },
    {
      name: "Emily Johnson",
      role: "Small Business Owner",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      content: "Managing both personal and business finances has never been easier. The budget planning feature is incredibly intuitive and accurate."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What Our Users Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real stories from real people who transformed their financial lives
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-gradient-to-br from-gray-50 to-white">
              <CardContent className="p-8">
                <div className="mb-6">
                  <p className="text-gray-700 leading-relaxed italic">
                    "{testimonial.content}"
                  </p>
                </div>
                
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
