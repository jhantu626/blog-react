
const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
        <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce animation-delay-200"></div>
        <div className="w-4 h-4 bg-red-500 rounded-full animate-bounce animation-delay-600"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
