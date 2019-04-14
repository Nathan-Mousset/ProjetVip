let model = require("../models/vip.js");
let async = require('async');
let moment = require('moment');
// ////////////////////// L I S T E R     A L B U M S

module.exports.ListerAlbum =function(request, response){
  response.title = 'Album des stars';
  let numeroVip=request.params.numeroVip;

  async.parallel ([
    function (callback){
      model.afficherToutesPhotosPrincipales(function(err, result){callback(null,result)});
    },
    function(callback){
      model.afficherCommentairesPhotosPrincipales(numeroVip,function(err, result){callback(null,result)});
    }
  ],
    function(err,result){

      if (err) {
        console.log(err);
        return;
      }
      response.ensemblePhotos = result[0];
      response.commentairePhoto = result[1];

      response.render('listerAlbum', response);
    }
  );
}
