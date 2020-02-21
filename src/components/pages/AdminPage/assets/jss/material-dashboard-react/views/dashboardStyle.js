import {
  dangerColor,
  grayColor,
  hexToRgb,
  successColor,
  whiteColor,
} from '../../material-dashboard-react';

const dashboardStyle = {
  containerTitle: {
    fontSize: '32px',
    fontWeight: '400',
    marginBottom: '5px',
    color: 'rgb(85, 85, 85)',
  },
  successText: {
    color: successColor[0],
  },
  arrowCardCategory: {
    width: '16px',
    height: '16px',
  },
  stats: {
    color: grayColor[0],
    display: 'inline-flex',
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '22px',
    '& svg': {
      top: '4px',
      width: '16px',
      height: '16px',
      position: 'relative',
      marginRight: '3px',
      marginLeft: '3px',
    },
    '& .fab,& .fas,& .far,& .fal,& .material-icons': {
      top: '4px',
      fontSize: '16px',
      position: 'relative',
      marginRight: '3px',
      marginLeft: '3px',
    },
  },
  cardEmphasizeSuccess: {
    color: successColor[0],
    fontWeight: '400',
    fontSize: '16px',
    marginLeft: '4px',
  },
  cardEmphasizeDanger: {
    color: dangerColor[3],
    fontWeight: '400',
    fontSize: '16px',
    marginLeft: '4px',
  },
  cardEmphasizeNormal: {
    color: grayColor[0],
    fontWeight: '400',
    fontSize: '16px',
    marginLeft: '4px',
  },
  cardCategory: {
    color: grayColor[0],
    margin: '0',
    fontSize: '16px',
    marginTop: '0',
    paddingTop: '10px',
    marginBottom: '0',
    fontWeight: '400',
  },
  cardCategoryWhite: {
    color: `rgba(${hexToRgb (whiteColor)},.62)`,
    margin: '0',
    fontSize: '16px',
    marginTop: '0',
    marginBottom: '0',
  },
  cardTitle: {
    color: grayColor[2],
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '400',
    fontFamily: '\'Roboto\', \'Helvetica\', \'Arial\', sans-serif',
    marginBottom: '3px',
    textDecoration: 'none',
    '& small': {
      color: grayColor[1],
      fontWeight: '400',
      lineHeight: '1',
    },
  },
  cardTitleWhite: {
    color: whiteColor,
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: '\'Roboto\', \'Helvetica\', \'Arial\', sans-serif',
    marginBottom: '3px',
    textDecoration: 'none',
    '& small': {
      color: grayColor[1],
      fontWeight: '400',
      lineHeight: '1',
    },
  },
};

export default dashboardStyle;
