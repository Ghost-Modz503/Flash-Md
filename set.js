const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0NMeEtkS2IwYXp0aGFTOUphWkdRQ0JhaEVaekxUcHVabFdQU3J1bHJFbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicWkyc21mRklINnYyOHk3cFlCSTdBUW4xQjByTHl6NjdXTnlvZDUwc1JHUT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzRDJnMGR4N0UyK0h1SmxFTERCb1poSzhmYWtKUzliYThDY2dBU001QWxBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIwZkxiWDJQM09uKzNMTnd3NGh6Z0hxanRndlY2SWR6ZDVpN012aU40TWdzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktPd01qbUJVZ0xUL251clpRTkdHTkwvWE14ell1aW9yMUEwVm0vSkxwVVE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhwMEJXR0xhS0VIeDRpeTRPeW1RYVBsYzJKNU42eXBVQ25weDBuV3ZZV0k9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUxBNUdiZ1ZlL3J1WnBXaUNCbUkzUS94bG1MYVQxUUJEeittaUVra3ZGOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOTFncUNWNkliVUlReldTWHBVdUUzZTBFNEZ3NE4waXlOVzVERzdscjYzST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IldhR3pNemhUbG9YS0ExWU9zdVNVOEh4TTJ0bWw4NUJGQjl1elVjV1kzcFV2dzhVZ0ZreUNLb1RhNlFKVlM4Y2RyZHQxSGxNdnBsbGJ5dmtpcjdKWUFRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjQ2LCJhZHZTZWNyZXRLZXkiOiJ3Y1pqdW5DdmU5SmxURnk2dytJU3BJcyt4SmJEMXlFM3QwNVVERVJ5ZWo4PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJBcWJDU0dFRFFzcWh0NDE0V3RnV1lBIiwicGhvbmVJZCI6IjM4MzdkM2E3LWI5NGUtNDkxMy1iMTQ4LTExMWY1MTRiYjJjMiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ4ZC9LdGQ0Zk12ZWxiVEhVYnA3NXQ3UDg4b0k9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0ljWDBiWVFhSnBWVzE1dWcrQmdrV0JPSkgwPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkVKRDg0NTVEIiwibWUiOnsiaWQiOiIyNTg4NjkxMTMyODU6MzZAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiQm90In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNKSEcwK3NFRUozLzQ3VUdHQThnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJFQm5lWWliTURqN1BuRVdmTjk0d3pNeWEzQ0t4RUhhLzlUQnFkWGNsWUg0PSIsImFjY291bnRTaWduYXR1cmUiOiJHcTdTNkJKS2traEQrcHNPbFYwdkdSTDBDL1l1aDc4U2ZydFdmOXo0TWp5RS9OSlJQSXcxLytSenpZZnl2TWYvdS9QSCtkTTVKWWFYbEJxSEhSbTRBUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoieVQxaUNiM21Edzl4NndIOUhMVEM0c2gyOVFJbFlMS3YxUXFNYS9RU3AvQkJqTEFUMno5ZVZUd2N5ZVpRd2o4SmlucHNLRmdqcGxQTEt1dk9aOEhSRGc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTg4NjkxMTMyODU6MzZAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCUkFaM21JbXpBNCt6NXhGbnpmZU1Nek1tdHdpc1JCMnYvVXdhblYzSldCKyJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMzQwMDEwNn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "GHOST MODZ",
    OWNER_NUMBER : process.env.OWNER_NUMBER || "258864114607", 
    A_REACT : process.env.AUTO_REACTION || 'on',     
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
CHATBOT: process.env.CHAT_BOT || "on",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    BOT : process.env.BOT_NAME || 'FLASH-MD',
    //OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || '',
    MODE: process.env.BOT_MODE || "public",
    PM_PERMIT: process.env.PM_PERMIT || 'off',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_MESSAGE || "on",
//    ADM : process.env.ANTI_DELETE_MESSAGE || 'off',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd" : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
