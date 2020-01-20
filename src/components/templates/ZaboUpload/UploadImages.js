import React, {
  useEffect, useMemo, useState, useCallback, useReducer,
} from 'react';
import styled, { css } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import { Responsive, WidthProvider } from '@sparcs-kaist/react-grid-layout';
import CloseIcon from '@material-ui/icons/Close';

import { setImages } from '../../../store/reducers/upload';

import './grid-layout.scss';
import { gridLayoutCompareFunction, loadImageFile } from '../../../lib/utils';
import useSetState from '../../../hooks/useSetState';

const ResponsiveGridLayout = WidthProvider (Responsive);

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
  minHeight: '70vh',
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

const ThumbOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

const Thumb = styled.div`
  position: relative;
  &:hover {
    ${ThumbOverlay} {
      z-index: 1000;
      background-color: rgba(0, 0, 0, 0.5);
      svg {
        background-color: rgba(204, 204, 204, 0.3);
        border-radius: 45%;
      }
    }
  }
`;

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  // marginBottom: 8,
  // marginRight: 8,
  padding: 4,
  boxSizing: 'border-box',
};

const ThumbInner = styled.div`
  min-width: 0;
  height: auto;
  overflow: visible hidden;
  border: 1px solid #101010;
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
  .responsive-grid-layout {
    width: 100%;
  }
`;

const UploadImages = props => {
  const reduxDispatch = useDispatch ();
  const filesImmutable = useSelector (state => state.getIn (['upload', 'images']));
  const files = filesImmutable.toJS ();
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

  const removeImage = useCallback ((e, key) => {
    e.stopPropagation ();
    const clone = files.map (x => Object.assign (x, { layout: { ...x.updatedLayout } }));
    clone.sort (gridLayoutCompareFunction);
    const deleteIndex = clone.findIndex (l => l.key === key);
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
          titleInfo.height = Math.floor (200 / info.ratio);
          titleInfo.ratio = info.ratio;
          return;
        }
        const image = await loadImageFile (file);
        const ratio = image.width / image.height;
        if (isTitle) {
          titleInfo.height = Math.floor (200 / ratio);
          titleInfo.ratio = ratio;
        }
        newImagesInfo[key] = { key: file.key, ratio, height: Math.floor (200 / ratio) };
      }),
    );
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
        const { e, key } = action;
        removeImage (e, key);
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

  useEffect (() => () => dispatch ({ type: 'revokeObjectURL' }), []); // Make sure to revoke the data uris to avoid memory leaks
  useEffect (() => {
    dispatch ({ type: 'updateImagesInfo' });
  }, [filesImmutable]);

  useEffect (() => {
    dispatch ({ type: 'relocate' });
  }, [cols, dispatch]);

  const {
    getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject,
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
    <Thumb
      key={key}
      style={thumb}
    >
      <ThumbOverlay>
        <CloseIcon onClick={e => dispatch ({ type: 'removeImage', e, key })} />
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
      <div {...getRootProps ({ style })}>
        <input {...getInputProps ()} />
        <aside style={thumbsContainer} onClick={e => e.stopPropagation ()}>
          <ResponsiveGridLayout
            style={gridLayoutStyle}
            className="responsive-grid-layout"
            rowHeight={titleHeight}
            compactType="horizontal"
            verticalCompact
            breakpoints={{
              lg: 1300,
              md: 1100,
              sm: 900,
              xs: 680,
              xxs: 450,
            }}
            cols={{
              lg: 6,
              md: 5,
              sm: 4,
              xs: 3,
              xxs: 2,
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
            onDrag={() => dispatch ({ type: 'updateImagesInfo' })}
          >
            {thumbs}
          </ResponsiveGridLayout>
        </aside>
        <p style={{ justifySelf: 'flex-end' }}>Drag drop some files/folder here, or click to select</p>
      </div>
    </Wrapper>
  );
};

export default UploadImages;
