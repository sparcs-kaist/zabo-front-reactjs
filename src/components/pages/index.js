import Loadable from 'react-loadable';

import Loading from '../templates/Loading';

export const HomePage = Loadable ({
  loader: () => import ('./HomePage'),
  loading: Loading,
});

export const ZaboUploadPage = Loadable ({
  loader: () => import ('./ZaboUploadPage'),
  loading: Loading,
});

export const MyPage = Loadable ({
  loader: () => import ('./MyPage'),
  loading: Loading,
});

export const AuthPage = Loadable ({
  loader: () => import ('./AuthPage'),
  loading: Loading,
});

export const LoginPage = Loadable ({
  loader: () => import ('./LoginPage'),
  loading: Loading,
});

export const GroupPage = Loadable ({
  loader: () => import ('./GroupPage'),
  loading: Loading,
});

export const GroupAddPage = Loadable ({
  loader: () => import ('./GroupAddPage'),
  loading: Loading,
});

export const ProfilePage = Loadable ({
  loader: () => import ('./ProfilePage'),
  loading: Loading,
});

export const ZaboPage = Loadable ({
  loader: () => import ('./ZaboPage'),
  loading: Loading,
});

export const NotFound = Loadable ({
  loader: () => import ('./NotFound'),
  loading: Loading,
});
