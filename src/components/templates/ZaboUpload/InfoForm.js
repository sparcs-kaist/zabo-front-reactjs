import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import MomentUtils from '@date-io/moment';
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import moment from 'moment';

import ToggleButton from 'atoms/ToggleButton';
import SimpleSelect from 'molecules/SimpleSelect';
import StyledQuill from 'organisms/StyledQuill';

import { setInfo } from 'store/reducers/upload';
import { gridLayoutCompareFunction } from 'lib/utils';

import { InfoFormWrapper } from './InfoForm.styled';

const scheduleTypeOptions = [
  { value: '행사', label: '행사' },
  { value: '신청', label: '신청' },
];

const scheduleTypeOptionsH = scheduleTypeOptions.reduce ((acc, cur) => ({
  ...acc, [cur.value]: cur,
}), {});

const Form = ({ state, setState, preview }) => {
  const {
    title, description, hasSchedule, schedules, category,
  } = state;
  const schedule = schedules[0];
  const {
    title: scheduleTitle, startAt, eventType,
  } = schedule;

  const timeLeft = useMemo (() => {
    if (!schedule.startAt) return { day: 0, hour: 0, min: 0 };
    const startTime = moment (schedule.startAt);
    const current = moment ();
    const duration = moment.duration (startTime.diff (current));
    return {
      day: duration.days (),
      hour: duration.hours (),
      min: duration.minutes (),
    };
  }, [schedule]);

  const handleChange = useCallback (e => {
    const { name, value } = e.target;
    setState ({ [name]: value });
  }, [setState]);

  const setSchedule = useCallback (({ name, value }) => {
    setState ({ schedules: [{ ...schedule, [name]: value }] });
  }, [schedule]);

  const onQuillChange = useCallback (e => {
    setState ({ description: e });
  }, [setState]);

  const onTagClick = useCallback (name => {
    const clone = category.map (tag => (tag.name === name
      ? ({ ...tag, clicked: !tag.clicked })
      : tag));
    setState ({ category: clone });
  }, [setState, category]);

  const handleToggle = e => {
    const { checked } = e.target;
    setState ({ hasSchedule: checked });
  };

  return (
    <InfoFormWrapper>
      <InfoFormWrapper.Header>
        <h1>정보 입력하기</h1>
        <p>자보에 대한 설명을 입력해주세요. 태그를 등록하면 사용자에게 더 잘 노출됩니다.</p>
      </InfoFormWrapper.Header>
      <InfoFormWrapper.TwoCol>
        <InfoFormWrapper.TitleImage>
          <div>
            {preview && <img src={preview} alt="title" />}
          </div>
        </InfoFormWrapper.TitleImage>
        <InfoFormWrapper.Info>
          <section className="zabo-title">
            <div className="label">제목</div>
            <input
              className="title-input"
              required
              placeholder="자보 제목을 입력해주세요."
              name="title"
              value={title}
              onChange={handleChange}
            />
          </section>
          <section className="zabo-description-quill">
            <div className="label">설명</div>
            <InfoFormWrapper.Editor>
              <StyledQuill
                theme="bubble"
                value={description}
                onChange={onQuillChange}
                placeholder="자보에 대한 설명을 작성해 세요."
                modules={{
                  toolbar: [
                    ['bold', 'underline', 'strike'],
                    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '+1' }, { indent: '-1' }],
                    ['link'],
                  ],
                }}
              />
            </InfoFormWrapper.Editor>
          </section>
          <InfoFormWrapper.Info.Schedule className="zabo-schedule" hasSchedule={hasSchedule} hasTitle={scheduleTitle}>
            <div className="header">
              <p>일정이 존재하나요?</p>
              <div className="toggle-btn">
                <ToggleButton onChange={handleToggle} checked={hasSchedule} />
              </div>
            </div>
            <div className="body">
              <div className="body-container">
                <div className="schedule-title">
                  <div className="label small">일정 이름</div>
                  <input
                    className="schedule-title-input"
                    required
                    placeholder="행사명을 입력해주세요. (20자 제한)"
                    maxLength="20"
                    name="title"
                    value={scheduleTitle}
                    onChange={e => setSchedule (e.target)}
                  />
                </div>
                <div className="schedule-type">
                  <div className="label small" style={{ marginBottom: '8px' }}>분류</div>
                  <SimpleSelect
                    value={scheduleTypeOptionsH[eventType]}
                    options={scheduleTypeOptions}
                    onChange={newOption => {
                      setSchedule ({ name: 'eventType', value: newOption.value });
                    }}
                    isClearable={false}
                    width={150}
                  />
                </div>
              </div>
              <div className="label small">일정</div>
              <div className="inputContainer oneLineInput">
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <KeyboardDateTimePicker
                    required
                    placeholder="우측 달력을 클릭하여 마감일을 선택해주세요."
                    value={startAt}
                    onChange={value => {
                      setSchedule ({ name: 'startAt', value });
                    }}
                    InputProps={{
                      disableUnderline: true,
                    }}
                    animateYearScrolling
                    allowKeyboardControl={false}
                    format="YYYY-MM-DD HH:mm:ss"
                    fullWidth
                    ampm={false}
                    invalidDateMessage={<p>잘못된 형식입니다.</p>}
                    style={{ height: '38px' }}
                  />
                </MuiPickersUtilsProvider>
              </div>
              <div className="preview">
                <div className="semi-label">다음과 같이 노출됩니다.</div>
                <div className="schedule-preview-box">
                  <h3>{scheduleTitle || '행사명'}</h3>
                  <p>{eventType === '신청' && '신청이'} 얼마 남지 않았어요</p>
                  <div className="timestamp-box">남은 시간: {timeLeft.day}일 {timeLeft.hour}시간 {timeLeft.min}분</div>
                </div>
              </div>
            </div>
          </InfoFormWrapper.Info.Schedule>
          <section className="zabo-keywords">
            <div className="label label-tag">태그</div>
            <div className="tags">
              {category.map (item => (
                <div
                  key={item.name}
                  onClick={() => onTagClick (item.name)}
                  className={item.clicked ? 'tag selected' : 'tag default'}
                >
                  {item.name}
                </div>
              ))}
            </div>
          </section>
        </InfoFormWrapper.Info>
      </InfoFormWrapper.TwoCol>
    </InfoFormWrapper>
  );
};

