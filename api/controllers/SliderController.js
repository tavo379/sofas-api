"use strict";
var normalize = require('normalize-path');

module.exports = {


    create: function (req, res) {
<<<<<<< HEAD

      let titulo1 = req.param('titulo1'),
          sliderlink1 = req.param('sliderlink1'),
=======
      res.setTimeout(0);
      let titulo1 = req.param('titulo'),
          sliderlink1 = req.param('sliderlink'),
>>>>>>> 66f791d23f8e39e66c2a1754d69dcb6d55bd67cb
          titulo2 = req.param('titulo2'),
          sliderlink2 = req.param('sliderlink2'),
          titulo3 = req.param('titulo3'),
          sliderlink3 = req.param('sliderlink3'),
          titulo4 = req.param('titulo4'),
          sliderlink4 = req.param('sliderlink4'),
          titulo5 = req.param('titulo5'),
          sliderlink5 = req.param('sliderlink5'),
          archivosIndex = req.param('archivosIndex');

     let images = [];
     var path = require('path')
     req.file('archivos').upload({ dirname: require('path').resolve(sails.config.appPath, 'assets/images/users') }, function (err, uploadedFiles) {
        if (err) return res.negotiate(err);
        let imgs = [];
        res.setTimeout(0);
        uploadedFiles.forEach(function(file) {
          file.fd = normalize(file.fd);
          imgs.push('/images/users/' + file.fd.split('/').reverse()[0]);
        });
        let index = 0
        for (var i = 0; i < archivosIndex.length; i++) {
          var imgIndex = archivosIndex[i];
          if (imgIndex === 'Y') {
            images.push(imgs[index])
            index+=1
          } else {
            images.push('')
          }
        }
        makeRequest()
         .then(result => res.ok(result))
         .catch(err => res.serverError(err));
      });

        //create async method makeRequest
       const makeRequest = async () =>{
         try {
            const sliders = await Slider.find();
            let news = true;
            if (sliders.length > 0) {
              news = false
            }

            if (news) {
              //create new Post
              const slider1 = await Slider.create({
                titulo1, sliderlink1,
                images: [images[0]],
              });
              const slider2 = await Slider.create({
                titulo2, sliderlink2,
                images: [images[1]],
              });
              const slider3 = await Slider.create({
                titulo3, sliderlink3,
                images: [images[2]],
              });
              const slider4 = await Slider.create({
                titulo4, sliderlink4,
                images: [images[3]],
              });
              const slider5 = await Slider.create({
                titulo4, sliderlink5,
                images: [images[4]],
              });
              return slider1;
            } else {
              const an1 = await Slider.update(sliders[0].id, {
                titulo1, sliderlink1,
                images: [images[0] === '' ? sliders[0].images[0]: images[0]],
              });
              const an2 = await Slider.update(sliders[1].id, {
                titulo2, sliderlink2,
                images: [images[1] === '' ? sliders[1].images[0]: images[1]],
              });
              const an3 = await Slider.update(sliders[2].id, {
                titulo3, sliderlink3,
                images: [images[2] === '' ? sliders[2].images[0]: images[2]],
              });
              const an4 = await Slider.update(sliders[3].id, {
                titulo4, sliderlink4,
                images: [images[3] === '' ? sliders[3].images[0]: images[3]],
              });
              /* const an5 = await Slider.update(sliders[4].id, {
                titulo5, sliderlink5,
                images: [images[4] === '' ? sliders[4].images[0]: images[4]],
              }); */
              return an1;
            }


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
