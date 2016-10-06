echo 'Fetch development sources'
git checkout development
git pull

npm install
npm run start:build
