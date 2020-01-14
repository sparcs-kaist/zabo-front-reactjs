import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import InputBase from '@material-ui/core/InputBase';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import { setInfo } from '../../../store/reducers/upload';

import { TAGS } from '../../../lib/variables';

import { InfoFormWrapper } from './InfoForm.styled';
import { gridLayoutCompareFunction } from '../../../lib/utils';

const InfoForm = () => {
  const dispatch = useDispatch ();
  const [preview, setPreview] = useState ();
  const infoImmutable = useSelector (state => state.getIn (['upload', 'info']));
  const imageFilesImmutable = useSelector (state => state.getIn (['upload', 'images']));

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

  const info = infoImmutable.toJS ();
  const {
    title, desc, expDate, tags,
  } = info;

  const setState = useCallback (updates => {
    dispatch (setInfo (Object.assign (info, updates)));
  }, [infoImmutable]);

  const handleChange = useCallback (e => {
    const { name, value } = e.target;
    setState ({ [name]: value });
  }, [infoImmutable]);

  const onTagClick = useCallback (name => {
    const clone = tags.map (tag => (tag.name === name
      ? Object.assign (tag, { clicked: !tag.clicked })
      : tag));
    setState ({ tags: clone });
  }, [tags]);

  return (
    <InfoFormWrapper>
      <InfoFormWrapper.TwoCol>
        <InfoFormWrapper.TitleImage>
          <div>
            {preview && <img src={preview} alt="title image" />}
          </div>
        </InfoFormWrapper.TitleImage>
        <InfoFormWrapper.Info>
          <section className="zabo-title">
            <div className="label">제목 *</div>
            <InputBase
              required
              className="inputContainer"
              placeholder="포스터 제목을 입력해주세요."
              multiline
              name="title"
              value={title}
              onChange={handleChange}
            />
          </section>
          <section className="zabo-description">
            <div className="label">설명 *</div>
            <InputBase
              required
              className="inputContainer"
              placeholder="포스터 설명을 작성해주세요."
              multiline
              rows="12"
              fullWidth
              name="desc"
              value={desc}
              onChange={handleChange}
            />
          </section>
          <section className="zabo-expiration">
            <div className="label">마감일 *</div>
            <div className="inputContainer">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  required
                  value={expDate}
                  onChange={value => setState ({ expDate: value })}
                  InputProps={{
                    disableUnderline: true,
                  }}
                  animateYearScrolling
                  allowKeyboardControl={false}
                  format="yyyy-MM-dd"
                  fullWidth
                  invalidDateMessage={<p>잘못된 형식입니다.</p>}
                />
              </MuiPickersUtilsProvider>
            </div>
          </section>
          <section className="zabo-keywords">
            <div className="label">카테고리</div>
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
