import styled, { css } from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

const StyledQuill = styled (ReactQuill)`
  @import url(//fonts.googleapis.com/css?family=Noto+Sans+KR:400,700&display=swap&subset=korean);
  .ql-container {
    .ql-editor {
      font-size: 16px;
      font-family: NanumSquare, Arial, sans-serif;
      ol { padding-left: 0; }
      ul { padding-left: 0; }
      li { padding-left: 1em; }
  ${(() => {
    let result = '';
    for (let i = 1; i <= 8; i += 1) {
      result += `.ql-indent-${i} { padding-left: calc(1em + ${3 * i}px); }\n`;
      result += `p.ql-indent-${i} { padding-left: ${3 * i}px; }\n`;
    }
    return result;
  }) ()};
    }
  }
  
  ${props => (!props.readOnly ? css`
    .ql-container {
      border: 1px solid rgb(169, 169, 169);
      border-radius: 3px;
    }
  `
    : css`
    .ql-container {
      .ql-editor {
        padding: 0;
      }
    }
`)};
`;

export default StyledQuill;
