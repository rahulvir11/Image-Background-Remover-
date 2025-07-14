// components/Testimonials.jsx
import React from 'react';

const Testimonials = () => {
  const reviews = [
    {
      name: 'Rahul M.',
      feedback: 'It removed the background perfectly in just a few seconds!',
    },
    {
      name: 'Ayesha K.',
      feedback: 'Super fast and accurate. I loved the results.',
    },
    {
      name: 'James L.',
      feedback: 'Best background remover I have used so far.',
    },
  ];

  return (
    <section className="bg-gray-50 py-16 px-6 md:px-20">
      <h2 className="text-3xl font-bold mb-10 text-center">What Our Users Say</h2>
      <div className="grid md:grid-cols-3 gap-10">
        {reviews.map((r, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <p className="text-gray-600 italic">"{r.feedback}"</p>
            <p className="mt-4 text-right font-semibold text-blue-600">- {r.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
