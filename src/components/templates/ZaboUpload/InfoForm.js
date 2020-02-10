import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import MomentUtils from '@date-io/moment';
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

import StyledQuill from 'organisms/StyledQuill';

import { setInfo } from 'store/reducers/upload';
import { gridLayoutCompareFunction } from 'lib/utils';

import { InfoFormWrapper } from './InfoForm.styled';

const Form = ({ state, setState, preview }) => {
  const {
    title, description, endAt, category,
  } = state;
  const onChange = useCallback (e => {
    const { name, value } = e.target;
    setState ({ [name]: value });
  }, [setState]);

  const onQuillChange = useCallback (e => {
    setState ({ description: e });
  }, [setState]);

  const onTagClick = useCallback (name => {
    const clone = category.map (tag => (tag.name === name
      ? ({ ...tag, clicked: !tag.clicked })
      : tag));
    setState ({ category: clone });
  }, [setState, category]);

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
            <input
              className="title-input"
              required
              placeholder="자보 제목을 입력해주세요."
              name="title"
              value={title}
              onChange={onChange}
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
          <section className="zabo-expiration">
            <div className="label">마감일</div>
            <div className="inputContainer oneLineInput">
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDateTimePicker
                  required
                  value={endAt}
                  onChange={value => setState ({ endAt: value })}
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
          </section>
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
    endAt: PropTypes.string,
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
