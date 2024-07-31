# LeCow App

Simple Web App to keep track of expenses by group of peole that hangs out

## Developemt requirements

* git and bash
* docker desktop
* [asdf](https://asdf-vm.com/guide/getting-started.html) with [node plugin](https://github.com/asdf-vm/asdf-nodejs)
* vs-code or compatible IDE
* node lts 20 handled by asdf
  ```
  asdf node update nodebuild
  asdf install nodejs $(asdf nodejs resolve lts --latest-available)
  ```

## Development flow

To be updated with the latest changes for the repo:

* Fork this repo to your account
* Clone your forked repo to your local
* Add `upstream` remote to your local repo: `git remote add upstream git@github.com:ksrarc/lecow.git`
  * Fetch `upstream` with `git fetch upstream`
  * Rebase `main` with `git checkout main && git rebase upstream/main`