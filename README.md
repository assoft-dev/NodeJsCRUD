npm install --save-dev sequelize-cli

// Inicializacao da estrutura
npx sequelize-cli init

//Criacao dos Modelos
npx sequelize-cli model:generate --name Grupos --attributes Descricao:string,Comentario:string,Detalhes:string
npx sequelize-cli model:generate --name Usuarios --attributes FullName:string,LastName:string,Login:string,Password:string,Email:string,Data:DateTime

//Executar a Migracao
npx sequelize-cli db:migrate


//Desfazer a Migracao
npx sequelize-cli db:migrate:undo

npx sequelize-cli db:migrate:undo:all --to XXXXXXXXXXXXXX-create-posts.js


//SeedMigratios Initializer Data
npx sequelize-cli seed:generate --name demo-user

npx sequelize-cli db:seed:all

include: [{
    models: Loja,
    attributes: ['Descricao']
}]


echo "# NodeJsCRUD" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/assoft-dev/NodeJsCRUD.git
git push -u origin main