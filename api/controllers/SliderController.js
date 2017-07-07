/**
 * SliderController
 *
 * @description :: Server-side logic for managing Sliders
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
"use strict";
module.exports = {



  /**
   * `SliderController.create()`
   */


  create: function (req, res) {

    let titulo = req.param('titulo'),
        subtitulo =req.param('subtitulo'),
        sliderlink= req.param('sliderlink'),
        url = req.param('url');


        if(!titulo){
         return res.badRequest({err : 'invalid titulo'});
        }
        if(!subtitulo){
         return res.badRequest({err : 'invalid subtitulo'});
        }
       if(!sliderlink){
        return res.badRequest({err : 'invalid sliderlink'});
        }

      // if(!url){
      //   return res.badRequest({err : 'invalid url'});
      //  }


       let imgUrl = ''
       var path = require('path')

       req.file('url').upload({
              dirname: require('path').resolve(sails.config.appPath, 'assets/images')
            },function (err, uploadedFiles) {
              if (err) return res.negotiate(err);
              let imgPath= path.basename(uploadedFiles[0].fd);
              imgUrl='assets/images/'+ imgPath
              console.log(uploadedFiles);
               makeRequest()
                .then(result => res.ok(result))
                .catch(err => res.serverError(err));
            });

       //create async method makeRequest
       const makeRequest = async () =>{

         try {
           //create new Slider slider
           const slider = await Slider.create({
            titulo,subtitulo,sliderlink,
            url: imgUrl,
          });

           //return slider
            return {slider};

         }catch (err){
           throw err;
         }
       };


    //call the makeRequest method


  },


  findOne: function (req, res) {

    //extract sliderId
    let sliderId = req.params.id;

    //validate sliderId
    if(!sliderId){
      return res.badRequest({err : 'invalid slider_id'});
    }

    //find single slider
    Slider.findOne({
      id : sliderId
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
    let sliderId = req.params.id;

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

     Slider.update({id : sliderId},slider)
       .then(slider => {

         return res.ok(slider[0]);
       })
       .catch(err => res.serverError(err));

  },


  /**
   * `SliderController.delete()`
   */
  delete: function (req, res) {

    //extract sliderId
    let sliderId = req.params.id;

    //validate sliderId
    if(!sliderId){
      return res.badRequest({err : 'invalid slider_id'});
    }


    //delete the Slider
    Slider.destroy({
      id : sliderId
    })
      .then(slider => {

        res.ok(`Slider has been deleted with ID ${sliderId}`);

      })
      .catch(err => res.serverError(err));

  }
};
