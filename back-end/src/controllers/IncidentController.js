const connection = require('../database/connection'); //conexão com o banco de dados

module.exports = {
  
async index (request, response){

  //buscar 
  const{ page = 1 }=request.query;

  //query para o total de casos, contagem de casos 
  const [count] = await connection('incidents')
  .count();

  console.log(count);
  response.header('X-Total-Count', count['count(*)'])
  
  //Listar
  const incidents = await connection('incidents')
  .join('ongs', 'ongs.id', '=', 'incidents.ongs_id')  //relacionar dados de 2 tables
  .limit(5)                 //paginação 5 por page
  .offset((page - 1)* 5)    //paginação 5 por page
  .select(['incidents.*',
           'ongs.name',
           'ongs.email',
           'ongs.whatsapp',
           'ongs.city',
            'ongs.uf' 
          ]);
  return response.json(incidents);

},
  //Criar
async create (request, response){

  const { title, description, value } = request.body;

  //"Authorization" because Insomnia, this is the name in header
  const ongs_id = request.headers.authorization;

  const [id]= await connection('incidents').insert({
    title,
    description,
    value,
    ongs_id,
  });
  return response.json({ id });
  },
  //Deletar

  async delete( request, response){
    //deletar
    const { id } = request.params;
    
    //confirmar se a ong que está deletando
    const ongs_id = request.headers.authorization;

    //buscar o incidents dentro do db
    const incidents = await connection('incidents')
    .where('id', id)
    .select('ongs_id')
    .first(); //retorna apenas um resultado

    //verificação da ong logada
    if(incidents.ongs_id !== ongs_id){
      return response.status(401).json({ error: 'Operation not permitted.'});
    }
    await connection('incidents').where('id', id).delete();


    //status 204: resposta com sucess mas sem conteúdo
    return response.status(204).send();

  }
};