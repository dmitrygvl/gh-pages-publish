#!/usr/bin/env node

import { green, red } from 'colorette';

export const displaySuccessMessage = (message: string) => {
  console.log(green(message));
};

export const displayWarningMessage = (message: string) => {
  console.log(red(message));
};
