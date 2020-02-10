import 'perfect-scrollbar/css/perfect-scrollbar.css';

import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// core components
import DashboardIcon from '@material-ui/icons/Dashboard';
import GroupIcon from '@material-ui/icons/Group';
// creates a beautiful scrollbar
import PerfectScrollbar from 'perfect-scrollbar';

// import routes from 'routes';
import logo from 'static/logo/logo.svg';

import AdminWrapper from './Admin.styled';
import bgImage from './assets/img/sidebar-2.jpg';
import styles from './assets/jss/material-dashboard-react/layouts/adminStyle';
import FixedPlugin from './components/FixedPlugin/FixedPlugin';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbars/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './Dashboard';
import GroupAdminPage from './GroupAdminPage';

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: DashboardIcon,
    component: Dashboard,
    layout: '/admin',
  },
  {
    path: '/group',
    name: 'Group',
    icon: GroupIcon,
    component: GroupAdminPage,
    layout: '/admin',
  },
];

let ps;

const switchRoutes = (
  <Switch>
    {routes.map ((prop, key) => {
      if (prop.layout === '/admin') {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      return null;
    })}
    <Redirect from="/admin" to="/admin/dashboard" />
  </Switch>
);

const useStyles = makeStyles (styles);

export default function Admin ({ ...rest }) {
  // styles
  const classes = useStyles ();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef ();
  // states and functions
  const [image, setImage] = React.useState (bgImage);
  const [color, setColor] = React.useState ('blue');
  const [fixedClasses, setFixedClasses] = React.useState ('dropdown show');
  const [mobileOpen, setMobileOpen] = React.useState (false);
  const handleImageClick = image => {
    setImage (image);
  };
  const handleColorClick = color => {
    setColor (color);
  };
  const handleFixedClick = () => {
    if (fixedClasses === 'dropdown') {
      setFixedClasses ('dropdown show');
    } else {
      setFixedClasses ('dropdown');
    }
  };
  const handleDrawerToggle = () => {
    setMobileOpen (!mobileOpen);
  };
  const getRoute = () => window.location.pathname !== '/admin/maps';
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen (false);
    }
  };
  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect (() => {
    if (navigator.platform.indexOf ('Win') > -1) {
      ps = new PerfectScrollbar (mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
      document.body.style.overflow = 'hidden';
    }
    window.addEventListener ('resize', resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup () {
      if (navigator.platform.indexOf ('Win') > -1) {
        ps.destroy ();
      }
      window.removeEventListener ('resize', resizeFunction);
    };
  }, [mainPanel]);
  return (
    <AdminWrapper className={classes.wrapper}>
      <Sidebar
        routes={routes}
        logoText="ZABO"
        logo={logo}
        image={image}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        {...rest}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar
          routes={routes}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />
        {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
        {getRoute () ? (
          <div className={classes.content}>
            <div className={classes.container}>{switchRoutes}</div>
          </div>
        ) : (
          <div className={classes.map}>{switchRoutes}</div>
        )}
        {getRoute () ? <Footer /> : null}
        <FixedPlugin
          handleImageClick={handleImageClick}
          handleColorClick={handleColorClick}
          bgColor={color}
          bgImage={image}
          handleFixedClick={handleFixedClick}
          fixedClasses={fixedClasses}
        />
      </div>
    </AdminWrapper>
  );
}
