import { LogOut, X } from 'lucide-react';

export default function LogoutModal({ isOpen, onClose, onConfirm, userName }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.98) 100%)'
        }}
      >
        {/* Header */}
        <div 
          className="px-6 py-4 flex items-center justify-between"
          style={{
            background: 'linear-gradient(135deg, #1173D8 0%, #04294E 100%)'
          }}
        >
          <div className="flex items-center gap-3">
            <LogOut className="w-6 h-6 text-white" />
            <h3 className="text-xl font-bold text-white">Logout</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-700 text-center mb-2">
            Are you sure you want to logout?
          </p>
          {userName && (
            <p className="text-sm text-gray-500 text-center mb-6">
              Logged in as: <span className="font-semibold text-gray-700">{userName}</span>
            </p>
          )}

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-2.5 text-white font-semibold rounded-lg transition-all hover:opacity-90"
              style={{
                background: 'linear-gradient(135deg, #1173D8 0%, #04294E 100%)'
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
