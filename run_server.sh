#!/bin/bash

cd client
pm2 start "npm --watch start" --name front-server
cd ../server
pm2 start "npm --watch run dev" --name api-server
cd ../image_server
pm2 start "npm --watch run dev" --name image-server
cd ..

# pm2 list : 프로세스 목록
# pm2 kill : 모든 프로세스 킬