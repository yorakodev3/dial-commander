
export interface SecretInfo {
  label: string;
  value: string;
}

export interface SecretCodeConfig {
  id: string;
  code: string; // e.g. "*#06#"
  title: string;
  subtitle: string;
  infoList: SecretInfo[];
}

export interface Contact {
  id: string;
  name: string;
  phoneNumber: string;
}

export interface AppSettings {
  adminPin: string;
  configs: SecretCodeConfig[];
  contacts: Contact[];
}

export type ViewState = 'DIALER' | 'ADMIN_AUTH' | 'ADMIN_PANEL';
