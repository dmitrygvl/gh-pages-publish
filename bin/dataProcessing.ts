#!/usr/bin/env node

import { OptionValues } from 'commander';
import { queries } from './constants';

type TTransformValue =
  | string
  | boolean
  | string[]
  | {
      name: string;
      email: string;
    };

export const inputValidation = (value: string, index: number): boolean =>
  queries[index].pattern.test(value);

export const transformInputValue = (
  value: string,
  index: number,
): TTransformValue => {
  if (index === 6 || index === 7 || index === 12) {
    if (value === 'y') {
      return true;
    }

    return false;
  }

  if (index === 2) {
    if (value.split(' ').length === 1) {
      return value;
    }

    return value.split(' ');
  }

  if (index === 1) {
    const split = value.split(' ');

    return {
      name: split[0],
      email: split[1],
    };
  }

  return value;
};

export const updateConfig = (
  value: TTransformValue,
  index: number,
  options: OptionValues,
) => {
  const newOptions = { ...options };

  newOptions[queries[index].option] = value;

  return newOptions;
};
