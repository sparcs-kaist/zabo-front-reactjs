import React from 'react';
import { storiesOf } from '@storybook/react';

import SVG from './index';
import { faIcons } from './SVG';

Object.keys (faIcons)
  .forEach (icon => {
    storiesOf ('atoms/SVG', module)
      .add (icon, () => <SVG icon={icon} />, {
        notes: '',
      });
  });
