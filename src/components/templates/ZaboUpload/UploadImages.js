import React, {
  useEffect, useMemo, useState, useCallback, useReducer,
} from 'react';
import styled, { css } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import { Responsive, WidthProvider } from '@sparcs-kaist/react-grid-layout';
import CloseIcon from '@material-ui/icons/Close';
import throttle from 'lodash.throttle';
import debounce from 'lodash.debounce';

import { setImages } from '../../../store/reducers/upload';

import './grid-layout.scss';
import { gridLayoutCompareFunction, loadImageFile } from '../../../lib/utils';
import useSetState from '../../../hooks/useSetState';

import uploadImg from '../../../static/images/uploadImg.png';

const ResponsiveGridLayout = WidthProvider (Responsive);

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: '8px',
  borderColor: '#eeeeee',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
};

const activeStyle = {
  borderColor: '#2196f3',
};

const acceptStyle = {
  borderColor: '#00e676',
};

const rejectStyle = {
  borderColor: '#ff1744',
};

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16,
  width: '100%',
};

const GridItem = styled.div`
  display: flex;
  justify-content: center;
`;

const ThumbOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background-color: rgba(0,0,0,0.03);
  svg {
    visibility: hidden;
  }
`;

const Thumb = styled.div`
  position: absolute;
  display: inline-flex;
  border-radius: 2px;
  width: 200px;
  height: 100%;
  overflow: hidden;
  /*border: 1px solid #eaeaea;
  padding: 4px;*/
  &:hover {
    ${ThumbOverlay} {
      background-color: rgba(0, 0, 0, 0.5);
      svg {
        visibility: visible;
        background-color: rgba(204, 204, 204, 0.3);
        border-radius: 45%;
      }
    }
  }
`;

const ThumbInner = styled.div`
  min-width: 0;
  height: auto;
  overflow: hidden;
  /*border: 1px solid #101010;*/
`;

const ThumbImage = styled.img`
  display: block;
  ${props => {
    const { titleHeight, titleRatio, ratio } = props.info;
    if (!titleRatio || !ratio) return css``;
    if (ratio >= titleRatio) {
      return css`
        height: ${titleHeight}px;
        width: auto;
      `;
    }
    return css`
      width: 200px;
      height: ${Math.floor (200 / ratio)}px;
    `;
  }};
`;

const Wrapper = styled.section`
  h1 {
    margin: 20px 0 16px 0;
    font-size: 28px;
    line-height: 32px;
    color: #363636;
    font-weight: 800;
  }
  .buttonDiv {
    display: block;
    width: 100%;
    text-align: right;
    button {
      width: 93px;
      background: #F8F8F8;
      border: 1.5px solid #143441;
      border-radius: 15px;
      padding: 8px 12px;
      font-size: 12px;
      line-height: 12px;
      margin-bottom: 8px;
    }
  }
  .upload-placeholder {
    text-align: center;
  }
  img.upload-icon {
    width: 24px;
    height: 24px;
    margin-bottom: 12px;
  }
  p {
    margin: 0;
    &.placeholder-mobile { 
      font-size: 14px;
      display: none;
    }
  }
  .base-component {
    position: relative;
    min-height: 400px;
    padding: 20px;
  }

  .responsive-grid-layout {
    width: 100%;
  }

  @media (max-width: 640px) {
    h1 {
      margin: 24px 0 12px 0;
      font-size: 24px;
    }
    .buttonDiv { display: none }
    .img.upload-icon {
      width: 16px;
      height: 16px;
    }
    p {
      &.placeholder-web { display: none }
      &.placeholder-mobile { display: block }
    }
    .base-component {
      min-height: 235px;
      padding: 0;
    }
  }
`;

Wrapper.Subtitle = styled.div`
  .subtitle1, .subtitle2 {
    display: inline-block;
    font-size: 16px;
    color: #202020;   
    margin: 0;
    &.placeholder {
      color: #8F8F8F;
    }
  }
  .subtitle-star { 
    display: none;
    font-size: 12px;
  }
  @media (max-width: 640px) {
    .subtitle1 { display: block }
    .subtitle2 { 
      font-size: 12px;
      margin: 10px 0 40px 0;
    }
    .subtitle-star { display: inline-block }
  }
`;
Wrapper.Subtitle.Sub = styled.div`
  display: inline-block;
`;

Wrapper.Placeholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  ${props => (props.noFile ? '' : css`
    position: relative;
    height: 80px;
  `)}
`;

let alerted;
const alertOnce = (message) => {
  if (alerted) return;
  alerted = true;
  alert (message);
};

