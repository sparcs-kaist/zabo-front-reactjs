import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import GridLayout, { Responsive, WidthProvider } from 'lib/react-grid-layout';


import CloseIcon from '@material-ui/icons/Close';

import { setImages } from '../../../store/reducers/upload';

import './grid-layout.scss';

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
      background-color: rgba(0,0,0,0.5);
      svg {
        background-color: rgba(204,204,204, 0.3);
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
  // width: 200,
  // height: 200,
  padding: 4,
  boxSizing: 'border-box',
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%',
};

const Wrapper = styled.section`
  .responsive-grid-layout {
    width: 100%;
  }
`;

const Previews = (props) => {
  const dispatch = useDispatch ();
  const filesImmutable = useSelector (state => state.getIn (['upload', 'images']));
  const files = filesImmutable.toJS ();
  const setFiles = (imageFiles) => dispatch (setImages (imageFiles));

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone ({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      console.log (files, acceptedFiles);
      setFiles (
        [
          ...files.map(file => Object.assign(file, { layout: file.updatedLayout })),
          ...acceptedFiles.map ((file, index) => Object.assign (file, {
            preview: URL.createObjectURL (file),
            key: `${file.name}-${files.length + index}`,
            layout: {
              x: files.length + index, y: 0, w: 1, h: 1, i: `${file.name}-${files.length + index}`,
            },
            updatedLayout: {
              x: files.length + index, y: 0, w: 1, h: 1, i: `${file.name}-${files.length + index}`,
            },
          })),
        ],
      );
    },
  });

  const style = useMemo (() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {}),
  }), [
    isDragActive,
    isDragReject,
  ]);

  const thumbs = files.map ((file, index) => (
    <Thumb
      key={file.key}
      // data-grid={file.layout}
      style={thumb}
    >
      <ThumbOverlay>
        <CloseIcon onClick={e => {
          e.stopPropagation ();
          const clone = files.map (x => Object.assign (x, { layout: x.updatedLayout }));
          clone.splice (index, 1);
          setFiles (clone);
        }}
        />
      </ThumbOverlay>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          alt="thumbnail"
        />
      </div>
    </Thumb>

  ));

  useEffect (() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    setTimeout (() => files.forEach (file => URL.revokeObjectURL (file.preview)), 0);
  }, [filesImmutable]);


  return (
    <Wrapper>
      <div {...getRootProps ({ style })}>
        <input {...getInputProps ()} />
        <aside style={thumbsContainer} onClick={e => e.stopPropagation ()}>
          <ResponsiveGridLayout
            className="responsive-grid-layout"
            rowHeight={200}
            compactType="horizontal"
            verticalCompact
            breakpoints={{
              lg: 1200, md: 1000, sm: 800, xs: 400, xxs: 200,
            }}
            cols={{
              lg: 6, md: 5, sm: 4, xs: 2, xxs: 1,
            }}
            isResizable={false}
            onLayoutChange={layout => {
              const clone = files.map ((file, index) => Object.assign (file, { updatedLayout: layout[index] }));
              setFiles (clone);
            }}
            layouts={{ lg: files.map (x => x.layout) }}
            onClick={e => e.stopPropagation ()}
          >
            {thumbs}
          </ResponsiveGridLayout>
        </aside>
        <p>Drag drop some files/folder here, or click to select</p>
      </div>
    </Wrapper>
  );
};

const UploadImage = () => (
  <div />
);

export default Previews;
