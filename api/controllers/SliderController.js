"use strict";
var normalize = require('normalize-path');

module.exports = {


    create: function (req, res) {

      let titulo = req.param('titulo'),
          subtitulo =req.param('subtitulo'),
          sliderlink = req.param('sliderlink');

      if(!titulo){
       return res.badRequest({err : 'invalid titulo'});
     }
      if(!subtitulo){
       return res.badRequest({err : 'invalid subtitulo'});
     }
     if(!sliderlink){
      return res.badRequest({err : 'invalid sliderlink'});
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

        //create async method makeRequest
       const makeRequest = async () =>{
         try {
           //create new Post
           const slider = await Slider.create({
            titulo, subtitulo, sliderlink,
            images: images,
          });

           //return slider and category
            return { slider };

         } catch (err){
           throw err;
         }
       };
    },

  findAll: function (req, res) {

    Slider.find()
      .then(anuncios => {

        if(!anuncios || anuncios.length ===0){
          throw new Error('No post found');
        }
        return res.ok(anuncios);
      })
      .catch(err => res.notFound(err));

  }
};
