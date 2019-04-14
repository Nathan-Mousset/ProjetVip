let model = require("../models/vip.js");
let async = require("async");


module.exports.vips = function(request, response){
    response.title = "Administration Vips";
    response.render('vips', response);
};

module.exports.ajoutVipTest = function(request, response){
    response.title = "Administration Vips";
    model.nationalites(function(err, result){
         if (err){
              console.log(err);
              return;
         }
         response.nationalites = result;
         //console.log(result);
         response.render('ajouterVips', response);
    });
};

module.exports.ajoutVip = function(request, response){
    response.title = "Administration Vips";

    let nom = request.body.nom;
    let prenom = request.body.prenom;
    let sexe = request.body.sexe;
    let datenaissance = request.body.datenaissance;
    let nationalite = request.body.nationalite;
    let commentaire = request.body.commentaire;
    let photo = request.body.photo;
    let photo_sujet = request.body.photo_sujet;
    let photo_commentaire = request.body.photo_commentaire;

    let vip = {'NATIONALITE_NUMERO' : nationalite, 'VIP_NOM' : nom, 'VIP_PRENOM' : prenom, 'VIP_SEXE' : sexe, 'VIP_NAISSANCE' : datenaissance, 'VIP_TEXTE' : commentaire};
    let photoVip = {'PHOTO_SUJET' : photo_sujet, 'PHOTO_COMMENTAIRE' : photo_commentaire, 'PHOTO_ADRESSE' : photo};

    async.series([
          function(callback){
               model.nationalites(function(err, result) {callback(null, result)});
          },
          function(callback){
               model.insertVip(vip,(function(err, result) {callback(null, result)}));
          },


    ],
          function(err, result){
               if (err){
                    console.log(err);
                    return;
               }

               response.nationalites = result[0];
               //console.log(result[1]);
               model.insertPhotoVip(photoVip, result[1].insertId);



               response.render('ajouterVips', response);
          });
};
/////////////////SUPPRIMER_VIP////////////////////
module.exports.SupprimerVipTest = function(request, response){
    response.title = "Administration vips";
    model.vips(function(err, result){
        if (err) {
            console.log(err);
            return;
        }

       response.vips = result;

       response.render('supprimerVips', response);
     } );
};

module.exports.SupprimerVip = function(request, response){
    response.title = "Administration vips";

    let vipNum = request.body.vip;
     async.series([
         function(callback){
           model.vips(function(err, result) {
             callback(null, result)
           });
         },
         function(callback){
            model.DeleteVip(vipNum, function(err3, result3) {
              callback(null, result3);
            });
         }
     ],
     function(err, result){
          if (err){
               console.log(err);
               return;
          }
          else {
            console.log("Suppression du vip réussi !");
          }

          response.vips = result[0];

          response.render('supprimerVips', response);
     });
};
///////////////////MODIFIER_VIPS////////////////////////////
module.exports.modifVipTest = function(request, response){
    response.title = "Administration Vips";
    async.parallel([
          function(callback){
               model.nationalites(function(err, result) {callback(null, result)});
          },
          function(callback){
               model.vips(function(err, result) {callback(null, result)});
          },



    ],
          function(err, result){
               if (err){
                    console.log(err);
                    return;
               }

               response.nationalites = result[0];
               response.vips = result[1];

         //console.log(result);
         response.render('modifierVips', response);
    });
};

module.exports.modifVip = function(request, response){
    response.title = "Administration Vips";
    let vipnum = request.body.vip;
    let nom = request.body.nom;
    let prenom = request.body.prenom;
    let sexe = request.body.sexe;
    let datenaissance = request.body.datenaissance;
    let nationalite = request.body.nationalite;
    let commentaire = request.body.commentaire;
    let photo = request.body.photo;
    let photo_sujet = request.body.photo_sujet;
    let photo_commentaire = request.body.photo_commentaire;

    let vip = {'NATIONALITE_NUMERO' : nationalite, 'VIP_NOM' : nom, 'VIP_PRENOM' : prenom, 'VIP_SEXE' : sexe, 'VIP_NAISSANCE' : datenaissance, 'VIP_TEXTE' : commentaire};
    let photoVip = {'PHOTO_SUJET' : photo_sujet, 'PHOTO_COMMENTAIRE' : photo_commentaire, 'PHOTO_ADRESSE' : photo};

    async.series([
          function(callback){
               model.nationalites(function(err, result) {callback(null, result)});
          },
          function(callback){
               model.vips(function(err, result) {callback(null, result)});
          },
          function(callback){
               model.modifVip(vipnum,vip,(function(err, result) {callback(null, result)}));
          },


    ],
          function(err, result){
               if (err){
                    console.log(err);
                    return;
               }

               response.nationalites = result[0];
               response.vips = result[1];
               //console.log(result[1]);
               model.modifPhotoVip(photoVip, vipnum);



               response.render('modifierVips', response);
          });
};
