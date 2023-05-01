# Mooch-Lightning

cd into mooch-client

do an npm install

open the mooch-client folder in vs code. NOT THE MOOCH-Lightning parent directory

create a new file, .env.local and paste in the firebase Keys from slack

run the latest version of the db creation script against your db

In visual studio right click on dependencies folder and select reload

In visual studio, right on Mooch-Lighting, select Manage User Secrets, then add the following after your connections string:

```
  "FirebaseProjectId": "mooch-lightning"
```

start both applications, front end with running `npm start` when in the mooch-client directory
