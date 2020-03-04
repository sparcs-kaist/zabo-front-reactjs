#!/bin/bash
verbose()
{
	if $1; then
	    exec 4>&2 3>&1
	    IS_VERBOSE=true
	else
	    exec 4>/dev/null 3>/dev/null
	    IS_VERBOSE=false
	fi
}

to_verboseOut()
{
	echo "$1" >&3
}

to_verboseErr()
{
	echo >&2 "$1" 2>&4
}

if [ -n "$IS_VERBOSE" ]; then
	verbose $IS_VERBOSE
else
	verbose false
fi