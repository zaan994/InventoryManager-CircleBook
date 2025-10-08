import React from 'react';
import { AlertTriangle, X, Trash2 } from 'lucide-react';

const ConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Confirm Deletion",
  message = "Are you sure you want to delete this item? This action cannot be undone.",
  confirmText = "Delete",
  cancelText = "Cancel",
  type = "danger"
}) => {
  if (!isOpen) return null;

  const getTypeStyles = () => {
    switch (type) {
      case 'danger':
        return {
          gradient: 'from-red-500 to-rose-600',
          iconBg: 'bg-red-500/10 border-red-500/20',
          iconColor: 'text-red-400',
          button: 'bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700',
          accent: 'border-red-500/30',
          glow: 'shadow-lg shadow-red-500/20'
        };
      case 'warning':
        return {
          gradient: 'from-amber-500 to-orange-600',
          iconBg: 'bg-amber-500/10 border-amber-500/20',
          iconColor: 'text-amber-400',
          button: 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700',
          accent: 'border-amber-500/30',
          glow: 'shadow-lg shadow-amber-500/20'
        };
      case 'info':
        return {
          gradient: 'from-blue-500 to-cyan-600',
          iconBg: 'bg-blue-500/10 border-blue-500/20',
          iconColor: 'text-blue-400',
          button: 'bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700',
          accent: 'border-blue-500/30',
          glow: 'shadow-lg shadow-blue-500/20'
        };
      default:
        return {
          gradient: 'from-red-500 to-rose-600',
          iconBg: 'bg-red-500/10 border-red-500/20',
          iconColor: 'text-red-400',
          button: 'bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700',
          accent: 'border-red-500/30',
          glow: 'shadow-lg shadow-red-500/20'
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 w-full max-w-md transform transition-all duration-300 scale-100">
        {/* Gradient Background Effect */}
        <div className={`absolute inset-0 bg-gradient-to-br ${styles.gradient} opacity-5 rounded-2xl`}></div>
        
        {/* Header */}
        <div className={`relative flex items-center justify-between p-6 border-b ${styles.accent}`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${styles.iconBg} border backdrop-blur-sm ${styles.glow}`}>
              <AlertTriangle className={`h-5 w-5 ${styles.iconColor}`} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              <p className="text-sm text-gray-600 mt-1">Please confirm your action</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100/80 rounded-xl transition-all duration-300 text-gray-500 hover:text-gray-700 backdrop-blur-sm border border-white/20"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="relative p-6">
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-xl ${styles.iconBg} border backdrop-blur-sm flex-shrink-0 ${styles.glow}`}>
              <Trash2 className={`h-6 w-6 ${styles.iconColor}`} />
            </div>
            <div className="flex-1">
              <p className="text-gray-700 leading-relaxed">{message}</p>
              <div className="mt-4 p-4 bg-gray-50/80 rounded-xl border border-gray-200/50 backdrop-blur-sm">
                <p className="text-sm text-gray-600 font-medium mb-3">This action will:</p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-red-400 rounded-full flex-shrink-0"></div>
                    <span>Permanently delete this item</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-red-400 rounded-full flex-shrink-0"></div>
                    <span>Remove it from all reports</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-red-400 rounded-full flex-shrink-0"></div>
                    <span>Cannot be recovered</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`relative flex gap-3 p-6 border-t ${styles.accent}`}>
          <button
            onClick={onClose}
            className="flex-1 group/btn px-4 py-3 bg-gray-100/80 hover:bg-gray-200/80 border border-gray-200/50 text-gray-700 hover:text-gray-900 font-semibold rounded-xl transition-all duration-300 hover:shadow-lg backdrop-blur-sm flex items-center justify-center gap-2"
          >
            <X className="h-4 w-4 transition-transform group-hover/btn:scale-110" />
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 group/btn px-4 py-3 ${styles.button} text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg shadow-md flex items-center justify-center gap-2`}
          >
            <Trash2 className="h-4 w-4 transition-transform group-hover/btn:scale-110" />
            {confirmText}
          </button>
        </div>

        {/* Corner Accents */}
        <div className={`absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 ${styles.gradient.replace('from-', 'border-').replace(' to-', '-500 border-l-')} rounded-tl-2xl opacity-60`}></div>
        <div className={`absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 ${styles.gradient.replace('from-', 'border-').replace(' to-', '-500 border-r-')} rounded-tr-2xl opacity-60`}></div>
        <div className={`absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 ${styles.gradient.replace('from-', 'border-').replace(' to-', '-500 border-l-')} rounded-bl-2xl opacity-60`}></div>
        <div className={`absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 ${styles.gradient.replace('from-', 'border-').replace(' to-', '-500 border-r-')} rounded-br-2xl opacity-60`}></div>

        {/* Hover Border Effect */}
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${styles.gradient} opacity-0 transition-opacity duration-300 -z-10`}>
          <div className="absolute inset-[1px] rounded-2xl bg-white/90 backdrop-blur-xl"></div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;