#!/usr/bin/env node

export const defaults = {
  dir: 'dist',
  dest: '.',
  add: false,
  git: 'git',
  depth: '1',
  dotfiles: false,
  branch: 'gh-pages',
  remote: 'origin',
  src: '**/*',
  remove: '.',
  push: true,
  history: true,
  message: 'Updates',
  silent: false,
  tag: '',
};

export const queries = [
  {
    option: 'dir',
    title: 'Change the base directory for all source files.',
    default: defaults.dir,
    query: 'Enter the base directory for all source files:',
    pattern: /^[\w-]+$/i,
  },
  {
    option: 'user',
    title: 'Change user information.',
    default: 'user.name & user.email from .gitconfig',
    query: 'Enter user information (format: "name email"):',
    pattern: /^[\w-]+\s(.+@.+\..+)$/i,
  },
  {
    option: 'src',
    title:
      'Change the pattern of mini-references used to select files to publish.',
    default: defaults.src,
    query:
      'Enter the template(s) used to select files for publication (format: "template template template ..."):',
    pattern:
      /^[\w*\/-]+\.[\w*]+$|^([\w*\/-]+\.[\w*]+\s){1,}[\w*\/-]+\.[\w*]+$/i,
  },
  {
    option: 'repo',
    title: 'Change the URL of the repository.',
    default: 'current working directory is a git repository',
    query: 'Enter the URL of the repository:',
    pattern:
      /^((http[s]?|ftp):\/)?\/?([^:\/\s]+)((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(.*)?(#[\w\-]+)?$/,
  },
  {
    option: 'branch',
    title: 'Change the name of the branch to which you will send files.',
    default: defaults.branch,
    query: 'Enter the name of the branch to which the files will be sent:',
    pattern: /^[\w-]+$/i,
  },
  {
    option: 'dest',
    title: 'Change the destination folder in the destination branch.',
    default: defaults.dest,
    query: 'Specify the destination folder in the destination branch:',
    pattern: /^[\w-]+$|^([\w-]+\/){1,}[\w-]+$/i,
  },
  {
    option: 'dotfiles',
    title: 'Enable dot files.',
    default: 'not included',
    query: 'Enable inclusion of dot files? (y/n)',
    pattern: /^y|n$/,
  },
  {
    option: 'add',
    title:
      'Enable the option to add, rather than replace, existing files in the repository.',
    default: 'not included',
    query:
      'Enable the option to add, rather than replace, existing files in the repository? (y/n)',
    pattern: /^y|n$/,
  },
  {
    option: 'remote',
    title: 'Change the name of the remote you will connect to.',
    default: defaults.remote,
    query:
      'Enter the name of the remote control to which the connection is to be made:',
    pattern: /^[\w-]+$/i,
  },
  {
    option: 'tag',
    title: 'Create a tag after committing changes to the target branch.',
    default: '" "',
    query: 'Create a tag after committing changes to the target branch:',
    pattern: /.*/,
  },
  {
    option: 'message',
    title: 'Create a commit message for all commits.',
    default: defaults.message,
    query: 'Create a commit message for all commits:',
    pattern: /.*/,
  },
  {
    option: 'remove',
    title:
      'Specify the pattern by which files in the final repository will be deleted (ignored if used in conjunction with --add).',
    default: defaults.remove,
    query:
      'Specify the pattern by which files in the final repository will be deleted (ignored if used in conjunction with --add):',
    pattern: /^[\w*-]+\.[\w*]+$/i,
  },
  {
    option: 'push',
    title: 'Change the option to send to repository.',
    default: 'included',
    query: 'Send to storage? (y/n)',
    pattern: /^y|n$/,
  },
];
