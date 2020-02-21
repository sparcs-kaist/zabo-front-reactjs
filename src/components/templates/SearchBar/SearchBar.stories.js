import React from 'react';
import { storiesOf } from '@storybook/react';

import SearchBar from './index';

storiesOf ('templates/SearchBar', module).add ('Default', () => <SearchBar />, {
  notes: '',
});
