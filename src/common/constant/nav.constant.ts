import { AppWindowIcon, Grid2X2Icon, HomeIcon, TagIcon } from 'lucide-react';
import { NavigationItem } from '../type/nav.type';

export const PATH_TITLE = {
  dashboard: 'Dashboard',
  post: 'Post',
  tag: 'Tag',
  category: 'Category',
};

export const PATH_TARGET = {
  dashboard: 'dashboard',
  post: 'posts',
  tag: 'tags',
  category: 'categories',
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
} = {
  dashboard: {
    title: `${PATH_TITLE.dashboard}`,
    path: `${PATH_BASE.admin}`,
    icon: HomeIcon,
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
