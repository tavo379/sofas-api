/**
 * AnuncioController
 *
 * @description :: Server-side logic for managing Anuncios
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
"use strict";
module.exports = {
  create: function (req, res) {
    let anuncio1 = req.param('anuncio1'),
        anuncio2 = req.param('anuncio2');
    if(!anuncio1){
     return res.badRequest({err : 'invalid anuncio1'});
    }
    if(!anuncio2){
     return res.badRequest({err : 'invalid anuncio2'});
    }

    let imgUrl = ''
    var path = require('path')
    req.file('url1').upload({
      dirname: require('path').resolve(sails.config.appPath, 'assets/images')
    },
    function (err, uploadedFiles) {
      if (err) return res.negotiate(err);
        let imgPath= path.basename(uploadedFiles[0].fd);
        imgUrl='assets/images/'+ imgPath
        console.log(uploadedFiles);
        makeRequest()
          .then(result => res.ok(result))
          .catch(err => res.serverError(err));
    });

    let imgUrl2 = ''
    var path = require('path')
    req.file('url2').upload({
      dirname: require('path').resolve(sails.config.appPath, 'assets/images')
    },
    function (err, uploadedFiles) {
      if (err) return res.negotiate(err);
        let imgPath= path.basename(uploadedFiles[0].fd);
        imgUrl2='assets/images/'+ imgPath
        console.log(uploadedFiles);
        makeRequest()
          .then(result => res.ok(result))
          .catch(err => res.serverError(err));
    });

    const makeRequest = async () =>{
      try {
        const anuncio = await Anuncio.create({
          anuncio1: imgUrl,
          anuncio2: imgUrl2
        });
        return {anuncio};
      } catch (err){
          throw err;
        }
    };
  },


  findOne: function (req, res) {
    let anunciosId = req.params.id;
    if(!anunciosId){
      return res.badRequest({err : 'invalid slider_id'});
    }
    Slider.findOne({
      id : anunciosId
    })
      .then(slider => {
        res.ok(slider);
      })
      .catch(err => res.notFound(err));
  },


  /**
   * `SliderController.findAll()`
   */
  findAll: function (req, res) {

    Slider.find()
      .then(sliders => {

        if(!sliders || sliders.length ===0){
          throw new Error('No slider found');
        }
        return res.ok(sliders);
      })
      .catch(err => res.notFound(err));

  },


  /**
   * `SliderController.update()`
   */
  update: function (req, res) {

    //Extract SliderId
    let anunciosId = req.params.id;

    let slider = {};

    //extract title
    let titulo= req.param('title'),
       subtitulo = req.param('subtitulo'),
       sliderlink = req.param('sliderlink');

    //add title to Slider object
    if(title){
      slider.title = title;
    }
    //add title to Slider object
    if(title){
      slider.title = title;
    }
    //add title to Slider object
    if(title){
      slider.title = title;
    }
    //add content to Slider Object
    if(content){
      slider.content = content;
    }
    if(userId){
      slider._user = userId;
    }
    if(categoryId){
      slider._category = categoryId;
    }

    //Update the Slider by id

     Slider.update({id : anunciosId},slider)
       .then(slider => {

         return res.ok(slider[0]);
       })
       .catch(err => res.serverError(err));

  },


  /**
   * `SliderController.delete()`
   */
  delete: function (req, res) {

    //extract anunciosId
    let anunciosId = req.params.id;

    //validate anunciosId
    if(!anunciosId){
      return res.badRequest({err : 'invalid slider_id'});
    }


    //delete the Slider
    Slider.destroy({
      id : anunciosId
    })
      .then(slider => {

        res.ok(`Slider has been deleted with ID ${anunciosId}`);

      })
      .catch(err => res.serverError(err));

  }
};
