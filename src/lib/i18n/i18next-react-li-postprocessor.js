import React from 'react';

import { render, splitReg } from './i18next-react-react-postprocessor';

class Li {
  type = 'postProcessor'

  name = 'li'

  /* return manipulated value */
  process = (value, key, options, translator) => value.split ('\n').map ((item, index) => (
    <li key={index} className={options.className}>
      {render (item.split (splitReg), options, '1')}
    </li>
  ))
}

export default Li;
