import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import AwesomeDebouncePromise from "awesome-debounce-promise";

import SimpleSelect from "components/molecules/SimpleSelect";
import List from "components/organisms/List";
import MemberItem from "components/organisms/MemberItem";
import SearchSelect from "components/organisms/SearchSelect";
import Header from "components/templates/Header";

import * as profileActions from "store/reducers/profile";
import useSetState from "hooks/useSetState";
import { searchUsers } from "lib/api/search";
import { GroupType } from "lib/propTypes";

import { alerts } from "../../../lib/variables";
import { AddMember, Page } from "./Setting.styled";
import withGroupProfile from "./withGroupProfile";

const debouncedSearchAPI = AwesomeDebouncePromise(searchUsers, 300);

const roleOptions = [
  { value: "editor", label: "편집자" },
  { value: "admin", label: "관리자" },
];

const GroupMembersSetting = ({ profile }) => {
  const dispatch = useDispatch();
  const { name, members } = profile;
  const [state, setState, onChange] = useSetState({
    query: "",
    roleOption: roleOptions[0],
    userOption: null,
  });

  const loadOptions = useCallback(
    async (query, callback) => {
      const users = await debouncedSearchAPI(query);
      const outUsers = users.filter((user) => !members.find((member) => member._id === user._id));
      const options = outUsers.map((user) => ({
        ...user,
        value: user._id,
        label: `${user.username} - (${user.koreanName || user.name})`,
      }));
      callback(options);
    },
    [members],
  );

  const addMember = useCallback(() => {
    const {
      userOption: { value: userId },
      roleOption: { value: role },
    } = state;
    if (!window.confirm(alerts.addMember)) return;
    dispatch(profileActions.addGroupMember({ groupName: name, userId, role })).catch((error) =>
      alert(error.error),
    );
  }, [state, dispatch]);
  const updateMember = useCallback(
    (userId, role) => {
      if (!window.confirm(alerts.updateMember)) return;
      dispatch(profileActions.updateGroupMember({ groupName: name, userId, role })).catch((error) =>
        alert(error.error),
      );
    },
    [dispatch],
  );
  const removeMember = useCallback(
    (userId) => {
      if (!window.confirm(alerts.deleteMember)) return;
      dispatch(profileActions.removeGroupMember({ groupName: name, userId })).catch((error) =>
        alert(error.error),
      );
    },
    [dispatch],
  );
  const { userOption, roleOption } = state;

  return (
    <Page>
      <Header scrollHeader />
      <Page.Body>
        <h1>{name} 멤버 관리</h1>
        <p>
          관리자는 그룹의 멤버와 자보를 관리할 수 있으며, 편집자는 자보를 업로드 및 수정할 수
          있습니다.
        </p>

        <AddMember>
          <SearchSelect
            placeholder="멤버 추가하기"
            value={userOption}
            cacheOptions
            loadOptions={loadOptions}
            onInputChange={(newValue) => setState({ query: newValue })}
            onChange={(newOption) => setState({ userOption: newOption })}
          />
          <SimpleSelect
            value={roleOption}
            options={roleOptions}
            onChange={(newOption) => setState({ roleOption: newOption })}
            isClearable={false}
            width={100}
          />
          <button onClick={addMember}>추가</button>
        </AddMember>
        <List
          dataSource={members}
          style={{ marginTop: 16 }}
          renderItem={({ role, user }) => (
            <MemberItem
              key={user._id}
              member={{ ...user, role }}
              updateMember={updateMember}
              removeMember={removeMember}
            />
          )}
        />
      </Page.Body>
    </Page>
  );
};

GroupMembersSetting.propTypes = {
  profile: GroupType.isRequired,
};

export default withGroupProfile(GroupMembersSetting, true);
