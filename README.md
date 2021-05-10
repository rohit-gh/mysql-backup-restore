## Install dependencies

```
npm install
```

## Update database variables

- Open `config/default.json`
- update to your actual database variables


## For Backup

```
npm run backup
```


## For restore

```
npm run restore
```


## For cron

- This will run backup at every 12 hours
- Will throw a heartbeat every 30 minutes to see if its still working.

```
npm run backup-cron
```