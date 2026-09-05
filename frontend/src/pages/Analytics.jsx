export default function Analytics() {

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white p-10">

      <h1 className="text-4xl font-bold text-cyan-400 mb-10">
        Analytics Dashboard
      </h1>

      <div className="grid grid-cols-4 gap-6">

        <div className="bg-slate-800 border border-cyan-500 rounded-xl p-6">
          <h2>Total Resume</h2>
          <h1 className="text-5xl font-bold mt-3">1</h1>
        </div>

        <div className="bg-slate-800 border border-green-500 rounded-xl p-6">
          <h2>Average Score</h2>
          <h1 className="text-5xl font-bold mt-3">100</h1>
        </div>

        <div className="bg-slate-800 border border-yellow-500 rounded-xl p-6">
          <h2>Career</h2>
          <h1 className="text-xl mt-5">
            AI / ML Engineer
          </h1>
        </div>

        <div className="bg-slate-800 border border-pink-500 rounded-xl p-6">
          <h2>Salary</h2>
          <h1 className="text-3xl mt-5">
            12-18 LPA
          </h1>
        </div>

      </div>

    </div>

  );
}