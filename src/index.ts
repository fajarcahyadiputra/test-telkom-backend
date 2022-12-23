import {Command} from "commander";
import figlet from "figlet";
import {checkType, exportJson, exportTotext, writeResult} from "./utils/common-cli";

const program = new Command();

console.log(figlet.textSync("Fajar Cahyadi Putra"));


program
  .name('Logs CLI')
  .description('CLI to get logs and convert to text or json file')
  .version('1.0.0');

program.command('todo')
  .description('CLI to get logs and convert to text or json file \n for example use file logs error-logs.log \n typing ./error-logs.log on argument flag')
  .argument('<string>', 'Directory path of file logs')
  .option('-t, --type <string>', 'type of file json or text')
  .option('-o, --dir <string>', 'Path Directory For Strorage')
  .action(async(str, options) => {
    if(options.dir){
        const resultLogs = await checkType(options.type, str);
        await writeResult(resultLogs, options.dir)
    }else{
        const resultLogs = await checkType(options.type, str);        
        await writeResult(resultLogs,`logs-export.${options.type}`)
    }
  });



    
program.parse();