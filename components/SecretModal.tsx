
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SecretCodeConfig } from '../types';

interface SecretModalProps {
  config: SecretCodeConfig;
  onClose: () => void;
}

export const SecretModal: React.FC<SecretModalProps> = ({ config, onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-[2px]">
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ duration: 0.2, ease: [0.1, 0.9, 0.2, 1] }}
        className="bg-[#f3f4f9] w-full max-w-[320px] rounded-[28px] shadow-2xl overflow-hidden flex flex-col"
      >
        <div className="p-6 pt-8">
          <h2 className="text-2xl font-normal text-[#1b1b1f] mb-2 leading-tight">
            {config.title}
          </h2>
          <p className="text-sm text-[#44474e] mb-6 font-medium">
            {config.subtitle}
          </p>

          <div className="space-y-5 max-h-[50vh] overflow-y-auto pr-1 custom-scrollbar">
            {config.infoList.map((info, idx) => (
              <div key={idx} className="flex flex-col border-b border-[#e1e2e9] last:border-0 pb-3 last:pb-0">
                <span className="text-[11px] font-bold text-[#005ac1] uppercase tracking-[0.05em] mb-1">
                  {info.label}
                </span>
                <span className="text-lg text-[#1b1b1f] font-mono break-all leading-snug">
                  {info.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="px-6 py-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#005ac1] text-[#ffffff] font-semibold rounded-full text-sm shadow-sm active:bg-[#004a9e] active:scale-95 transition-all"
          >
            Aceptar
          </button>
        </div>
      </motion.div>
    </div>
  );
};
