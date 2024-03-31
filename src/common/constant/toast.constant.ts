import { ToastActionElement } from '@/components/ui/toast';

export const TOAST_CONSTANT = {
  success: ({
    description,
    title,
    action,
  }: {
    description: string;
    title?: string;
    action?: ToastActionElement;
  }) => ({
    variant: 'default',
    description,
    title,
    action,
  }),
};
