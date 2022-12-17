import postmanToOpenApi from 'postman-to-openapi'
import fs from 'fs';
import readlineSync from 'readline-sync';

let url = readlineSync.question('Qual é a URL da sua API? ', { defaultInput: '' });
let inputFile = readlineSync.questionPath('Qual é o arquivo de entrada? ("./postman.json") ', { defaultInput: './postman.json' });
let outputFile = readlineSync.question('Qual é o arquivo de saída? ("./swagger.json") ', { defaultInput: './swagger.json' });

postmanToOpenApi(inputFile, './original-result.json', { defaultTag: "General", outputFormat: "json" })
  .then((result: string) => {
    // console.log(`OpenAPI specs: ${result}`)
    const resultObject = JSON.parse(result)
    const openapi = resultObject.openapi
    const info = resultObject.info
    const paths = resultObject.paths

    const content = JSON.stringify({ openapi, info, url, paths }, null, 2)

    fs.writeFileSync(outputFile, content);
    console.log('Result saved in ' + outputFile);
  }).catch((err: Error) => {
    console.log(err)
  })