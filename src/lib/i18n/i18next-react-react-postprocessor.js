import React from "react";
import { Link } from "react-router-dom";
// import { Debugger } from "lib/utils" // CIRCULAR DEPENDENCY ERROR
//
// const debug = Debugger('react-postprocessor')

// ERROS
const NOT_SUPPORTED_TAG = "NOT SUPPORTED TAG FOUND";
const CLOSE_TAG_NOT_FOUND = "CLOSE TAG NOT FOUND";

/* Position Calculation
1   <link>
11          <bold>
            </bold>
    </link>
2   <link>
21          <red>
211                 <bold>
                    </bold>
            </red>
22          <bold>
            </bold>
    </link>
*/

// "UNIT": "SSSS <bold>BOLD</bold> <red>RED</red> <link>LINK</link> EEEEE",
// "BOLDRED": "SSSS <bold>BOLD <red>RED IN BOLD</red></bold> EEEEE",
// "BOLDLINK": "SSSS <link>LINK <bold>BOLD IN LINK</bold></link>",
// "LINKS": "SSSS <link>FIRST LINK</link> <link>SECOND LINK</link>",
// "POSITIONS": "SSS 1 <link> 11<bold>111</bold></link> 2 <link> 21<red>211<bold>2111</bold></red>22<bold>221</bold></link> EEE>",
// "NOT_SUPPORT": "<asdf></asdf>",
// "NO_CLOSING": "<bold>",

export const splitReg = /(<[a-zA-Z]+>|<\/[a-zA-Z]+>)/;

export const render = (array, options, position) => {
  // debug.log('render', array, position)
  if (array.length < 3) return array[0];
  const tag = array[1];
  if (array.length < 5) {
    console.warn(CLOSE_TAG_NOT_FOUND, tag, array);
    return CLOSE_TAG_NOT_FOUND;
  }
  let closeTag = "</>";
  let Component;

  switch (tag) {
    case "<bold>":
      closeTag = "</bold>";
      Component = ({ children, ...props }) => <strong {...props}>{children}</strong>;
      break;
    case "<red>":
      closeTag = "</red>";
      Component = ({ children, ...props }) => (
        <span style={{ color: "red" }} {...props}>
          {children}
        </span>
      );
      break;
    case "<link>":
      closeTag = "</link>";
      Component = ({ children, to, ...props }) => {
        const safeTo = to || (options.to ? options.to : "#");
        return (
          <Link to={safeTo} {...props}>
            {children}
          </Link>
        );
      };
      break;
    case "<a>":
      closeTag = "</a>";
      Component = ({ children, href, ...props }) => {
        const safeHref = href || (options.href ? options.href : "#");
        return (
          <a href={safeHref} target="_blank" rel="noopener noreferrer" {...props}>
            {children}
          </a>
        );
      };
      break;
    case "<span>":
      closeTag = "</span>";
      Component = ({ children, ...props }) => <span {...props}>{children}</span>;
      break;
    default:
      console.warn(NOT_SUPPORTED_TAG, tag, array);
      return NOT_SUPPORTED_TAG;
  }
  const closeIndex = array.indexOf(closeTag);
  if (closeIndex === -1) {
    console.warn(CLOSE_TAG_NOT_FOUND, closeTag, array);
    return CLOSE_TAG_NOT_FOUND;
  }

  const props = options[position];

  return render(
    [
      <>
        {array[0]}
        <Component {...props}>
          {render(array.slice(2, closeIndex), options, `${position}1`)}
        </Component>
        {array[closeIndex + 1]}
      </>,
      ...array.slice(closeIndex + 2),
    ],
    options,
    (Number(position) + 1).toString(),
  );
};

class ReactPostProcessor {
  type = "postProcessor";

  name = "React";

  process = (value, key, options, translator) => render(value.split(splitReg), options, "1");
  /* return manipulated value */
  // debug.log('====>> React processor')
  // debug.log(value)
  // debug.log(options)
}

export default ReactPostProcessor;
