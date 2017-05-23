echo 'Fetch development sources'
git fetch --all
git reset --hard origin/development
git checkout development

echo 'Set env variables'
export CORS_ORIGIN=http://vps295137.ovh.net
export API_URI=http://vps295137.ovh.net:3004/api

npm install && npm run start:build
