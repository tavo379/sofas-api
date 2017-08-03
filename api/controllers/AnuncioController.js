"use strict";
var normalize = require('normalize-path');

module.exports = {

  create: function (req, res) {
    let archivos = req.file('archivos')
    if (!archivos) {
      return res.badRequest({err : 'invalid archivos'});
    }
    let images = [];

    archivos.upload({
      // don't allow the total upload size to exceed ~10MB
      maxBytes: 10000000
    },function whenDone(err, uploadedFiles) {
      if (err) {
        return res.negotiate(err);
      }

      // If no files were uploaded, respond with an error.
      if (uploadedFiles.length === 0){
        return res.badRequest('No file was uploaded');
      }

      let anuncioId = req.params.id;

      //validate anuncioId
      if(!anuncioId){
        return res.badRequest({err : 'invalid post_id'});
      }

      //find single post with category
      let AnuncioUnico = null
      Anuncios.findOne({
        unico : '1'
      }).then(Anuncio => {
        // Actualizar anuncio
        Anuncios.update(Anuncio.id, {
          // Generate a unique URL where the avatar can be downloaded.
          image1 : require('util').format('%s/assets/images/anunciones/%s', sails.config.appUrl, 1),
          image1 : require('util').format('%s/assets/images/anunciones/%s', sails.config.appUrl, 2),
          imageFd1: uploadedFiles[0].fd,
          imageFd2: uploadedFiles[1].fd,
          unico: '1'
        })
        .exec(function (err){
          if (err) return res.negotiate(err);
          return res.ok();
        });
      }).catch(err => {
        // Crear Anuncio
        const an = await Anuncios.create({
          image1 : require('util').format('%s/assets/images/anunciones/%s', sails.config.appUrl, 1),
          image1 : require('util').format('%s/assets/images/anunciones/%s', sails.config.appUrl, 2),
          imageFd1: uploadedFiles[0].fd,
          imageFd2: uploadedFiles[1].fd,
          unico: '1'
        });
        return res.ok();
      });

      // // Save the "fd" and the url where the avatar for a user can be accessed
      // User.update(req.session.me, {

      //   // Generate a unique URL where the avatar can be downloaded.
      //   avatarUrl: require('util').format('%s/user/avatar/%s', sails.config.appUrl, req.session.me),

      //   // Grab the first file and use it's `fd` (file descriptor)
      //   avatarFd: uploadedFiles[0].fd
      // })
      // .exec(function (err){
      //   if (err) return res.negotiate(err);
      //   return res.ok();
      // });
    });


    // var path = require('path')
    // req.file('archivos').upload({ dirname: require('path').resolve(sails.config.appPath, 'assets/images/users') }, function (err, uploadedFiles) {
    //   if (err) return res.negotiate(err);
    //   uploadedFiles.forEach(function(file) {
    //     file.fd = normalize(file.fd);
    //     images.push('/images/users/' + file.fd.split('/').reverse()[0]);
    //   });
    //   makeRequest()
    //   .then(result => res.ok(result))
    //   .catch(err => res.serverError(err));
    // });

      // create async method makeRequest
     const makeRequest = async () =>{
       try {
         const anuncios = await Anuncios.find();
         let anuncioId = false;
         if (anuncios.length > 0) {
          anuncioId = anuncios[0].id;
         }
         if (anuncioId) {
          const an = await Anuncios.update(anuncioId, {
            images: images,
          });
          //return anuncios and category
          return an;
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
