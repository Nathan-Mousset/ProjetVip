

  // ////////////////////////////////////////////// A C C U E I L
module.exports.Index = function(request, response){
    response.title = "Administration";
    response.render('home', response);
};


module.exports.NotFound = function(request, response){
    response.title = "Bienvenue sur le site de SIXVOIX (IUT du Limousin).";
    response.render('notFound', response);
};

module.exports.Connexion = function(request, response){
     let login =request.body.login;
     let passwd =request.body.passwd;
     response.title = 'Connexion';
     let crypt =
     async.parallel([
          function(callback){
               model.getAuthentification(function(err, result) {callback(null, result)});
          },
          function(callback){
               model.VipLettre(lettres, (function(err2, result2) {callback(null, result2)}));
          }
     ],
     function(err, result){
          if (err){
               console.log(err);
               return;
          }

          response.lettres = result[0];
          response.vipL = result[1];
          response.render('repertoireVipsLettre', response);
     });
}
