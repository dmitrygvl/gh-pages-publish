# gh-pages-deploy-app

<p>
<img alt="Badge" src="https://github.com/dmitrygvl/gh-pages-publish/actions/workflows/sanity-check.yml/badge.svg" />
</p>

## Getting Started

```shell
npm install gh-pages-publish --save-dev
```

### Command - deploy

```
Options:
  -d, --dir <dir>          Base directory for all source files (default: "dist")
  -s, --src <src>          Pattern used to select which files to publish (default: "**/*")
  -b, --branch <branch>    Name of the branch you are pushing to (default: "gh-pages")
  -e, --dest <dest>        Target directory within the destination branch (relative to the root) (default: ".")
  -a, --add                Add and never remove existing files (default: false)
  -x, --silent             Do not output the repository url (default: false)
  -m, --message <message>  commit message (default: "Updates")
  -g, --tag <tag>          add tag to commit (default: "")
  -t, --dotfiles           Include dotfiles (default: false)
  -r, --repo <repo>        URL of the repository you are pushing to
  -o, --remote <name>      The name of the remote (default: "origin")
  -u, --user <address>     The name and email of the user (defaults to the git config).  Format is "name email".
  -v, --remove <pattern>   Remove files that match the pattern (ignored if used together with --add). (default: ".")
  -n, --no-push            Commit only (with no push)
  -f, --no-history         Force push new commit without parent history
  -h, --help               display help for command
```

#### Deploy without parameters

Git user must be autorized, the remote repository must be linked to the local repository. Project must be in the dist folder.

```properties
npx gh-pages-publish deploy
```

#### Deploy with parameters

Deploy with parameters that can changed in the deployment configuration.

```properties
npx gh-pages-publish --dir docs --repo https://github.com/dmitrygvl/gh-pages-publish.git -m Test-deploy
```

### Commands

#### config

The command for configuring deployment with the CLI.

```properties
npx gh-pages-publish config
```

#### build

The command for pre-building with Webpack.

```properties
npx gh-pages-publish build
```

##### Necessary for correct work:

- Webpack & Webpack CLI are installed in project's dependencies;
- webpack.config.(j|t)s file are configured;
- Script "build" exists in package.json;
