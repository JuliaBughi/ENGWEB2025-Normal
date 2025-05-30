1. Alterações ao dataset

O dataset foi alterado da seguinte forma:
- Tornou-se uma lista de objetos -> []
- Os ids "externos" foram removidos
- Os ids "internos" passaram a _id

2. Comandos de importação no mongo

docker start mongoEW
docker cp dataset_teste.json mongoEW:/tmp
docker exec -it mongoEW sh

cd tmp
ls

mongoimport -d eurovisao -c edicoes dataset_teste.json --jsonArray

3. Comandos de execução das Apps

npx express-generator --view=pug ex1
cd ex1
npm i
npm i mongoose
npm start

npx express-generator --view=pug ex2
cd ex2
npm i
npm i axios --save
npm start
