#!/usr/bin/env node

import { OptionValues } from 'commander';
import ghpages from 'gh-pages';
import {
  displaySuccessMessage,
  displayWarningMessage,
} from './displayMessages';

export const publish = (options: OptionValues) => {
  ghpages.publish(options.dir, options, (err) => {
    if (err) {
      displayWarningMessage('Something has gone wrong!');
      throw err;
    }

    displaySuccessMessage('Deployment successfully completed!');
  });
};
