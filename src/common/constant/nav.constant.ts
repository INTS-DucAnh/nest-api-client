import { AppWindowIcon, Grid2X2Icon, HomeIcon, TagIcon, UserRoundIcon } from 'lucide-react';
import { NavigationItem } from '../type/nav.type';

export const PATH_TITLE = {
  dashboard: 'Dashboard',
  post: 'Post',
  tag: 'Tag',
  category: 'Category',
  user: 'User',
};

export const PATH_TARGET = {
  dashboard: 'dashboard',
  post: 'posts',
  tag: 'tags',
  category: 'categories',
  user: 'users',
};

export const PATH_ACTION = {
  create: 'create',
  edit: 'edit',
};

export const PATH_BASE = {
  admin: 'admin',
  user: '',
};

export const PATH_ROOT: { user: NavigationItem; admin: NavigationItem } = {
  user: {
    title: 'User',
    path: `${PATH_BASE.user}`,
    icon: HomeIcon,
  },
  admin: {
    title: 'Admin',
    path: `${PATH_BASE.admin}`,
    icon: HomeIcon,
  },
};

export const PRIVATE_NAV_COMPO: {
  dashboard: NavigationItem;
  post: NavigationItem;
  tag: NavigationItem;
  category: NavigationItem;
  user: NavigationItem;
} = {
  dashboard: {
    title: `${PATH_TITLE.dashboard}`,
    path: `${PATH_BASE.admin}`,
    icon: HomeIcon,
  },
  user: {
    title: `${PATH_TITLE.user}`,
    path: `${PATH_BASE.admin}/${PATH_TARGET.user}`,
    icon: UserRoundIcon,
  },
  post: {
    title: `${PATH_TITLE.post}`,
    path: `${PATH_BASE.admin}/${PATH_TARGET.post}`,
    icon: AppWindowIcon,
  },
  tag: {
    title: `${PATH_TITLE.tag}`,
    path: `${PATH_BASE.admin}/${PATH_TARGET.tag}`,
    icon: TagIcon,
  },
  category: {
    title: `${PATH_TITLE.category}`,
    path: `${PATH_BASE.admin}/${PATH_TARGET.category}`,
    icon: Grid2X2Icon,
  },
};

export const PATH_PREFIX_BREAD_CRUMB: { [key: string]: string } = {
  admin: '/admin',
  post: 'admin/posts',
  tag: 'admin/posts',
  category: 'admin/posts',
  user: 'admin/posts',
};
