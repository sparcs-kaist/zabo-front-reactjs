import loadable from '@loadable/component';
/*
 Migrated from react-loadable to loadable-component.
 Check out these to find out more
 https://loadable-components.com/docs/loadable-vs-react-lazy/#note-about-react-loadable
 https://velog.io/@velopert/nomore-react-loadable
*/

export const HomePage = loadable (/* webpackPrefetch: true */ () => import ('./HomePage'));
export const ZaboUploadPage = loadable (/* webpackPrefetch: true */ () => import ('./ZaboUploadPage'));
export const SettingsPage = loadable (/* webpackPrefetch: true */ () => import ('./SettingsPage'));
export const AuthPage = loadable (/* webpackPrefetch: true */ () => import ('./AuthPage'));
export const LoginPage = loadable (/* webpackPrefetch: true */ () => import ('./LoginPage'));
export const ProfilePage = loadable (/* webpackPrefetch: true */ () => import ('./ProfilePage'));
export const ZaboPage = loadable (/* webpackPrefetch: true */ () => import ('./ZaboPage'));
export const NotFound = loadable (/* webpackPrefetch: true */ () => import ('./NotFound'));
export const AdminPage = loadable (/* webpackPrefetch: true */ () => import ('./AdminPage'));
