// components/StepsSection.jsx
import React from 'react';

const StepsSection = () => {
  const steps = [
    'Upload your image.',
    'AI processes and removes the background.',
    'Download the clean result.',
  ];

  return (
    <section className="bg-white py-16 px-6 md:px-20">
      <h2 className="text-3xl font-bold mb-10 text-center">How It Works</h2>
      <div className="grid md:grid-cols-3 gap-10">
        {steps.map((step, index) => (
          <div
            key={index}
            className="border p-6 rounded-xl text-center shadow hover:shadow-lg transition"
          >
            <div className="text-blue-600 text-4xl font-bold mb-4">{index + 1}</div>
            <p className="text-gray-700">{step}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StepsSection;
