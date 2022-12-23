import {Command} from "commander";
import figlet from "figlet";
import * as fs from "fs/promises";
import { WriteResultDto } from "./dtos/WriteResultDto";

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


//to write result
async function writeResult(data: string, pathDir: string){
     await fs.writeFile(pathDir, data);
  }
async function checkType(type: string, pathFile: string){
      const response = await fs.readFile(pathFile);
      const arraylogs = response.toString("utf8").split(/\r?\n/);
    if(type){
        if(type === 'json'){
            return JSON.stringify(await exportJson(arraylogs));
        }
    }
   return await exportTotext(arraylogs);
}
//action to export to json
async function exportJson(arraylogs: string[]): Promise<WriteResultDto[]> {
      return arraylogs.map((str: string, index: number)=>{
          const partofLog = str.split("-");          
          let resultjson;
          if(partofLog[0] != ''){
              resultjson = {
                date: `${partofLog[0]}-${partofLog[1]}-${partofLog[2]}`.trim(),
                type: partofLog[3].toString().trim(),
                message:  partofLog[4].trim()
              }
            }
            return resultjson;
        }) as WriteResultDto[];
}
//action to report to text
async function exportTotext(arraylogs: string[]): Promise<string>{
  return arraylogs.join('\r\n');
}
    
program.parse();