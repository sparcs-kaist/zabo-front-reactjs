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
      li {
         padding-left: 1em;
         &::before {
           font-family: NotoSans, Arial, sans-serif;
         }
       }
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
      border: 0;
      margin: 8px 0 18px 0;
      .ql-editor {
        border-radius: 4px;
        min-height: 142px;
        padding: 11px 16px;
        background-color: #F4F4F4;
        font-size: 14px;
        color: #202020;
        &::placeholder {
          color: #8F8F8F;
        }
      }
    }
  `
    : css`
    .ql-container {
      .ql-editor {
        font-size: 14px;
        line-height: 18px;
        color: #202020;
        padding: 0;
      }
    }
`)};
`;

export default StyledQuill;
