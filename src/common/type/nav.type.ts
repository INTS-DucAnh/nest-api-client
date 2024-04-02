import { IconProps } from '@radix-ui/react-icons/dist/types';
import { LucideIcon } from 'lucide-react';
export interface NavigationItem {
  path: string;
  title: string;
  icon:
    | React.ForwardRefExoticComponent<
        IconProps & React.RefAttributes<SVGSVGElement>
      >
    | LucideIcon;
}
