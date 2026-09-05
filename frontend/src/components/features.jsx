const features = [
  {
    title: "Resume Analysis",
    desc: "AI analyzes your resume and highlights strengths and weaknesses."
  },
  {
    title: "Skill Gap Detection",
    desc: "Discover missing skills required for your dream career."
  },
  {
    title: "Career Recommendations",
    desc: "Receive personalized career paths powered by machine learning."
  },
  {
    title: "Salary Prediction",
    desc: "Estimate salary based on skills, experience and location."
  }
];

function Features() {
  return (
    <section className="py-20 bg-gray-100">

      <h2 className="text-4xl font-bold text-center mb-12">
        Platform Features
      </h2>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8 px-6">

        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition"
          >
            <h3 className="text-xl font-bold text-blue-700 mb-4">
              {feature.title}
            </h3>

            <p>{feature.desc}</p>
          </div>
        ))}

      </div>
    </section>
  );
}

export default Features;