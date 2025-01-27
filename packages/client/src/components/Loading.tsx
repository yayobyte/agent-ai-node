export const Loading = () => (
    <div className="flex justify-start p-3">
      <div className="animate-bounce h-2 w-2 bg-blue-500 rounded-full mr-1"></div>
      <div className="animate-bounce h-2 w-2 bg-blue-500 rounded-full mr-1" style={{ animationDelay: '0.2s' }}></div>
      <div className="animate-bounce h-2 w-2 bg-blue-500 rounded-full" style={{ animationDelay: '0.4s' }}></div>
    </div>
  );