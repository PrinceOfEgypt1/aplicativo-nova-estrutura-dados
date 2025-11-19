import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, AlertCircle, Info, X } from 'lucide-react';
import { useEffect } from 'react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  message: string;
  type: ToastType;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export function Toast({
  message,
  type,
  isVisible,
  onClose,
  duration = 4000
}: ToastProps) {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const variants = {
    success: {
      icon: CheckCircle2,
      bgClass: 'bg-emerald-500/10 border-emerald-500/50',
      iconClass: 'text-emerald-500',
      textClass: 'text-emerald-100'
    },
    error: {
      icon: XCircle,
      bgClass: 'bg-red-500/10 border-red-500/50',
      iconClass: 'text-red-500',
      textClass: 'text-red-100'
    },
    warning: {
      icon: AlertCircle,
      bgClass: 'bg-amber-500/10 border-amber-500/50',
      iconClass: 'text-amber-500',
      textClass: 'text-amber-100'
    },
    info: {
      icon: Info,
      bgClass: 'bg-blue-500/10 border-blue-500/50',
      iconClass: 'text-blue-500',
      textClass: 'text-blue-100'
    }
  };

  const config = variants[type];
  const Icon = config.icon;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 100, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 100, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="fixed top-20 right-4 z-50 max-w-md"
          role="alert"
          aria-live="polite"
        >
          <div
            className={`${config.bgClass} border rounded-lg shadow-lg backdrop-blur-sm p-4 flex items-start gap-3`}
          >
            <Icon className={`${config.iconClass} h-5 w-5 flex-shrink-0 mt-0.5`} aria-hidden="true" />
            <p className={`${config.textClass} text-sm flex-1`}>{message}</p>
            <button
              onClick={onClose}
              className={`${config.iconClass} hover:opacity-70 transition-opacity flex-shrink-0`}
              aria-label="Fechar notificação"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
