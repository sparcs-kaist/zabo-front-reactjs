import React from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import Snack from "@material-ui/core/SnackbarContent";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
import classNames from "classnames";

// core components
import styles from "../../assets/jss/material-dashboard-react/components/snackbarContentStyle";

const useStyles = makeStyles(styles);

export default function SnackbarContent(props) {
  const classes = useStyles();
  const { message, color, close, icon, rtlActive } = props;
  let action = [];
  const messageClasses = classNames({
    [classes.iconMessage]: icon !== undefined,
  });
  if (close !== undefined) {
    action = [
      <IconButton className={classes.iconButton} key="close" aria-label="Close" color="inherit">
        <Close className={classes.close} />
      </IconButton>,
    ];
  }
  return (
    <Snack
      message={
        <div>
          {icon !== undefined ? <props.icon className={classes.icon} /> : null}
          <span className={messageClasses}>{message}</span>
        </div>
      }
      classes={{
        root: `${classes.root} ${classes[color]}`,
        message: classes.message,
        action: classNames({ [classes.actionRTL]: rtlActive }),
      }}
      action={action}
    />
  );
}

SnackbarContent.propTypes = {
  message: PropTypes.node.isRequired,
  color: PropTypes.oneOf(["info", "success", "warning", "danger", "primary"]),
  close: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  icon: PropTypes.object,
  rtlActive: PropTypes.bool,
};
