#!/usr/bin/env bash
# reset environment variables that could interfere with common usage
export GREP_OPTIONS=
# put all utility functions here

# make a temporary file
git_extra_mktemp() {
    mktemp -t "$(basename "$0")".XXX
}

#
# check whether current directory is inside a git repository
#

is_git_repo() {
  git rev-parse --show-toplevel > /dev/null 2>&1
  result=$?
  if test $result != 0; then
    >&2 echo 'Not a git repo!'
    exit $result
  fi
}

is_git_repo

test -z "$1" && echo "submodule required" 1>&2 && exit 1
cd "$(git root)"
test ! -f .gitmodules && echo ".gitmodules file not found" 1>&2 && exit 2

NAME="$(echo "$1" | sed 's/\/$//g')"
test -z \
    "$(git config --file=.gitmodules submodule."$NAME".url)" \
    && echo "submodule not found" 1>&2 && exit 3

# 1. Delete the relevant section from .git/config and clean submodule files
git submodule deinit -f "$NAME" || exit 4
rmdir "$NAME"
rm -rf .git/modules/"$NAME"
# 2. Delete the relevant line from .gitmodules
git config --file=.gitmodules --remove-section submodule."$NAME"
git add .gitmodules
# 3. Run git rm --cached path_to_submodule
git rm --cached -rf "$NAME"
# 4. Need to confirm and commit the changes for yourself
echo
echo "Now submodule $NAME is deleted."
echo 'Confirm with `git submodule status` and commit the changes for yourself.'