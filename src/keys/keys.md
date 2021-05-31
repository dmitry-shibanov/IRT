## Keys json
Keys were generated with this command 
```
node -e "let r = Math.random().toString(36).substr(2, 3) + \"-\" + Math.random().toString(36).substr(2, 3) + \"-\" + Math.random().toString(36).substr(2, 4); console.log(r);"
```

## db json
Specify properties for connection to mongoDb in db.json
### Properties:
 - databaseName - contains name of database
 - userName - name of user for connection to database
 - password - password for connection to database

 ## email.json:
 ### Properties:
 - user
 - password