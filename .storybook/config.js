import React from 'react';
import { addDecorator, setAddon, configure } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { setOptions } from '@storybook/addon-options';
import infoAddon from '@storybook/addon-info';
import { checkA11y } from 'storybook-addon-a11y';

import '../src/layouts/reset.css';
import '../src/layouts/normalize.css';

setOptions({
  name: 'Playbook',
  goFullScreen: false,
  showLeftPanel: true,
  showDownPanel: false,
  showSearchBox: false,
  downPanelInRight: false,
});

const req = require.context('../src', true, /stories\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

// Wrap all stories in decorator
addDecorator(checkA11y);
setAddon(infoAddon);
addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>);

configure(loadStories, module);
