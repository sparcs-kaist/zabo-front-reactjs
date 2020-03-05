import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MaterialTable from 'material-table';
import moment from 'moment';

import defaultProfile from 'static/images/defaultProfile.png';

import tableIcons from './tableIcons';
import UserInfo from './UserInfo';

export default function UserList ({ users }) {
  const [state, setState] = useState ({
    columns: [
      { title: 'Name', field: 'name' },
      {
        field: 'profilePhoto',
        title: 'Photo',
        render: rowData => <img src={rowData.profilePhoto || defaultProfile} style={{ width: 50, borderRadius: '50%' }} />,
      },
      {
        title: 'Username',
        field: 'username',
        render: ({ username }) => <Link to={`/admin/user/${username}`}>{username}</Link>,
      },
      { title: 'Birthday', field: 'birthday', type: 'date' },
      { title: 'Email', field: 'kaistEmail' },
      {
        title: 'Type',
        field: 'kaistPersonType',
        render: rowData => (
          <List component="nav" aria-label="mailbox folders">
            <ListItem button>
              <ListItemText primary={rowData.kaistPersonType} />
            </ListItem>
            <Divider />
            {rowData.kaistPersonType === 'Student'
            && (
              <ListItem button>
                <ListItemText primary={rowData.studentId} />
              </ListItem>
            )}
          </List>
        ),
      },
      {
        title: '등록일',
        field: 'createdAt',
        render: rowData => (
          moment (rowData.createdAt).format ('YYYY-MM-DD HH:mm:ss')
        ),
      },
    ],
    data: users,
  });

  return (
    <MaterialTable
      title="유저 리스트"
      columns={state.columns}
      data={state.data}
      options={{
        grouping: true,
      }}
      style={{ maxWidth: '100%' }}
      detailPanel={user => (
        <div style={{
          width: '100%',
          height: '315',
          padding: 12,
        }}
        >
          <UserInfo user={user} />
        </div>
      )}
      icons={tableIcons}
    />
  );
}
