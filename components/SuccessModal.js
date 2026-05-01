import { CheckCircle, X } from 'lucide-react';

export default function SuccessModal({ isOpen, onClose, message, title = "Success!" }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden animate-scale-in"
      >
        {/* Header */}
        <div 
          className="px-6 py-4 flex items-center justify-between"
          style={{
            background: 'linear-gradient(135deg, #1173D8 0%, #04294E 100%)'
          }}
        >
          <div className="flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-white" />
            <h3 className="text-xl font-bold text-white">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 text-center">
          <div 
            className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, rgba(17, 115, 216, 0.1) 0%, rgba(4, 41, 78, 0.1) 100%)'
            }}
          >
            <CheckCircle 
              className="w-12 h-12"
              style={{ color: '#1173D8' }}
            />
          </div>
          
          <p className="text-gray-700 text-lg mb-6">
            {message}
          </p>

          <button
            onClick={onClose}
            className="w-full px-6 py-3 text-white font-semibold rounded-lg transition-all hover:opacity-90"
            style={{
              background: 'linear-gradient(135deg, #1173D8 0%, #04294E 100%)'
            }}
          >
            Continue
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
