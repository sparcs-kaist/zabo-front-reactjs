import React from 'react';
import { storiesOf } from '@storybook/react';

import Header from './index';

storiesOf ('templates/Header', module).add (
  'Default',
  () => (
    <Header
      match={{
        params: {
          route: undefined,
        },
      }}
    />
  ),
  {
    notes: '',
  },
);
