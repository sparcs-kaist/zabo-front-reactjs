import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import AwesomeDebouncePromise from 'awesome-debounce-promise';

import List from 'organisms/List';
import SearchSelect from 'organisms/SearchSelect';
import Header from 'templates/Header';

import * as profileActions from 'store/reducers/profile';
import { searchUsers } from 'lib/api/search';
import { GroupType } from 'lib/propTypes';

import groupDefaultProfile from 'static/images/groupDefaultProfile.png';

import useSetState from '../../../hooks/useSetState';
import { Page } from './Setting.styled';
import withGroupProfile from './withGroupProfile';

const debouncedSearchAPI = AwesomeDebouncePromise (searchUsers, 300);

const selectOptions = [
  { value: 'editor', label: '편집자' },
  { value: 'admin', label: '관리자' },
];

const GroupMembersSetting = ({ profile }) => {
  const dispatch = useDispatch ();
  const { name, members } = profile;
  const [state, setState, onChange] = useSetState ({
    query: '',
    roleOption: selectOptions[0],
    userOption: null,
  });

  const loadOptions = useCallback (async (query, callback) => {
    const users = await debouncedSearchAPI (query);
    const outUsers = users.filter (user => !members.find (member => member._id === user._id));
    const options = outUsers.map (user => ({
      ...user,
      value: user._id,
      label: `${user.username} - (${user.koreanName || user.name})`,
    }));
    callback (options);
  }, [members]);

  const addMember = useCallback (() => {
    const { userOption: { value: userId }, roleOption: { value: role } } = state;
    dispatch (profileActions.addGroupMember ({ groupName: name, userId, role }));
  }, [state, dispatch]);
  const updateMember = useCallback ((userId, role) => {
    dispatch (profileActions.updateGroupMember ({ groupName: name, userId, role }));
  }, [dispatch]);
  const removeMember = useCallback ((userId) => {
    dispatch (profileActions.removeGroupMember ({ groupName: name, userId }));
  }, [dispatch]);
  const { userOption, roleOption } = state;

  return (
    <Page>
      <Header rightGroup={<Header.AuthButton />} scrollHeader />
      <Page.Body>
        <h1>{name} 멤버 관리</h1>
        <p>관리자는 그룹의 멤버와 자보를 관리할 수 있으며, 편집자는 자보를 업로드 및 수정할 수 있습니다.</p>

        <SearchSelect
          placeholder="멤버 추가하기"
          value={userOption}
          cacheOptions
          loadOptions={loadOptions}
          onInputChange={newValue => setState ({ query: newValue })}
          onChange={newOption => setState ({ userOption: newOption })}
        />
        <button onClick={addMember}>추가</button>
        <List
          dataSource={members}
          renderItem={
            ({ role, user }) => {
              const {
                username, name, koreanName, profilePhoto,
              } = user;
              return (
                <List.GroupMemberItem key={user._id}>
                  {
                      profilePhoto
                        ? <img src={profilePhoto} alt="profile photo" />
                        : <img src={groupDefaultProfile} alt="default profile img" />
                    }
                  <div>
                    <h3>{username}</h3>
                    <div className="role">{role}</div>
                  </div>
                  <button onClick={() => updateMember (user._id, 'admin')}>관리자로</button>
                  <button onClick={() => updateMember (user._id, 'editor')}>편집자로</button>
                  <button onClick={() => removeMember (user._id)}>삭제</button>
                </List.GroupMemberItem>
              );
            }
          }
        />
      </Page.Body>
    </Page>
  );
};

GroupMembersSetting.propTypes = {
  profile: GroupType.isRequired,
};

export default withGroupProfile (GroupMembersSetting, true);
