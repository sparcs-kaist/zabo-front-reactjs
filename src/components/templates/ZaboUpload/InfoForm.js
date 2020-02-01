import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InputBase from 'atoms/InputBase';
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import StyledQuill from '../../organisms/StyledQuill';
import { setInfo } from '../../../store/reducers/upload';
import { InfoFormWrapper } from './InfoForm.styled';
import { gridLayoutCompareFunction } from '../../../lib/utils';

const InfoForm = () => {
  const dispatch = useDispatch ();
  const [preview, setPreview] = useState ();
  const infoImmutable = useSelector (state => state.getIn (['upload', 'info']));
  const imageFilesImmutable = useSelector (state => state.getIn (['upload', 'images']));
  const info = useMemo (() => infoImmutable.toJS (), [infoImmutable]);
  const {
    title, desc, expDate, tags,
  } = info;

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

  const handleChange = useCallback (e => {
    const { name, value } = e.target;
    setState ({ [name]: value });
  }, [setState]);

  const handleQuillChange = useCallback (e => {
    setState ({ desc: e });
  }, [setState]);

  const onTagClick = useCallback (name => {
    const clone = tags.map (tag => (tag.name === name
      ? ({ ...tag, clicked: !tag.clicked })
      : tag));
    setState ({ tags: clone });
  }, [setState, tags]);

  return (
    <InfoFormWrapper>
      <InfoFormWrapper.Header>
        <h1>정보 입력하기</h1>
        <p>자보에 대한 설명을 입력해주세요. 태그를 등록하면 사용자에게 더 잘 노출됩니다.</p>
      </InfoFormWrapper.Header>
      <InfoFormWrapper.TwoCol>
        <InfoFormWrapper.TitleImage>
          <div>
            {preview && <img src={preview} alt="title image" />}
          </div>
        </InfoFormWrapper.TitleImage>
        <InfoFormWrapper.Info>
          <section className="zabo-title">
            <div className="label">제목</div>
            <InputBase
              required
              placeholder="포스터 제목을 입력해주세요."
              multiline
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
                value={desc}
                onChange={handleQuillChange}
                placeholder="포스터 설명을 작성해주세요."
                modules={{
                  toolbar: [
                    ['bold', 'underline', 'strike'],
                    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '+1' }, { indent: '-1' }],
                    ['link'],
                  ],
                }}
                style={{ marginTop: '0.5em', marginBottom: '2em' }}
              />
            </InfoFormWrapper.Editor>
          </section>
          <section className="zabo-expiration">
            <div className="label">마감일</div>
            <div className="inputContainer oneLineInput">
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDateTimePicker
                  required
                  value={expDate}
                  onChange={value => setState ({ expDate: value })}
                  InputProps={{
                    disableUnderline: true,
                  }}
                  animateYearScrolling
                  allowKeyboardControl={false}
                  format="YYYY-MM-DD HH:mm:ss"
                  fullWidth
                  ampm={false}
                  invalidDateMessage={<p>잘못된 형식입니다.</p>}
                />
              </MuiPickersUtilsProvider>
            </div>
          </section>
          <section className="zabo-keywords">
            <div className="label">태그</div>
            <div className="tags">
              {tags.map (item => (
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

export default InfoForm;
