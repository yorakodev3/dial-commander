
import React, { useState } from 'react';
import { Phone, Delete, Star, Clock, Users, Grid, Search, MoreVertical } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Contact } from '../types';

interface DialerProps {
  input: string;
  setInput: (val: string) => void;
  onOpenAdmin: () => void;
  contacts: Contact[];
}

const KEYPAD = [
  { val: '1', sub: ' ' },
  { val: '2', sub: 'ABC' },
  { val: '3', sub: 'DEF' },
  { val: '4', sub: 'GHI' },
  { val: '5', sub: 'JKL' },
  { val: '6', sub: 'MNO' },
  { val: '7', sub: 'PQRS' },
  { val: '8', sub: 'TUV' },
  { val: '9', sub: 'WXYZ' },
  { val: '*', sub: ' ' },
  { val: '0', sub: '+' },
  { val: '#', sub: ' ' },
];

export const Dialer: React.FC<DialerProps> = ({ input, setInput, onOpenAdmin, contacts }) => {
  const [isDialpadVisible, setIsDialpadVisible] = useState(true);
  const [activeTab, setActiveTab] = useState<'FAVORITES' | 'RECENTS' | 'CONTACTS'>('RECENTS');

  const handleKeyClick = (val: string) => {
    setInput(input + val);
    if (window.navigator.vibrate) {
      window.navigator.vibrate(10);
    }
  };

  const handleBackspace = () => {
    setInput(input.slice(0, -1));
  };

  const handleLongBackspace = () => {
    setInput('');
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const sortedContacts = [...contacts].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="flex flex-col h-full bg-[#fdfcff] select-none text-[#1b1b1f]">
      {/* Top Search Bar */}
      <div className="px-4 pt-4 pb-2 shrink-0">
        <div className="bg-[#eff1f8] h-12 rounded-full flex items-center px-4 gap-3 text-gray-600 shadow-sm border border-gray-100">
          <Search size={20} className="text-[#44474e]" />
          <span className="flex-1 text-[#44474e] text-sm">Buscar contactos</span>
          <MoreVertical size={20} className="text-[#44474e] cursor-pointer" onClick={onOpenAdmin} />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative overflow-hidden flex flex-col">
        {/* Real-time Number Display (Always visible if input exists) */}
        <AnimatePresence>
          {input.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full bg-[#fdfcff] py-6 px-8 z-30 shadow-sm border-b border-gray-50 text-center shrink-0"
            >
              <div className="text-4xl text-[#1b1b1f] font-normal tracking-tight break-all leading-tight">
                {input}
              </div>
              <button className="text-[#005ac1] font-medium text-sm px-4 py-2 mt-4 rounded-full active:bg-[#d3e4ff] transition-colors">
                Crear contacto nuevo
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'CONTACTS' ? (
            <div className="pb-32">
              {sortedContacts.length > 0 ? (
                sortedContacts.map((contact, idx) => (
                  <div key={contact.id} className="flex items-center gap-4 px-6 py-3 active:bg-[#eff1f8] transition-colors">
                    <div className="w-10 h-10 rounded-full bg-[#d3e4ff] flex items-center justify-center text-[#001d35] font-bold text-sm">
                      {getInitials(contact.name)}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-base font-medium text-[#1b1b1f]">{contact.name}</span>
                      <span className="text-xs text-[#44474e]">{contact.phoneNumber}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center pt-20 text-[#44474e]">
                  <Users size={48} strokeWidth={1.5} className="mb-4 opacity-20" />
                  <p className="text-sm">No tienes contactos</p>
                </div>
              )}
            </div>
          ) : activeTab === 'RECENTS' ? (
            <div className="flex flex-col items-center justify-center h-full text-[#44474e] opacity-40">
              <Clock size={48} strokeWidth={1.5} className="mb-4" />
              <p className="text-sm">No hay llamadas recientes</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-[#44474e] opacity-40">
              <Star size={48} strokeWidth={1.5} className="mb-4" />
              <p className="text-sm">No hay favoritos</p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="flex justify-around items-center h-20 bg-[#fdfcff] border-t border-[#f3f3f7] shrink-0">
        <div 
          onClick={() => setActiveTab('FAVORITES')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'FAVORITES' ? 'text-[#001d35]' : 'text-[#44474e]'}`}
        >
          <div className={`relative flex flex-col items-center`}>
            {activeTab === 'FAVORITES' && <div className="absolute -top-1 w-12 h-8 bg-[#d3e4ff] rounded-full -z-10" />}
            <Star size={24} />
            <span className={`text-[11px] ${activeTab === 'FAVORITES' ? 'font-bold' : 'font-medium'}`}>Favoritos</span>
          </div>
        </div>
        <div 
          onClick={() => setActiveTab('RECENTS')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'RECENTS' ? 'text-[#001d35]' : 'text-[#44474e]'}`}
        >
          <div className={`relative flex flex-col items-center`}>
            {activeTab === 'RECENTS' && <div className="absolute -top-1 w-12 h-8 bg-[#d3e4ff] rounded-full -z-10" />}
            <Clock size={24} />
            <span className={`text-[11px] ${activeTab === 'RECENTS' ? 'font-bold' : 'font-medium'}`}>Recientes</span>
          </div>
        </div>
        <div 
          onClick={() => setActiveTab('CONTACTS')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'CONTACTS' ? 'text-[#001d35]' : 'text-[#44474e]'}`}
        >
          <div className={`relative flex flex-col items-center`}>
            {activeTab === 'CONTACTS' && <div className="absolute -top-1 w-12 h-8 bg-[#d3e4ff] rounded-full -z-10" />}
            <Users size={24} />
            <span className={`text-[11px] ${activeTab === 'CONTACTS' ? 'font-bold' : 'font-medium'}`}>Contactos</span>
          </div>
        </div>
      </div>

      {/* Floating Dialpad Button (Native Android FAB) */}
      {!isDialpadVisible && (
        <button 
          onClick={() => setIsDialpadVisible(true)}
          className="fixed bottom-24 right-6 w-14 h-14 bg-[#d3e4ff] text-[#001d35] rounded-2xl flex items-center justify-center shadow-lg active:scale-95 transition-all z-50"
        >
          <Grid size={24} />
        </button>
      )}

      {/* Dialpad Overlay */}
      <AnimatePresence>
        {isDialpadVisible && (
          <motion.div 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-x-0 bottom-0 z-40 bg-[#fdfcff] shadow-[0_-8px_24px_rgba(0,0,0,0.08)] rounded-t-[32px] pb-8 pt-6 px-8"
          >
            <div className="grid grid-cols-3 gap-y-2 gap-x-6 mb-8 max-w-sm mx-auto">
              {KEYPAD.map((key) => (
                <button
                  key={key.val}
                  onClick={() => handleKeyClick(key.val)}
                  className="ripple flex flex-col items-center justify-center h-[72px] w-full rounded-full active:bg-[#e1e2e9] transition-colors relative"
                >
                  <span className="text-3xl font-normal text-[#1b1b1f]">{key.val}</span>
                  <span className="text-[10px] text-[#44474e] font-bold tracking-widest uppercase h-3">
                    {key.sub}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex justify-between items-center max-w-sm mx-auto px-4">
              <button 
                onClick={() => setIsDialpadVisible(false)}
                className="w-12 h-12 flex items-center justify-center text-[#44474e] active:bg-gray-100 rounded-full"
              >
                <Grid size={24} />
              </button>

              <button
                className="w-20 h-20 bg-[#34a853] rounded-[28px] flex items-center justify-center shadow-md active:scale-95 active:shadow-sm transition-all"
              >
                <Phone size={32} color="white" fill="white" />
              </button>

              <button
                onClick={handleBackspace}
                onContextMenu={(e) => { e.preventDefault(); handleLongBackspace(); }}
                className={`w-12 h-12 flex items-center justify-center rounded-full active:bg-gray-100 transition-all ${input.length === 0 ? 'invisible opacity-0' : 'visible opacity-100'}`}
              >
                <Delete size={24} className="text-[#44474e]" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
