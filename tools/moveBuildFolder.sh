#!/bin/bash

SECOND=0

# this causes the current directory to become the parent of this script,
# which is the app's roots
cd "$( dirname "${BASH_SOURCE[0]}" )/.."
. tools/modules/colors.inc.sh
. tools/modules/verbose.inc.sh

say () {
  echo "=> $@"
}

help_move_build_folder()
{
  echo "Usage: $0 -v"
  echo "Options: These are optional argument"
  echo " -v verbose"
  echo " -h help"
  echo " -l run only if running in linux machine"
  exit 1
}

while getopts vlh opt
do
  case "$opt" in
    v) verbose true;;
    l)
        if [ ! $(uname -s) == "Linux" ]; then
            exit 0
        fi
        ;;
    h) help_move_build_folder; exit 1;;
    \?) help_move_build_folder; exit 1;;
  esac
done

say "Moving build folder to deploy"

say "Check if maintenance is on"
# since we're currently in the app's root, we just need to climb up one level
# to find the maintenance file
if [ -f ../maintenance_on.html ];
then
  say "-- Maintenance is on, aborting the process"
  exit
else
  say "-- Maintenance is off, proceed"
fi

say "Removing current deploy > $ rm -rf deploy"
rm -rf deploy

say "Copying build to deploy > $ cp -r build deploy"
cp -r build deploy

timestamp=`date "+%Y-%m-%d %H:%M:%S"`
min=$(($SECONDS / 60))
sec=$(($SECONDS % 60))

say
say "====== Directory copied successfully ======"
say "+-----------------------------------------+"
say "| Task completed at   $timestamp |"
say "| Time elapsed        "$min"m and "$sec"s           |"
say "+-----------------------------------------+"
