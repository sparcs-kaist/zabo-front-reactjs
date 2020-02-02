import React, { useCallback } from 'react';
import Select from 'react-select';

import withGroupProfile from './withGroupProfile';
import { GroupType } from '../../../lib/propTypes';
import useSetState from '../../../hooks/useSetState';

const selectOptions = [
  { value: 'editor', label: '편집자' },
  { value: 'admin', label: '관리자' },
];

const GroupMembersSetting = ({ profile }) => {
  const { name, members } = profile;
  const [state, setState, onChange] = useSetState ({
    query: '',
    roleOption: selectOptions[0],
  });
  const submit = useCallback (() => {
    const { query, roleOption: { value: role } } = state;
    console.log (query, role);
  }, [state]);
  const { query, roleOption } = state;

  return (
    <div>
      <h1>{name} 멤버 관리</h1>
      <p>관리자는 그룹의 멤버와 자보를 관리할 수 있으며, 편집자는 자보를 업로드 및 수정할 수 있습니다.
        (좀더 명확하게 설명하면 좋을 듯. 에디터가 그룹 프로필 설정도 가능함 에디터는 멤버관리 빼고 전부 다 가능, 관리자는 전부 다 가능)
      </p>
      <input
        name="query"
        value={query}
        placeholder="멤버 추가하기"
        onChange={onChange}
      />
      <Select
        value={roleOption}
        options={selectOptions}
        onChange={newOption => setState ({ roleOption: newOption })}
        isSearchable
      />
      <button onClick={submit}>추가</button>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {
          members.map (({ role, user }) => {
            const { username, name, koreanName } = user;
            return (
              <div key={user._id}>
                {username} <br />
                {koreanName || name} <br />
                {role}
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

GroupMembersSetting.propTypes = {
  profile: GroupType.isRequired,
};

export default withGroupProfile (GroupMembersSetting, true);
