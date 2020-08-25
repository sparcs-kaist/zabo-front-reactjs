import React from 'react';
import MInputBase from '@material-ui/core/InputBase';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles ({
  root: {
    width: '100%',
    minHeight: '48px',
    margin: '8px 0 24px 0',
    padding: '9px 10px',
    borderRadius: '4px',
    backgroundColor: '#f4f4f4',
    fontFailiy: 'NanumSquare',
  },
});

const InputBase = props => {
  const classes = useStyles ();
  return <MInputBase className={classes.root} {...props} />;
};

export default InputBase;
