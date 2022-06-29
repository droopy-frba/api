# API

## Run
#### Install
`npm install` or `npm i`

#### Copy Env
`cp .env.sample .env`

#### DB setup

Enter to db with command `docker exec -it droopy-db bash` once inside enter mysql with `mysql -proot` the type all the commands below
```
CREATE USER 'droopy'@'%' IDENTIFIED BY 'droopy';
GRANT ALL PRIVILEGES ON * . * TO 'droopy'@'%';
FLUSH PRIVILEGES;
CREATE database droopy;
```

#### Run migrations
```bash
docker exec petaverse-api npm run migration:run  
```

#### Run Server
```
docker-compose -f docker/docker-compose.yml up
```


