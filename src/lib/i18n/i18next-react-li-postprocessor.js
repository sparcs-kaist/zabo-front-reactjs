import React from 'react';
import { splitReg, render } from './i18next-react-react-postprocessor';

class Li {
  type = 'postProcessor'

  name = 'li'

  process = (value, key, options, translator) =>
  /* return manipulated value */
    value.split ('\n').map ((item, index) => (
      <li key={index} className={options.className}>
        {render (item.split (splitReg), options, '1')}
      </li>
    ))
}

export default Li;
