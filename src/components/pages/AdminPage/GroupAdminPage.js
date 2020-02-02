import React from 'react';
import FileCopy from '@material-ui/core/SvgIcon/SvgIcon';
import { makeStyles } from '@material-ui/core';
import GridContainer from './components/Grid/GridContainer';
import Card from './components/Card/Card';
import CardHeader from './components/Card/CardHeader';
import CardIcon from './components/Card/CardIcon';
import CardFooter from './components/Card/CardFooter';
import Danger from './components/Typography/Danger';
import GridItem from './components/Grid/GridItem';

const styles = {};

const useStyles = makeStyles (styles);

const GroupAdminPage = () => {
  const classes = useStyles ();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <FileCopy>content_copy</FileCopy>
              </CardIcon>
              <p className={classes.cardCategory}>Used Space</p>
              <h3 className={classes.cardTitle}>
                49/50 <small>GB</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Danger />
                <a href="#pablo" onClick={e => e.preventDefault ()}>
                  Get more space
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default GroupAdminPage;