Form.propTypes = {
  state: PropTypes.shape ({
    title: PropTypes.string,
    description: PropTypes.string,
    hasSchedule: PropTypes.bool,
    schedules: PropTypes.arrayOf (PropTypes.shape ({
      title: PropTypes.string,
      startAt: PropTypes.string,
      endAt: PropTypes.string,
      eventType: PropTypes.string,
    })),
    category: PropTypes.arrayOf (PropTypes.shape ({
      name: PropTypes.string,
      clicked: PropTypes.bool,
    })),
  }).isRequired,
  setState: PropTypes.func.isRequired,
  preview: PropTypes.string.isRequired,
};

const InfoForm = () => {
  const dispatch = useDispatch ();
  const [preview, setPreview] = useState ();
  const infoImmutable = useSelector (state => state.getIn (['upload', 'info']));
  const imageFilesImmutable = useSelector (state => state.getIn (['upload', 'images']));
  const info = useMemo (() => infoImmutable.toJS (), [infoImmutable]);

  useEffect (() => {
    const imageFiles = imageFilesImmutable.toJS ();
    const sortedImageFiles = imageFiles.slice ();
    sortedImageFiles.sort (gridLayoutCompareFunction);
    const titleImageFile = sortedImageFiles[0];
    let url = '';
    if (titleImageFile) {
      url = URL.createObjectURL (titleImageFile);
    }
    setPreview (url);
    return () => {
      URL.revokeObjectURL (url);
    };
  }, [imageFilesImmutable]);

  const setState = useCallback (updates => {
    dispatch (setInfo ({ ...info, ...updates }));
  }, [info]);

  return (
    <Form
      state={info}
      setState={setState}
      preview={preview}
    />
  );
};

InfoForm.Form = Form;

export default InfoForm;
