
import { SecretCodeConfig, Contact } from './types';

export const DEFAULT_CONFIGS: SecretCodeConfig[] = [
  {
    id: '1',
    code: '*#06#',
    title: 'Información del dispositivo',
    subtitle: 'Identificadores únicos del terminal',
    infoList: [
      { label: 'IMEI 1', value: '358291004928172' },
      { label: 'IMEI 2', value: '358291004928180' },
      { label: 'SN', value: 'R58M123ABC456' }
    ]
  },
  {
    id: '2',
    code: '*#123#',
    title: 'Estado de Red',
    subtitle: 'Configuración técnica de red',
    infoList: [
      { label: 'Operador', value: 'Movistar' },
      { label: 'MCC/MNC', value: '214/07' },
      { label: 'Signal', value: '-84 dBm' }
    ]
  }
];

export const DEFAULT_CONTACTS: Contact[] = [
  { id: 'c1', name: 'Mamá', phoneNumber: '600123456' },
  { id: 'c2', name: 'Juan Pérez', phoneNumber: '611987654' },
  { id: 'c3', name: 'Emergencias', phoneNumber: '112' },
  { id: 'c4', name: 'Oficina Central', phoneNumber: '912345678' }
];

export const ADMIN_TRIGGER_CODE = '*#9999#';
export const DEFAULT_PIN = '1234';
