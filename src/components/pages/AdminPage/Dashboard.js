import './chartist.min.css';

import React, { useCallback, useEffect } from 'react';
// react plugin for creating charts
import ChartistGraph from 'react-chartist';
import { Bar, Line } from 'react-chartjs-2';
import { Divider } from '@material-ui/core';
// @material-ui/core
import { makeStyles } from '@material-ui/core/styles';
import {
  ArrowDownward, ArrowForward, ArrowUpward, OpenInNew,
} from '@material-ui/icons';
import Accessibility from '@material-ui/icons/Accessibility';
import AccessTime from '@material-ui/icons/AccessTime';
import BugReport from '@material-ui/icons/BugReport';
import Cloud from '@material-ui/icons/Cloud';
import Code from '@material-ui/icons/Code';
import DateRange from '@material-ui/icons/DateRange';
import FileCopy from '@material-ui/icons/FileCopy';
import Info from '@material-ui/icons/Info';
import LocalOffer from '@material-ui/icons/LocalOffer';
// @material-ui/icons
import Store from '@material-ui/icons/Store';
import Update from '@material-ui/icons/Update';
import Warning from '@material-ui/icons/Warning';

import useSetState from 'hooks/useSetState';
import axios from 'lib/axios';

import styles from './assets/jss/material-dashboard-react/views/dashboardStyle';
import Card from './components/Card/Card';
import CardBody from './components/Card/CardBody';
import CardFooter from './components/Card/CardFooter';
import CardHeader from './components/Card/CardHeader';
import CardIcon from './components/Card/CardIcon';
import CustomTabs from './components/CustomTabs/CustomTabs';
import GridContainer from './components/Grid/GridContainer';
// core components
import GridItem from './components/Grid/GridItem';
import Table from './components/Table/Table';
import Tasks from './components/Tasks/Tasks';
import Danger from './components/Typography/Danger';
import {
  completedTasksChart,
  dailySalesChart,
  emailsSubscriptionChart,
} from './variables/charts';
import { bugs, server, website } from './variables/general';

const useStyles = makeStyles (styles);

const today = new Date ();
const days = [];
for (let i = 0; i < 7; i++) {
  if (i === 6 || today.getDate () === 1) {
    days[6 - i] = `${today.getMonth () + 1}/${today.getDate ()}`;
  } else {
    days[6 - i] = today.getDate ();
  }
  today.setDate (today.getDate () - 1);
}

const parseData = (data) => {
  const cnt = [0, 0, 0, 0, 0, 0, 0];
  data.forEach (({ _id, createdAt }) => {
    const pos = new Date ();
    const temp = new Date (createdAt);

    for (let i = 0; i < 6; i++) {
      if (temp.getDate () === pos.getDate () && temp.getMonth () === pos.getMonth () && temp.getFullYear () === pos.getFullYear ()) {
        cnt[6 - i] += 1;
        break;
      } else {
        pos.setDate (pos.getDate () - 1);
      }
    }
  });
  return cnt;
};

