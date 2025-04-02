import React, { useState } from "react";

const MembershipPage: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<"basic" | "pro" | "premium">(
    "basic"
  );

  const membershipPlans = [
    {
      type: "basic",
      title: "Basic Membership",
      price: 49.99,
      features: [
        "Monthly Newsletter",
        "Basic Crop Insights",
        "Access to Online Resources",
        "Community Forum Access",
      ],
    },
    {
      type: "pro",
      title: "Pro Membership",
      price: 99.99,
      features: [
        "All Basic Membership Features",
        "Quarterly Consultation",
        "Advanced Crop Analytics",
        "Priority Support",
        "Exclusive Webinars",
      ],
    },
    {
      type: "premium",
      title: "Premium Membership",
      price: 199.99,
      features: [
        "All Pro Membership Features",
        "Monthly Personal Consultation",
        "Comprehensive Farm Analysis",
        "Customized Technology Recommendations",
        "Priority Equipment Support",
        "Annual Innovation Workshop",
      ],
    },
  ];

  return (
    <main className="welcome-container">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-green-700 mb-8 text-center">
          SmartHarvest Membership Plans
        </h1>

        <div className="flex justify-center mb-8 space-x-4">
          {membershipPlans.map((plan) => (
            <button
              key={plan.type}
              onClick={() => setSelectedPlan(plan.type as any)}
              className={`
              px-6 py-2 rounded-lg transition-all duration-300
              ${
                selectedPlan === plan.type
                  ? "bg-green-600 text-white"
                  : "bg-white text-green-600 border border-green-600 hover:bg-green-50"
              }
            `}
            >
              {plan.title}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {membershipPlans.map((plan) => (
            <div
              key={plan.type}
              className={`
              bg-white p-6 rounded-lg shadow-md 
              ${
                selectedPlan === plan.type
                  ? "border-4 border-green-600 transform scale-105"
                  : "border"
              }
              transition-all duration-300
            `}
            >
              <h3 className="text-2xl font-bold text-green-800 mb-4">
                {plan.title}
              </h3>
              <div className="text-4xl font-bold text-green-700 mb-4">
                ${plan.price}/month
              </div>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors">
                Choose {plan.title}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold text-green-800 mb-4">
            Membership Benefits
          </h2>
          <p className="text-gray-600">
            Our membership plans are designed to provide farmers with
            comprehensive support, cutting-edge insights, and personalized
            agricultural technology solutions. Choose the plan that best fits
            your farming needs.
          </p>
        </div>
      </div>
    </main>
  );
};

export default MembershipPage;
