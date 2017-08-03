"use strict";
var normalize = require('normalize-path');

module.exports = {

  create: function (req, res) {
    let image1 = req.file('image1')
    if (!image1) {
      return res.badRequest({err : 'invalid image1'});
    }
    let image2 = req.file('image2')
    if (!image2) {
      return res.badRequest({err : 'invalid image2'});
    }
    let archivos = req.file('archivos')
    if (!archivos) {
      return res.badRequest({err : 'invalid archivos'});
    }
    let images = [];
    var path = require('path')
    req.file('archivos').upload({ dirname: require('path').resolve(sails.config.appPath, 'assets/images/users') }, function (err, uploadedFiles) {
      if (err) return res.negotiate(err);
      uploadedFiles.forEach(function(file) {
        file.fd = normalize(file.fd);
        images.push('/images/users/' + file.fd.split('/').reverse()[0]);
      });
      makeRequest()
      .then(result => res.ok(result))
      .catch(err => res.serverError(err));
    });

      // create async method makeRequest
     const makeRequest = async () =>{
       try {
         const anuncios = await Anuncios.find();
         let anuncioId = false;
         if (anuncios.length > 0) {
          anuncioId = anuncios[0].id;
         }
         if (anuncioId) {
          let imgs = []
          if (image1 === 'Y' && image2 === 'Y') {
            imgs = images
          } else if (image1 === 'Y') {
            imgs[0] = images[0]
            imgs[1] = anuncios[0].images[1]
          } else if (image2 === 'Y') {
            imgs[1] = images[0]
            imgs[0] = anuncios[0].images[1]
          }
          const an = await Anuncios.update(anuncioId, {
            images: imgs,
          });
          //return anuncios and category
          return an;
         }
        
        let imgs = []
        if (image1 === 'Y' && image2 === 'Y') {
          imgs = images
        } else if (image1 === 'Y') {
          imgs[0] = images[0]
          imgs[1] = ''
        } else if (image2 === 'Y') {
          imgs[1] = images[0]
          imgs[0] = ''
        }
        const an = await Anuncios.create({
          images: images,

        });
        //return anuncios and category
        return an;
       } catch (err){
         throw err;
       }
     };
  },

  findAll: function (req, res) {

    Anuncios.find()
      .then(anuncios => {

        if(!anuncios || anuncios.length ===0){
          throw new Error('No post found');
        }
        return res.ok(anuncios);
      })
      .catch(err => res.notFound(err));

  },

  findOne: function (req, res) {

    //extract auncioId
    let anuncioId = req.params.id;

    //validate anuncioId
    if(!anuncioId){
      return res.badRequest({err : 'invalid post_id'});
    }

    //find single post with category
    Anuncios.findOne({
      id : anuncioId
    })

      .then(anuncio => {
        res.ok(anuncio);
      })
      .catch(err => res.notFound(err));

  },

  update: function (req, res) {

    //Extract PostId
    let auncioId = req.params.id;

    let post = {};

    //extract title
    let nombre= req.param('title'),
       descripcion = req.param('descripcion'),
       medidas = req.param('medidas'),
       color = req.param('color'),
       userId = req.param('user_id'),
       categoryId = req.param('category_id');

    //add title to Post object
    if(title){
      post.title = title;
    }
    //add title to Post object
    if(title){
      post.title = title;
    }
    //add title to Post object
    if(title){
      post.title = title;
    }
    //add content to Post Object
    if(content){
      post.content = content;
    }
    if(userId){
      post._user = userId;
    }
    if(categoryId){
      post._category = categoryId;
    }

    //Update the Post by id

     Anuncios.update({id : anuncioId},post)
       .then(post => {

         return res.ok(post[0]);
       })
       .catch(err => res.serverError(err));

  },


};