export default function Dashboard () {
  const [state, setState] = useSetState ({
    totalZaboCounts: 0,
    todayZaboCounts: 0,
    totalUserCounts: 0,
    todayUserCounts: 0,
    zaboChartData: {
      data: [],
    },
    userChartData: {
      data: [],
    },
  });
  const {
    totalZaboCounts, todayZaboCounts, totalUserCounts, todayUserCounts, zaboChartData, userChartData,
  } = state;

  const fetchChartData = useCallback (() => {
    Promise.all ([
      axios.get ('/admin/analytics/zabo/date/created'),
      axios.get ('/admin/analytics/user/date/created'),
    ])
      .then (([zaboList, userList]) => {
        const zaboCounts = parseData (zaboList);
        const userCounts = parseData (userList);
        setState ({
          totalZaboCounts: zaboList.length,
          todayZaboCounts: zaboCounts[6],
          totalUserCounts: userList.length,
          todayUserCounts: userCounts[6],
          zaboChartData: {
            labels: days,
            data: zaboCounts,
          },
          userChartData: {
            labels: days,
            data: userCounts,
          },
        });
      }, error => {
        console.error (error);
        setState ({
          totalZaboCounts: 'NaN',
          todayZaboCounts: 'NaN',
          totalUserCounts: 'NaN',
          todayUserCounts: 'NaN',
          zaboChartData: {
            labels: [''],
            data: [0],
          },
          userChartData: {
            labels: [''],
            data: [0],
          },
        });
      });
  }, [state, setState]);

  useEffect (() => {
    fetchChartData ();
  }, []);

  const classes = useStyles ();
  return (
    <div>
      <h1 className={classes.containerTitle}>모아보기</h1>
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="success">
              <Bar
                data={{
                  labels: zaboChartData.labels,
                  datasets: [
                    {
                      data: zaboChartData.data,
                      label: ' Zabos',
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      borderColor: 'rgba(255, 255, 255, 0.7)',
                      borderWidth: 1,
                    },
                  ],
                }}
                options={{
                  legend: {
                    display: false,
                  },
                  scales: {
                    xAxes: [{
                      maxBarThickness: 15,
                      gridLines: {
                        color: 'rgba(255, 255, 255, 0.2)',
                        zeroLineColor: 'rgba(255, 255, 255, 0.2)',
                      },
                      ticks: {
                        fontColor: 'rgba(255, 255, 255, 0.9)',
                      },
                    }],
                    yAxes: [{
                      gridLines: {
                        color: 'rgba(255, 255, 255, 0.2)',
                        zeroLineColor: 'rgba(255, 255, 255, 0.2)',
                      },
                      ticks: {
                        beginAtZero: true,
                        fontColor: 'rgba(255, 255, 255, 0.9)',
                        precision: false,
                      },
                    }],
                  },
                }}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>등록된 자보 수</h4>
              <p className={classes.cardCategory}>
                오늘은
                <>
                  {
                    zaboChartData.data[6] > zaboChartData.data[5]
                      ? (
                        <span className={classes.cardEmphasizeSuccess}>
                          <ArrowUpward className={classes.arrowCardCategory} />
                          { todayZaboCounts }
                        </span>
                      )
                      : zaboChartData.data[6] < zaboChartData.data[5]
                        ? (
                          <span className={classes.cardEmphasizeDanger}>
                            <ArrowDownward className={classes.arrowCardCategory} />
                            { todayZaboCounts }
                          </span>
                        )
                        : (
                          <span className={classes.cardEmphasizeNormal}>
                            <ArrowForward className={classes.arrowCardCategory} />
                            { todayZaboCounts }
                          </span>
                        )
                  }
                </>
                개, 총
                {
                  zaboChartData.data[6] > zaboChartData.data[5]
                    ? (
                      <span className={classes.cardEmphasizeSuccess}>
                        { totalZaboCounts }
                      </span>
                    )
                    : zaboChartData.data[6] < zaboChartData.data[5]
                      ? (
                        <span className={classes.cardEmphasizeDanger}>
                          { totalZaboCounts }
                        </span>
                      )
                      : (
                        <span className={classes.cardEmphasizeNormal}>
                          { totalZaboCounts }
                        </span>
                      )
                }
                개의 자보가 등록되었습니다.
              </p>
            </CardBody>
            <CardFooter chart style={{ justifyContent: 'flex-end' }}>
              <div className={classes.stats}>
                <OpenInNew /> 자세히 보기
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="warning">
              <Bar
                data={{
                  labels: userChartData.labels,
                  datasets: [
                    {
                      data: userChartData.data,
                      label: ' Users',
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      borderColor: 'rgba(255, 255, 255, 0.7)',
                      borderWidth: 1,
                    },
                  ],
                }}
                options={{
                  legend: {
                    display: false,
                  },
                  scales: {
                    xAxes: [{
                      maxBarThickness: 15,
                      gridLines: {
                        color: 'rgba(255, 255, 255, 0.2)',
                        zeroLineColor: 'rgba(255, 255, 255, 0.2)',
                      },
                      ticks: {
                        fontColor: 'rgba(255, 255, 255, 0.9)',
                      },
                    }],
                    yAxes: [{
                      gridLines: {
                        color: 'rgba(255, 255, 255, 0.2)',
                        zeroLineColor: 'rgba(255, 255, 255, 0.2)',
                      },
                      ticks: {
                        beginAtZero: true,
                        fontColor: 'rgba(255, 255, 255, 0.9)',
                        precision: false,
                      },
                    }],
                  },
                }}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>회원 수</h4>
              <p className={classes.cardCategory}>
                오늘은
                <>
                  {
                    userChartData.data[6] > userChartData.data[5]
                      ? (
                        <span className={classes.cardEmphasizeSuccess}>
                          <ArrowUpward className={classes.arrowCardCategory} />
                          { todayUserCounts }
                        </span>
                      )
                      : userChartData.data[6] < userChartData.data[5]
                        ? (
                          <span className={classes.cardEmphasizeDanger}>
                            <ArrowDownward className={classes.arrowCardCategory} />
                            { todayUserCounts }
                          </span>
                        )
                        : (
                          <span className={classes.cardEmphasizeNormal}>
                            <ArrowForward className={classes.arrowCardCategory} />
                            { todayUserCounts }
                          </span>
                        )
                  }
                </>
                명, 총
                {
                  userChartData.data[6] > userChartData.data[5]
                    ? (
                      <span className={classes.cardEmphasizeSuccess}>
                        { totalUserCounts }
                      </span>
                    )
                    : userChartData.data[6] < userChartData.data[5]
                      ? (
                        <span className={classes.cardEmphasizeDanger}>
                          { totalUserCounts }
                        </span>
                      )
                      : (
                        <span className={classes.cardEmphasizeNormal}>
                          { totalUserCounts }
                        </span>
                      )
                }
                명의 회원이 가입했습니다.
              </p>
            </CardBody>
            <CardFooter chart style={{ justifyContent: 'flex-end' }}>
              <div className={classes.stats}>
                <OpenInNew /> 자세히 보기
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="danger">
              <Line
                data={{
                  labels: userChartData.labels,
                  datasets: [
                    {
                      data: userChartData.data,
                      label: ' CCU',
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      borderColor: 'rgba(255, 255, 255, 0.7)',
                      fill: false,
                      borderWidth: 3.1,
                    },
                  ],
                }}
                options={{
                  legend: {
                    display: false,
                  },
                  scales: {
                    xAxes: [{
                      maxBarThickness: 15,
                      gridLines: {
                        color: 'rgba(255, 255, 255, 0.2)',
                        zeroLineColor: 'rgba(255, 255, 255, 0.2)',
                      },
                      ticks: {
                        fontColor: 'rgba(255, 255, 255, 0.9)',
                      },
                    }],
                    yAxes: [{
                      gridLines: {
                        color: 'rgba(255, 255, 255, 0.2)',
                        zeroLineColor: 'rgba(255, 255, 255, 0.2)',
                      },
                      ticks: {
                        beginAtZero: true,
                        fontColor: 'rgba(255, 255, 255, 0.9)',
                        precision: false,
                      },
                    }],
                  },
                }}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>사용자 수</h4>
              <p className={classes.cardCategory}>현재 총
                <span className={classes.cardEmphasizeSuccess}>
                  {totalUserCounts}
                </span>
                (비회원
                <span className={classes.cardEmphasizeNormal}>
                    xx
                </span>)명이 자보를 이용중입니다.
              </p>
            </CardBody>
            <CardFooter chart style={{ justifyContent: 'flex-end' }}>
              <div className={classes.stats}>
                <OpenInNew /> 자세히 보기
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <Divider />
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
                <Danger>
                  <Warning />
                </Danger>
                <a href="#pablo" onClick={e => e.preventDefault ()}>
                  Get more space
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>Revenue</p>
              <h3 className={classes.cardTitle}>$34,245</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Last 24 Hours
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Info>info_outline</Info>
              </CardIcon>
              <p className={classes.cardCategory}>Fixed Issues</p>
              <h3 className={classes.cardTitle}>75</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <LocalOffer />
                Tracked from Github
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>Followers</p>
              <h3 className={classes.cardTitle}>+245</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Just Updated
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={dailySalesChart.data}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Daily Sales</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                </span>{' '}
                increase in today sales.
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated 4 minutes ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={emailsSubscriptionChart.data}
                type="Bar"
                options={emailsSubscriptionChart.options}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Email Subscriptions</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="danger">
              <ChartistGraph
                className="ct-chart"
                data={completedTasksChart.data}
                type="Line"
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Completed Tasks</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <CustomTabs
            title="Tasks:"
            headerColor="primary"
            tabs={[
              {
                tabName: 'Bugs',
                tabIcon: BugReport,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0, 3]}
                    tasksIndexes={[0, 1, 2, 3]}
                    tasks={bugs}
                  />
                ),
              },
              {
                tabName: 'Website',
                tabIcon: Code,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0]}
                    tasksIndexes={[0, 1]}
                    tasks={website}
                  />
                ),
              },
              {
                tabName: 'Server',
                tabIcon: Cloud,
                tabContent: (
                  <Tasks
                    checkedIndexes={[1]}
                    tasksIndexes={[0, 1, 2]}
                    tasks={server}
                  />
                ),
              },
            ]}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Employees Stats</h4>
              <p className={classes.cardCategoryWhite}>
                New employees on 15th September, 2016
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="warning"
                tableHead={['ID', 'Name', 'Salary', 'Country']}
                tableData={[
                  ['1', 'Dakota Rice', '$36,738', 'Niger'],
                  ['2', 'Minerva Hooper', '$23,789', 'Curaçao'],
                  ['3', 'Sage Rodriguez', '$56,142', 'Netherlands'],
                  ['4', 'Philip Chaney', '$38,735', 'Korea, South'],
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
