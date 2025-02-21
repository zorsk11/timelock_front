export interface SettingsCardProps {
    title: string;
    oldPhone?: string;
    newPhone?: string;
    oldEmail?: string;
    newEmail?: string;
    onOldPhoneChange?: (value: string) => void;
    onNewPhoneChange?: (value: string) => void;
    onOldEmailChange?: (value: string) => void;
    onNewEmailChange?: (value: string) => void;
    onSave: () => void;
  }
  