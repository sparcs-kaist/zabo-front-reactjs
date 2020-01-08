import React from 'react';
import { storiesOf } from '@storybook/react';

import FloatingNavigator from './index';

storiesOf ('templates/FloatingNavigator', module).add ('Default', () => <FloatingNavigator />, {
  notes: '',
});
