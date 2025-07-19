export default function Loading() {
  return (
    <div className="min-h-screen bg-black text-green-400 font-mono flex items-center justify-center">
      <div className="text-center space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-green-300">Portfolio Terminal v36</h1>
          <p className="text-lg text-green-400/80">Initializing enhanced system...</p>
        </div>

        {/* Terminal-style loading animation */}
        <div className="border border-green-400/30 rounded bg-black/50 p-6 max-w-md mx-auto">
          <div className="space-y-2 text-sm">
            <div className="text-green-400 animate-pulse">Loading...</div>
            <div className="text-green-400/80">$ systemctl start portfolio-terminal</div>
            <div className="text-green-400/80">$ Loading modules...</div>
            <div className="text-green-400/80">$ Ready!</div>
          </div>
          
          {/* Loading bar */}
          <div className="mt-4 bg-green-400/20 rounded h-2 overflow-hidden">
            <div className="bg-green-400 h-full w-full animate-pulse" />
          </div>
        </div>

        {/* Animated cursor */}
        <div className="text-xl animate-pulse">_</div>

        <div className="text-xs text-green-400/40">
          Version 36 | Build #36 | Loading...
        </div>
      </div>
    </div>
  );
}
