const crypto = require('crypto'); //usar string para o ID
const connection = require('../database/connection'); //conexão com o banco de dados

module.exports = {
  async index (request, response) {
    const ongs = await connection('ongs').select('*');
    
    return response.json(ongs);
  
  }, 
  
  async create(request, response){
    const { name, email, whatsapp, city, uf } = request.body;

  //criar o ID
  const id = crypto.randomBytes(4).toString('HEX');
  
  //parâmetro para tabela que quero inserir dados
  await connection('ongs').insert({
    id,
    name,
    email,
    whatsapp,
    city,
    uf,
  })
  
  return response.json({ id });
  } 
};