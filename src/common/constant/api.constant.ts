export const REQUEST_OPTION: RequestInit = {
  credentials: 'include',
};

export const REQUEST_URL = `${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}`;

export const REQUEST_HOST = `${REQUEST_URL}/${process.env.REACT_APP_BACKEND_PREFIX}`;

export const REQUEST_PATH = {
  user: {
    base: 'user',
    getByEmail: () => `${REQUEST_PATH.user.base}/email`,
    sendOTP: () => `${REQUEST_PATH.user.base}/random-code`,
    signup: () => `${REQUEST_PATH.user.base}/sign-up`,
    checkOTP: () => `${REQUEST_PATH.user.base}/check-code`,
    resetPass: () => `${REQUEST_PATH.user.base}/reset-password`,
  },
  auth: {
    base: 'auth',
    logout: () => `${REQUEST_PATH.auth.base}/clear-cookie`,
    login: () => `${REQUEST_PATH.auth.base}/login`,
    refresh: () => `${REQUEST_PATH.auth.base}/refresh`,
  },
  post: {
    base: 'post',
    find: () => `${REQUEST_PATH.post.base}`,
    findByCategory: () => `${REQUEST_PATH.post.base}/find-by-category`,
    create: () => `${REQUEST_PATH.post.base}`,
    update: () => `${REQUEST_PATH.post.base}`,
    deleteOne: () => `${REQUEST_PATH.post.base}`,
    deleteMutiple: () => `${REQUEST_PATH.post.base}/mutiple`,
    mostLike: () => `${REQUEST_PATH.post.base}/most-like`,
  },
  tag: {
    base: 'tags',
    find: () => `${REQUEST_PATH.tag.base}`,
    create: () => `${REQUEST_PATH.tag.base}`,
    update: () => `${REQUEST_PATH.tag.base}`,
    deleteOne: () => `${REQUEST_PATH.tag.base}`,
    deleteMutiple: () => `${REQUEST_PATH.tag.base}/mutiple`,
  },
  category: {
    base: 'category',
    find: () => `${REQUEST_PATH.category.base}`,
    create: () => `${REQUEST_PATH.category.base}`,
    update: () => `${REQUEST_PATH.category.base}`,
    deleteOne: () => `${REQUEST_PATH.category.base}`,
    deleteMutiple: () => `${REQUEST_PATH.category.base}/delete`,
  },
  image: {
    base: 'image',
  },
};
