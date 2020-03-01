import React, {
  useMemo,
} from 'react';
import { useSelector } from 'react-redux';

import GridContainer from './components/Grid/GridContainer';
import UserCard from './UserCard';

const UserAdminPage = () => {
  const usersIm = useSelector (state => state.getIn (['admin', 'users']));
  const users = useMemo (() => usersIm.toJS (), [usersIm]);

  return (
    <div>
      <h2>Users</h2>
      <GridContainer>
        {users.map (user => (
          <UserCard user={user} />
        ))}
      </GridContainer>
    </div>
  );
};

export default UserAdminPage;
