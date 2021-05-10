var cron = require('node-cron');
const moment = require('moment');
var fs = require('fs');
const config = require("config");
let connection = config.get("db");
var dir = './backups';

if (!fs.existsSync(dir)){
  fs.mkdirSync(dir);
}
const mysqldump = require('mysqldump');

async function dump(){
  let dumpFileName = `backups/${moment().format('yyyy-MMM-DD HH-mm-ss A')}.dump.sql`
  await mysqldump({
    connection: connection,
    dumpToFile: dumpFileName,
  })
  console.log(`Backup created with name : ${dumpFileName}`);
}

async function start(){
  console.log('started cron')

  cron.schedule('0 0/12 * * *', async () => {
    console.log('Running backup for sql database');
    await dump();
  });

  cron.schedule('0/30 * * * *', () => {
    console.log('Backup Cron Heatbeat');
  });
}

start()