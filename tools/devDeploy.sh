echo 'Fetch development sources'
git fetch --all
git reset --hard origin/development
git checkout development

npm install
npm run start:build
