
import React, { useState } from 'react';
import { Plus, Trash2, ArrowLeft, Save, ChevronRight, X, Settings2, Info, Users, Shield } from 'lucide-react';
import { AppSettings, SecretCodeConfig, SecretInfo, Contact } from '../types';

interface AdminPanelProps {
  settings: AppSettings;
  onUpdate: (s: AppSettings) => void;
  onBack: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ settings, onUpdate, onBack }) => {
  const [activeTab, setActiveTab] = useState<'CODES' | 'CONTACTS'>('CODES');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingContactId, setEditingContactId] = useState<string | null>(null);
  
  const [localConfigs, setLocalConfigs] = useState(settings.configs);
  const [localContacts, setLocalContacts] = useState(settings.contacts);

  const handleSave = () => {
    onUpdate({ ...settings, configs: localConfigs, contacts: localContacts });
    onBack();
  };

  // Code Management
  const addConfig = () => {
    const newConfig: SecretCodeConfig = {
      id: Date.now().toString(),
      code: '',
      title: 'Nuevo Código',
      subtitle: 'Información del sistema',
      infoList: [{ label: 'ID', value: '123456789' }]
    };
    setLocalConfigs([...localConfigs, newConfig]);
    setEditingId(newConfig.id);
  };

  const removeConfig = (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta configuración?')) {
      setLocalConfigs(localConfigs.filter(c => c.id !== id));
    }
  };

  const updateConfig = (id: string, updates: Partial<SecretCodeConfig>) => {
    setLocalConfigs(localConfigs.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  // Contact Management
  const addContact = () => {
    const newContact: Contact = {
      id: Date.now().toString(),
      name: 'Nuevo Contacto',
      phoneNumber: ''
    };
    setLocalContacts([...localContacts, newContact]);
    setEditingContactId(newContact.id);
  };

  const removeContact = (id: string) => {
    if (confirm('¿Eliminar contacto?')) {
      setLocalContacts(localContacts.filter(c => c.id !== id));
    }
  };

  const updateContact = (id: string, updates: Partial<Contact>) => {
    setLocalContacts(localContacts.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const currentEditing = localConfigs.find(c => c.id === editingId);
  const currentEditingContact = localContacts.find(c => c.id === editingContactId);

  const isEditing = editingId !== null || editingContactId !== null;

  return (
    <div className="flex-1 flex flex-col bg-[#fdfcff] overflow-hidden h-full text-[#1b1b1f]">
      {/* Header */}
      <div className="bg-[#fdfcff] px-4 py-4 flex items-center justify-between border-b border-[#e1e2e9] shrink-0">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => {
              if (editingId) setEditingId(null);
              else if (editingContactId) setEditingContactId(null);
              else onBack();
            }} 
            className="p-2 rounded-full active:bg-[#e1e2e9]"
          >
            <ArrowLeft size={24} className="text-[#44474e]" />
          </button>
          <h1 className="text-xl font-medium">
            {editingId ? 'Editar código' : editingContactId ? 'Editar contacto' : 'Administración'}
          </h1>
        </div>
        {!isEditing && (
          <button 
            onClick={handleSave}
            className="bg-[#005ac1] text-white px-5 py-2 rounded-full font-medium active:bg-[#004a9e] shadow-sm flex items-center gap-2"
          >
            <Save size={18} />
            <span>Listo</span>
          </button>
        )}
      </div>

      {/* Admin Tabs */}
      {!isEditing && (
        <div className="flex bg-white border-b border-[#e1e2e9]">
          <button 
            onClick={() => setActiveTab('CODES')}
            className={`flex-1 py-3 text-sm font-bold border-b-2 transition-all ${activeTab === 'CODES' ? 'border-[#005ac1] text-[#005ac1]' : 'border-transparent text-gray-400'}`}
          >
            Códigos Secretos
          </button>
          <button 
            onClick={() => setActiveTab('CONTACTS')}
            className={`flex-1 py-3 text-sm font-bold border-b-2 transition-all ${activeTab === 'CONTACTS' ? 'border-[#005ac1] text-[#005ac1]' : 'border-transparent text-gray-400'}`}
          >
            Contactos Ficticios
          </button>
        </div>
      )}

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {!isEditing ? (
          activeTab === 'CODES' ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-[#d3e4ff] rounded-[24px] text-[#001d35]">
                <Shield size={20} className="shrink-0" />
                <p className="text-sm font-medium">Gestiona códigos que activan ventanas de información oculta.</p>
              </div>
              
              {localConfigs.map(config => (
                <div 
                  key={config.id}
                  onClick={() => setEditingId(config.id)}
                  className="bg-[#f3f4f9] rounded-[24px] p-5 flex items-center justify-between active:scale-[0.98] transition-all"
                >
                  <div className="flex-1">
                    <span className="text-lg font-bold font-mono text-[#005ac1]">{config.code || '*#...#'}</span>
                    <h3 className="font-medium text-sm text-[#1b1b1f] mt-1">{config.title}</h3>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); removeConfig(config.id); }} className="p-3 text-[#ba1a1a] rounded-full active:bg-[#ffdad6]">
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}

              <button onClick={addConfig} className="w-full py-5 border-2 border-dashed border-[#c4c6cf] rounded-[24px] flex items-center justify-center gap-3 text-[#44474e] font-bold active:bg-[#eff1f8] transition-all">
                <Plus size={24} />
                <span>Nuevo código</span>
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-[#e1e2e9] rounded-[24px] text-[#1b1b1f]">
                <Users size={20} className="shrink-0" />
                <p className="text-sm font-medium">Añade contactos que aparecerán en la lista del teléfono.</p>
              </div>

              {localContacts.map(contact => (
                <div 
                  key={contact.id}
                  onClick={() => setEditingContactId(contact.id)}
                  className="bg-[#f3f4f9] rounded-[24px] p-5 flex items-center justify-between active:scale-[0.98] transition-all"
                >
                  <div className="flex-1">
                    <h3 className="font-bold text-[#1b1b1f]">{contact.name}</h3>
                    <p className="text-xs text-[#44474e] mt-1 font-mono">{contact.phoneNumber}</p>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); removeContact(contact.id); }} className="p-3 text-[#ba1a1a] rounded-full active:bg-[#ffdad6]">
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}

              <button onClick={addContact} className="w-full py-5 border-2 border-dashed border-[#c4c6cf] rounded-[24px] flex items-center justify-center gap-3 text-[#44474e] font-bold active:bg-[#eff1f8] transition-all">
                <Plus size={24} />
                <span>Nuevo contacto</span>
              </button>
            </div>
          )
        ) : editingId ? (
          /* CODE EDITING UI */
          <div className="space-y-6 pb-20">
            <div className="bg-white rounded-[28px] p-6 shadow-sm border border-[#e1e2e9] space-y-5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#005ac1] px-1 uppercase tracking-wider">Código activador</label>
                <input type="text" value={currentEditing?.code} onChange={(e) => updateConfig(editingId, { code: e.target.value })} className="w-full bg-[#f3f4f9] border-0 rounded-2xl px-5 py-4 text-lg font-mono focus:ring-2 focus:ring-[#005ac1] outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#005ac1] px-1 uppercase tracking-wider">Título del modal</label>
                <input type="text" value={currentEditing?.title} onChange={(e) => updateConfig(editingId, { title: e.target.value })} className="w-full bg-[#f3f4f9] border-0 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-[#005ac1] outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#005ac1] px-1 uppercase tracking-wider">Subtítulo</label>
                <input type="text" value={currentEditing?.subtitle} onChange={(e) => updateConfig(editingId, { subtitle: e.target.value })} className="w-full bg-[#f3f4f9] border-0 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-[#005ac1] outline-none" />
              </div>
            </div>

            <div className="bg-white rounded-[28px] p-6 shadow-sm border border-[#e1e2e9] space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-bold text-[#44474e] uppercase tracking-widest">Información interna</h2>
                <button onClick={() => {
                  if (currentEditing) {
                    const newList = [...currentEditing.infoList, { label: '', value: '' }];
                    updateConfig(editingId, { infoList: newList });
                  }
                }} className="bg-[#d3e4ff] text-[#001d35] px-4 py-2 rounded-full text-xs font-bold">Nuevo campo</button>
              </div>
              <div className="space-y-6">
                {currentEditing?.infoList.map((item, idx) => (
                  <div key={idx} className="p-4 bg-[#f3f4f9] rounded-2xl border border-[#e1e2e9] space-y-3 relative">
                    <button onClick={() => {
                      const newList = currentEditing.infoList.filter((_, i) => i !== idx);
                      updateConfig(editingId, { infoList: newList });
                    }} className="absolute -top-3 -right-3 w-8 h-8 bg-[#ffdad6] text-[#ba1a1a] rounded-full flex items-center justify-center shadow-sm">
                      <X size={16} />
                    </button>
                    <input type="text" placeholder="Etiqueta" value={item.label} onChange={(e) => {
                      const newList = [...currentEditing.infoList];
                      newList[idx].label = e.target.value;
                      updateConfig(editingId, { infoList: newList });
                    }} className="w-full bg-transparent border-b border-gray-300 py-1 text-sm focus:border-[#005ac1] outline-none" />
                    <input type="text" placeholder="Valor" value={item.value} onChange={(e) => {
                      const newList = [...currentEditing.infoList];
                      newList[idx].value = e.target.value;
                      updateConfig(editingId, { infoList: newList });
                    }} className="w-full bg-transparent border-b border-gray-300 py-1 text-sm focus:border-[#005ac1] outline-none font-mono" />
                  </div>
                ))}
              </div>
            </div>
            <button onClick={() => setEditingId(null)} className="w-full py-4 bg-[#005ac1] text-white rounded-full font-bold shadow-lg">Confirmar</button>
          </div>
        ) : (
          /* CONTACT EDITING UI */
          <div className="space-y-6 pb-20">
            <div className="bg-white rounded-[28px] p-6 shadow-sm border border-[#e1e2e9] space-y-5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#005ac1] px-1 uppercase tracking-wider">Nombre completo</label>
                <input type="text" value={currentEditingContact?.name} onChange={(e) => updateContact(editingContactId!, { name: e.target.value })} className="w-full bg-[#f3f4f9] border-0 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-[#005ac1] outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#005ac1] px-1 uppercase tracking-wider">Número de teléfono</label>
                <input type="text" value={currentEditingContact?.phoneNumber} onChange={(e) => updateContact(editingContactId!, { phoneNumber: e.target.value })} className="w-full bg-[#f3f4f9] border-0 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-[#005ac1] outline-none font-mono" />
              </div>
            </div>
            <button onClick={() => setEditingContactId(null)} className="w-full py-4 bg-[#005ac1] text-white rounded-full font-bold shadow-lg">Confirmar</button>
          </div>
        )}
      </div>

      <div className="pt-4 pb-8 opacity-20 text-center shrink-0">
        <Settings2 size={24} className="mx-auto mb-1" />
        <p className="text-[9px] font-bold tracking-widest uppercase">Dialer System Settings</p>
      </div>
    </div>
  );
};
