
#!/bin/bash
#PRODUCTION
# git reset --hard
# git checkout main
# git pull origin main

npm install
npm run build
pm2 start process.config.js --env production


# #DEVELOPMENT
# git reset --hard
# git checkout dev
# git pull origin dev


# npm install
# pm2 start process.config.js --env production

# npm i
# pm2 start "npm run start:dev" --name "ZENVYRA"
