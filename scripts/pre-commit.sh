#!/bin/bash

bun run check_types
[ $? -ne 0 ] && exit 1

EXIT_CODE=0

echo -n "eslint "

git diff --name-only --cached | grep -E '\.(js|ts)$' | while read FILE
do
  [ -f "$FILE" ] || continue
	echo -n "$FILE "
  ./node_modules/.bin/eslint --fix "$FILE"
  [ $? -ne 0 ] && EXIT_CODE=1
  git add "$FILE"
done

exit $EXIT_CODE
