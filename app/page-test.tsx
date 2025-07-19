"use client";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl text-green-400 mb-4">Portfolio Terminal</h1>
      <p className="text-green-300">Testing if the page loads correctly...</p>
      <div className="mt-8 p-4 border border-green-400/30 rounded">
        <p className="text-green-400">Version: 1.38.38</p>
        <p className="text-green-400">Status: Working</p>
      </div>
    </div>
  );
}
