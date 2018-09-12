#! /bin/sh
set -o errexit

echo "deploying to now.sh"
now --public

echo "setting alias for url"
now alias

echo "cleaning up older unaliased deployments"
now rm magic-patatap --safe --yes || true

echo "done"
