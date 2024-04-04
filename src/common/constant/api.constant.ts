export const REQUEST_OPTION: RequestInit = {
  credentials: 'include',
};

export const REQUEST_HOST = `${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/${process.env.REACT_APP_BACKEND_PREFIX}`;

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
  },
  image: {
    base: 'image',
  },
};
