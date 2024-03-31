export type ToastVariant = 'desctructure' | 'default';

export type ToastType = {
  title?: string;
  description: string;
  action?: React.FC;
  variant: ToastVariant;
};
