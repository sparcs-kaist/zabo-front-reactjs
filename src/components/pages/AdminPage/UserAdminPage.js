import React, {
  useMemo,
} from 'react';
import { useSelector } from 'react-redux';

import GridContainer from './components/Grid/GridContainer';
import UserCard from './UserCard';
import UserList from './UsersTable';

const UserAdminPage = () => {
  const usersIm = useSelector (state => state.getIn (['admin', 'users']));
  const users = useMemo (() => usersIm.toJS (), [usersIm]);
  return (
    <div>
      <GridContainer>
        {!!users.length && <UserList users={users} /> }
        {/* {users.map (user => ( */}
        {/*  <UserCard user={user} /> */}
        {/* ))} */}
      </GridContainer>
    </div>
  );
};

export default UserAdminPage;
