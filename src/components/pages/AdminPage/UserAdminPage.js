import React from "react";
import { useSelector } from "react-redux";
import get from "lodash.get";

import GridContainer from "./components/Grid/GridContainer";
import UserList from "./UsersTable";

const UserAdminPage = () => {
  const users = useSelector((state) => get(state, ["admin", "users"], []));
  return (
    <div>
      <GridContainer>{!!users.length && <UserList users={users} />}</GridContainer>
    </div>
  );
};

export default UserAdminPage;
