const BACKEND_HOST = 'https://apis.hetchfund.capital';

export const environment = {
  production: true,

  // BACKEND SERVICES
  accounts: BACKEND_HOST + '/accounts',
  farmhouse: BACKEND_HOST + '/farmhouse',
  media_resources: BACKEND_HOST + '/media-resources',
  translator: BACKEND_HOST + '/translator',
  payments: BACKEND_HOST + '/payments',

  // YOCO KEYS
  YOCO_PUBLIC_KEY: 'pk_live_22af565cbVOW3qDe7784',
};
