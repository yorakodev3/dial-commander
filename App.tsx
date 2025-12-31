
import React, { useState, useEffect, useCallback } from 'react';
import { Dialer } from './components/Dialer';
import { AdminAuth } from './components/AdminAuth';
import { AdminPanel } from './components/AdminPanel';
import { SecretModal } from './components/SecretModal';
import { SecretCodeConfig, AppSettings, ViewState } from './types';
import { DEFAULT_CONFIGS, DEFAULT_CONTACTS, ADMIN_TRIGGER_CODE, DEFAULT_PIN } from './constants';
import { AnimatePresence, motion } from 'framer-motion';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('DIALER');
  const [input, setInput] = useState<string>('');
  const [activeConfig, setActiveConfig] = useState<SecretCodeConfig | null>(null);
  
  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('dialer_settings_v3');
    if (saved) return JSON.parse(saved);
    return {
      adminPin: DEFAULT_PIN,
      configs: DEFAULT_CONFIGS,
      contacts: DEFAULT_CONTACTS
    };
  });

  // Persist settings
  useEffect(() => {
    localStorage.setItem('dialer_settings_v3', JSON.stringify(settings));
  }, [settings]);

  // Handle secret code detection
  useEffect(() => {
    if (!input) return;

    if (input === ADMIN_TRIGGER_CODE) {
      setTimeout(() => {
        setView('ADMIN_AUTH');
        setInput('');
      }, 150);
      return;
    }

    const matchedConfig = settings.configs.find(c => c.code === input && c.code.length > 0);
    if (matchedConfig) {
      setTimeout(() => {
        setActiveConfig(matchedConfig);
        setInput('');
      }, 200);
    }
  }, [input, settings.configs]);

  const updateSettings = useCallback((newSettings: AppSettings) => {
    setSettings(newSettings);
  }, []);

  return (
    <div className="h-screen w-full flex flex-col bg-[#fdfcff] overflow-hidden relative">
      <AnimatePresence mode="wait">
        {view === 'DIALER' && (
          <motion.div 
            key="dialer-view" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="h-full w-full"
          >
            <Dialer 
              input={input} 
              setInput={setInput} 
              onOpenAdmin={() => setView('ADMIN_AUTH')}
              contacts={settings.contacts}
            />
          </motion.div>
        )}
        
        {view === 'ADMIN_AUTH' && (
          <motion.div 
            key="auth-view" 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: -20 }}
            className="h-full w-full"
          >
            <AdminAuth 
              pin={settings.adminPin} 
              onSuccess={() => setView('ADMIN_PANEL')} 
              onCancel={() => setView('DIALER')} 
            />
          </motion.div>
        )}

        {view === 'ADMIN_PANEL' && (
          <motion.div 
            key="panel-view" 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: -20 }}
            className="h-full w-full"
          >
            <AdminPanel 
              settings={settings} 
              onUpdate={updateSettings} 
              onBack={() => setView('DIALER')} 
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeConfig && (
          <SecretModal 
            config={activeConfig} 
            onClose={() => setActiveConfig(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
