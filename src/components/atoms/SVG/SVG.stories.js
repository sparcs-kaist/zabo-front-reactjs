import React from 'react';
import { storiesOf } from '@storybook/react';

import SVG from './index';
import { icons } from './SVG';

Object.keys (icons)
  .forEach (icon => {
    storiesOf ('atoms/SVG', module)
      .add (icon, () => <SVG icon={icon} />, {
        notes: '',
      });
  });
