export default function AuthLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center">
        <div className="relative w-20 h-20 mb-4">
          <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
          <div 
            className="absolute inset-0 border-4 border-t-transparent rounded-full animate-spin"
            style={{ borderColor: '#1173D8 transparent transparent transparent' }}
          ></div>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Please Wait</h3>
        <p className="text-sm text-gray-500">Processing your request...</p>
      </div>
    </div>
  );
}
