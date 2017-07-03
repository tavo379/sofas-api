/**
 * Post.js
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    nombre: {type: 'string'},

    descripcion: {type: 'text'},

    medidas: { type: 'string'},

    color: { type:'string'},

    url: { type: 'string'},

    _user : {
      model : 'user',
      columnName: 'user_id',
      required:true
    },
    _category :{
      model :'category',
      required: true,
      columnName:'category_id'
    }

  }
};
