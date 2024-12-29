export const AestheticBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Dark base background */}
      <div className="absolute inset-0 bg-black" />
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/30 to-black opacity-60" />
      
      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-purple-900/10 rounded-full filter blur-[128px] animate-float-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-blue-900/10 rounded-full filter blur-[128px] animate-float-slow animation-delay-2000" />
      
      {/* Noise texture overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.15]" />
    </div>
  );
};