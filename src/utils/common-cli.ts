import * as fs from "fs/promises";
import { WriteResultDto } from "../dtos/WriteResultDto";

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

export {exportJson, exportTotext, checkType, writeResult}