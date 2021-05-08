const moment = require('moment');
var fs = require('fs');
const config = require("config");
let connection = config.get("db");
var dir = './backups';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

const dumpFileName = `backups/${moment().format('yyyy-MMM-DD HH-mm-ss A')}.dump.sql`
const mysqldump = require('mysqldump');

async function dump(){
  mysqldump({
    connection: connection,
    dumpToFile: dumpFileName,
  })
}

async function start(){
  await dump();
  console.log(`Backup created with name : ${dumpFileName}`);
}

start()