const UploadImages = props => {
  const reduxDispatch = useDispatch ();
  const filesImmutable = useSelector (state => state.getIn (['upload', 'images']));
  const files = useMemo (() => filesImmutable.toJS (), [filesImmutable]);
  const setFiles = newFiles => reduxDispatch (setImages (newFiles));
  const [widthInfo, setWidthInfo] = useState ({
    width: 0,
    margin: 0,
    cols: 5,
    containerPadding: 0,
  });
  const { cols } = widthInfo;
  const [imagesInfo, setImagesInfo] = useSetState ({
    title: {
      ratio: 1,
      height: 200,
    },
  });
  const { key: titleKey, height: titleHeight, ratio: titleRatio } = imagesInfo.title;
  const [showAlert, setShowAlert] = useState (false);
  if (showAlert) {
    alertOnce ('대표 이미지의 사진 비율이 너무 크거나 작습니다. 최대 비율에 맞게 조정되었습니다.');
    setShowAlert (false);
  }
  const dd = useMemo (() => debounce (setShowAlert, 500), []);

  const addImages = useCallback (acceptedFiles => {
    setFiles ([
      ...files.map (file => Object.assign (file, { layout: file.updatedLayout })),
      ...acceptedFiles.map ((file, index) => {
        const i = files.length + index;
        const key = `${file.name}-${i}`; // TODO: make it unique
        const layout = {
          x: i % cols, y: Math.floor (i / cols), w: 1, h: 1, i: key,
        };
        return Object.assign (file, {
          preview: URL.createObjectURL (file), key, layout, updatedLayout: layout,
        });
      }),
    ]);
  }, [filesImmutable]);

  const removeImage = useCallback ((key) => {
    const clone = files.slice ().map (x => Object.assign (x, { layout: { ...x.updatedLayout } }));
    clone.sort (gridLayoutCompareFunction);
    const deleteIndex = clone.findIndex (l => l.key === key);
    if (deleteIndex === -1) return;
    clone.splice (deleteIndex, 1);
    for (let i = deleteIndex; i < clone.length; i += 1) {
      clone[i].layout.x -= 1;
      clone[i].updatedLayout.x -= 1;
      if (clone[i].layout.x < 0) {
        clone[i].layout.y -= 1;
        clone[i].layout.x = cols - 1;
        clone[i].updatedLayout.y -= 1;
        clone[i].updatedLayout.x = cols - 1;
      }
    }
    setFiles (clone);
  }, [filesImmutable]);

  const updateImagesInfo = useCallback (async () => {
    const titleInfo = {
      ratio: 1,
      height: 200,
    };
    const newImagesInfo = {};
    await Promise.all (
      files.map (async file => {
        const { key } = file;
        const isTitle = (file.updatedLayout.x === 0 && file.updatedLayout.y === 0);
        const info = imagesInfo[key];
        if (isTitle) {
          titleInfo.key = file.key;
        }
        if (info) {
          if (!isTitle) return;
          if (titleKey === key) {
            Object.assign (titleInfo, info);
            return;
          }
          titleInfo.ratio = info.ratio;
          return;
        }
        const image = await loadImageFile (file);
        const ratio = image.width / image.height;
        if (isTitle) {
          titleInfo.ratio = ratio;
        }
        newImagesInfo[key] = { key: file.key, ratio, height: Math.floor (200 / ratio) };
      }),
    );

    const tr = titleInfo.ratio;
    if (tr > 2) {
      titleInfo.ratio = 2;
      dd (true);
    } else if (tr < 0.5) {
      titleInfo.ratio = 0.5;
      dd (true);
    } else {
      dd (false);
    }
    titleInfo.height = Math.floor (200 / titleInfo.ratio);

    newImagesInfo.title = titleInfo;
    setImagesInfo (newImagesInfo);
  }, [filesImmutable, imagesInfo]);

  const reducer = (state, action) => {
    switch (action.type) {
      case 'addImages': {
        const { acceptedFiles } = action;
        addImages (acceptedFiles);
        break;
      }
      case 'removeImage': {
        removeImage (action.key);
        break;
      }
      case 'relocate': {
        const clone = files.slice ();
        clone.sort (gridLayoutCompareFunction);
        const result = clone.map ((file, index) => {
          const newLayout = {
            ...file.updatedLayout,
            x: index % cols,
            y: Math.floor (index / cols),
          };
          return Object.assign (file, { layout: newLayout, updatedLayout: newLayout });
        });
        setFiles (result);
        break;
      }
      case 'updateImagesInfo': {
        updateImagesInfo ().catch (error => console.error (error));
        break;
      }
      case 'revokeObjectURL': {
        setTimeout (() => {
          files.forEach (file => URL.revokeObjectURL (file.preview));
        }, 0);
        break;
      }
      case 'updateLayout': {
        const { layout } = action;
        const clone = files.map ((file, index) => Object.assign (file, { updatedLayout: layout[index] }));
        setFiles (clone);
        break;
      }
      default: {
        throw new Error (action.type);
      }
    }
  };
  const [, dispatch] = useReducer (reducer, null);
  const throttledDispatch = useMemo (() => throttle (dispatch, 100), [dispatch]);

  useEffect (() => () => dispatch ({ type: 'revokeObjectURL' }), []); // Make sure to revoke the data uris to avoid memory leaks
  useEffect (() => {
    dispatch ({ type: 'updateImagesInfo' });
  }, [filesImmutable]);

  useEffect (() => {
    dispatch ({ type: 'relocate' });
  }, [cols, dispatch]);

  const {
    getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject, open,
  } = useDropzone ({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      if (files.length + acceptedFiles.length > 20) {
        alert ('이미지는 최대 20개까지 업로드 할 수 있습니다.');
        acceptedFiles.splice (20 - files.length);
      }
      dispatch ({ type: 'addImages', acceptedFiles });
    },
  });

  const thumbs = useMemo (() => files.map (({ key, preview }) => (
    <GridItem key={key}>
      <Thumb>
        <ThumbOverlay>
          <CloseIcon onClick={e => {
            e.stopPropagation ();
            dispatch ({ type: 'removeImage', key });
          }}
          />
        </ThumbOverlay>
        <ThumbInner>
          <ThumbImage
            src={preview}
            info={{
              titleHeight,
              titleRatio,
              ratio: imagesInfo[key] ? imagesInfo[key].ratio : 1,
            }}
            alt="thumbnail"
          />
        </ThumbInner>
      </Thumb>
    </GridItem>
  )), [filesImmutable, imagesInfo, dispatch]);

  const style = useMemo (
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject],
  );
  const gridLayoutStyle = files.length ? {} : { height: 0 };
  return (
    <Wrapper>
      <h1>자보 올리기</h1>
      <Wrapper.Subtitle>
        <div className="subtitle1">이미지를 업로드하세요. &nbsp;</div>
        <Wrapper.Subtitle.Sub>
          <div className="subtitle-star">*</div>
          <div className="subtitle2">최대 20장까지 업로드 가능합니다. (이미지 사이즈는 첫 대표 이미지의 크기로 설정됩니다)</div>
        </Wrapper.Subtitle.Sub>
      </Wrapper.Subtitle>
      <div className="buttonDiv">
        <button onClick={open}>파일 선택하기</button>
      </div>
      <div className="base-component" {...getRootProps ({ style })}>
        <input {...getInputProps ()} />
        <aside style={thumbsContainer} onClick={e => e.stopPropagation ()}>
          <ResponsiveGridLayout
            style={gridLayoutStyle}
            className="responsive-grid-layout"
            rowHeight={titleHeight}
            compactType="horizontal"
            verticalCompact
            breakpoints={{
              lg: 1100,
              md: 900,
              sm: 680,
              xs: 450,
              xxs: 200,
            }}
            cols={{
              lg: 5,
              md: 4,
              sm: 3,
              xs: 2,
              xxs: 1,
            }}
            isResizable={false}
            onLayoutChange={layout => dispatch ({ type: 'updateLayout', layout })}
            layouts={{ lg: files.map (x => x.updatedLayout) }}
            onClick={e => e.stopPropagation ()}
            onWidthChange={(width, margin, newCols, containerPadding) => {
              setWidthInfo ({
                width,
                margin,
                cols: newCols,
                containerPadding,
              });
            }}
            onDrag={layout => {
              throttledDispatch ({ type: 'updateImagesInfo' });
            }}
          >
            {thumbs}
          </ResponsiveGridLayout>
        </aside>
        <Wrapper.Placeholder noFile={files.length === 0}>
          <div className="upload-placeholder">
            <img className="upload-icon" src={uploadImg} alt="upload image icon" />
            <p className="placeholder-web">원하는 이미지를 끌어다 놓으세요</p>
            <p className="placeholder-mobile">탭하여 이미지 업로드 하기</p>
          </div>
        </Wrapper.Placeholder>
      </div>
    </Wrapper>
  );
};

export default UploadImages;
