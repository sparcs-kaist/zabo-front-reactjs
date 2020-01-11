import React, {
  useEffect, useMemo, useState, useCallback,
} from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import { Responsive, WidthProvider } from 'lib/react-grid-layout';

import CloseIcon from '@material-ui/icons/Close';

import { setImages } from '../../../store/reducers/upload';

import './grid-layout.scss';
import { gridLayoutCompareFunction } from '../../../lib/utils';

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

const img = {
  display: 'block',
  width: 200,
  height: 'auto',
};

const Wrapper = styled.section`
  .responsive-grid-layout {
    width: 100%;
  }
`;

const UploadImages = props => {
  const [imageRef, setImageRef] = useState (null);
  const [titleImage, setTitleImage] = useState ('');

  const [widthInfo, setWidthInfo] = useState ({
    width: 0,
    margin: 0,
    cols: 0,
    containerPadding: 0,
  });
  const dispatch = useDispatch ();
  const filesImmutable = useSelector (state => state.getIn (['upload', 'images']));
  const files = filesImmutable.toJS ();
  const setFiles = imageFiles => dispatch (setImages (imageFiles));

  const {
    getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject,
  } = useDropzone ({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      if (files.length + acceptedFiles.length > 20) {
        alert ('이미지는 최대 20개까지 업로드 할 수 있습니다.');
        acceptedFiles.splice (20 - files.length);
      }
      setFiles ([
        ...files.map (file => Object.assign (file, { layout: file.updatedLayout })),
        ...acceptedFiles.map ((file, index) => Object.assign (file, {
          preview: URL.createObjectURL (file),
          key: `${file.name}-${files.length + index}`,
          layout: {
            x: files.length + index,
            y: 0,
            w: 1,
            h: 1,
            i: `${file.name}-${files.length + index}`,
          },
          updatedLayout: {
            x: files.length + index,
            y: 0,
            w: 1,
            h: 1,
            i: `${file.name}-${files.length + index}`,
          },
        })),
      ]);
    },
  });

  useEffect (
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      setTimeout (() => files.forEach (file => URL.revokeObjectURL (file.preview)), 0);
    },
    [],
  );

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

  const thumbs = files.map (file => {
    const isTitle = (file.updatedLayout.x === 0 && file.updatedLayout.y === 0);
    if (isTitle && file.key !== titleImage) {
      setTimeout (() => setTitleImage (file.key), 0);
    }
    const imageProps = isTitle ? {
      ref: ref => { setImageRef (ref); },
    } : {};

    return (
      <Thumb
        key={file.key}
        style={thumb}
      >
        <ThumbOverlay>
          <CloseIcon
            onClick={e => {
              e.stopPropagation ();
              const clone = files.map (x => Object.assign (x, { layout: { ...x.updatedLayout } }));
              clone.sort (gridLayoutCompareFunction);
              const deleteIndex = clone.findIndex (l => l.key === file.key);
              URL.revokeObjectURL (clone[deleteIndex].preview);
              clone.splice (deleteIndex, 1);
              for (let i = deleteIndex; i < clone.length; i += 1) {
                clone[i].layout.x -= 1;
                clone[i].updatedLayout.x -= 1;
                if (clone[i].layout.x < 0) {
                  clone[i].layout.y -= 1;
                  clone[i].layout.x = widthInfo.cols - 1;
                  clone[i].updatedLayout.y -= 1;
                  clone[i].updatedLayout.x = widthInfo.cols - 1;
                }
              }
              setFiles (clone);
            }}
          />
        </ThumbOverlay>
        <ThumbInner>
          <img {...imageProps} src={file.preview} style={img} alt="thumbnail" />
        </ThumbInner>
      </Thumb>
    );
  });

  return (
    <Wrapper>
      <div {...getRootProps ({ style })}>
        <input {...getInputProps ()} />
        <aside style={thumbsContainer} onClick={e => e.stopPropagation ()}>
          <ResponsiveGridLayout
            style={gridLayoutStyle}
            className="responsive-grid-layout"
            rowHeight={imageRef ? imageRef.height : 200}
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
            onLayoutChange={layout => {
              const clone = files.map ((file, index) => Object.assign (file, { updatedLayout: layout[index] }));
              setFiles (clone);
              const title = layout.find (l => (l.x === 0 && l.y === 0));
              if (title) setTimeout (() => setTitleImage (title.i), 0);
            }}
            layouts={{ lg: files.map (x => x.layout) }}
            onClick={e => e.stopPropagation ()}
            onWidthChange={(width, margin, newCols, containerPadding) => {
              setWidthInfo ({
                width,
                margin,
                cols: newCols,
                containerPadding,
              });
            }}
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
