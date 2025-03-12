
import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="page-transition max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white text-shadow text-center mb-8">
          About AuraChef
        </h1>
        
        <div className="glass p-8 rounded-2xl mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-white/90 mb-6">
            AuraChef was created with a simple mission: to make healthy eating accessible, enjoyable, and personalized
            for everyone. We believe that good nutrition shouldn't be complicated, and that's why we've developed an
            AI-powered platform that understands your unique needs and preferences.
          </p>
          <p className="text-white/90">
            Our advanced AI assistant provides personalized nutrition advice, recipe recommendations, and health tips
            based on cutting-edge research and nutritional science. Whether you're looking to lose weight, gain muscle,
            manage a health condition, or simply eat better, AuraChef is your trusted companion on your health journey.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="glass p-6 rounded-xl card-3d">
            <h3 className="text-xl font-semibold mb-3">Our AI Technology</h3>
            <p className="text-white/90">
              Powered by advanced machine learning algorithms, our AI assistant continuously learns from the latest
              nutritional research and your personal preferences to provide increasingly tailored recommendations.
              The more you use AuraChef, the more personalized your experience becomes.
            </p>
          </div>
          
          <div className="glass p-6 rounded-xl card-3d">
            <h3 className="text-xl font-semibold mb-3">Expert-Backed Advice</h3>
            <p className="text-white/90">
              All health tips and nutritional guidance provided by AuraChef are based on scientifically-validated
              information and reviewed by our team of registered dietitians and nutrition experts to ensure accuracy
              and safety.
            </p>
          </div>
        </div>
        
        <div className="glass p-8 rounded-2xl mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
          <p className="text-white/90 mb-6">
            AuraChef was founded by a diverse team of technologists, nutritionists, and health enthusiasts who
            believe in the power of technology to transform how we approach nutrition and wellness. Our team
            combines expertise in artificial intelligence, nutrition science, and user experience design to
            create a platform that's both scientifically sound and delightful to use.
          </p>
        </div>
        
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
          <p className="text-white/90 mb-8">
            Have questions, feedback, or suggestions? We'd love to hear from you!
          </p>
          <button className="btn btn-primary btn-3d">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
