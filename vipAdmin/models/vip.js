let db = require('../configDb');


module.exports.getAuthentification = function(callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT * FROM parametres;";
            //console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.nationalites = function(callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT * FROM nationalite;";
            //console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};
module.exports.vips = function(callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT * FROM vip;";
            //console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.insertVip = function(vip, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "INSERT INTO vip SET NATIONALITE_NUMERO = "+ vip.NATIONALITE_NUMERO +", VIP_NOM = '"+ vip.VIP_NOM +"', VIP_PRENOM = '"+ vip.VIP_PRENOM ;
            sql = sql + "', VIP_SEXE = '"+ vip.VIP_SEXE +"', VIP_NAISSANCE = '"+ vip.VIP_NAISSANCE +"', VIP_TEXTE = '"+ vip.VIP_TEXTE +"', VIP_DATE_INSERTION = NOW()";
            //console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.insertPhotoVip = function(photoVip, num, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "INSERT INTO photo SET PHOTO_NUMERO = 1, VIP_NUMERO = "+num+", PHOTO_ADRESSE = '"+ photoVip.PHOTO_ADRESSE +"', PHOTO_SUJET = '"+ photoVip.PHOTO_SUJET ;
            sql = sql + "', PHOTO_COMMENTAIRE = '"+ photoVip.PHOTO_COMMENTAIRE +"';";
            //console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.DeleteVip = function(vipNum, callback) {
  db.getConnection(function(err, connexion) {
      if (!err) {
          let sql = "DELETE FROM COMPORTE WHERE VIP_NUMERO = " + vipNum + ";";
          sql = sql + "DELETE FROM PHOTO WHERE VIP_NUMERO = " + vipNum + ";";
          sql = sql + "DELETE FROM DEFILEDANS WHERE VIP_NUMERO = " + vipNum + ";";
          sql = sql + "DELETE FROM APOURAGENCE WHERE VIP_NUMERO = " + vipNum + ";";
          sql = sql + "DELETE FROM MANNEQUIN WHERE VIP_NUMERO = " + vipNum + ";";
          sql = sql + "DELETE FROM DEFILE WHERE VIP_NUMERO = " + vipNum + ";";
          sql = sql + "DELETE FROM COUTURIER WHERE VIP_NUMERO = " + vipNum + ";";
          sql = sql + "DELETE FROM COMPOSER WHERE VIP_NUMERO = " + vipNum + ";";
          sql = sql + "DELETE FROM CHANTEUR WHERE VIP_NUMERO = " + vipNum + ";";
          sql = sql + "DELETE FROM JOUE WHERE VIP_NUMERO = " + vipNum + ";";
          sql = sql + "DELETE FROM FILM WHERE VIP_NUMERO = " + vipNum + ";";
          sql = sql + "DELETE FROM ACTEUR WHERE VIP_NUMERO = " + vipNum + ";";
          sql = sql + "DELETE FROM REALISATEUR WHERE VIP_NUMERO = " + vipNum + ";";
          sql = sql + "DELETE FROM MARIAGE WHERE VIP_NUMERO = " + vipNum + " OR VIP_VIP_NUMERO = " + vipNum + ";";
          sql = sql + "DELETE FROM LIAISON WHERE VIP_NUMERO = " + vipNum + " OR VIP_VIP_NUMERO = " + vipNum + ";";
          sql = sql + "DELETE FROM APOURSUJET WHERE VIP_NUMERO = " + vipNum + ";";
          sql = sql + "DELETE FROM VIP WHERE VIP_NUMERO = " + vipNum + ";";
          // console.log(sql);
          connexion.query(sql, callback);
          connexion.release();
      }
  });
}

module.exports.modifVip = function(vipnum,vip, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "UPDATE vip SET NATIONALITE_NUMERO = "+ vip.NATIONALITE_NUMERO +", VIP_NOM = '"+ vip.VIP_NOM +"', VIP_PRENOM = '"+ vip.VIP_PRENOM ;
            sql = sql + "', VIP_SEXE = '"+ vip.VIP_SEXE +"', VIP_NAISSANCE = '"+ vip.VIP_NAISSANCE +"', VIP_TEXTE = '"+ vip.VIP_TEXTE +"', VIP_DATE_INSERTION = NOW() WHERE VIP_NUMERO="+vipnum+";";
            console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.modifPhotoVip = function(photoVip, vipnum, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "UPDATE photo SET PHOTO_ADRESSE = '"+ photoVip.PHOTO_ADRESSE +"', PHOTO_SUJET = '"+ photoVip.PHOTO_SUJET ;
            sql = sql + "', PHOTO_COMMENTAIRE = '"+ photoVip.PHOTO_COMMENTAIRE +"' WHERE VIP_NUMERO="+vipnum+";";
            console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

////////////////////PHOTOS/////////////////////////

module.exports.photoNumero = function(vipNum, callback) {
  db.getConnection(function(err, connexion) {
      if (!err) {
          let sql = "SELECT MAX(PHOTO_NUMERO) AS photoNum FROM PHOTO WHERE VIP_NUMERO = " + vipNum;
          // console.log(sql);
          connexion.query(sql, callback);
          connexion.release();
      }
  });
}

module.exports.photosVip = function(vipNum, callback) {
  db.getConnection(function(err, connexion) {
    if (!err) {
      let sql = "SELECT * FROM PHOTO WHERE VIP_NUMERO = " + vipNum + " AND PHOTO_NUMERO != 1";
      // console.log(sql);
      connexion.query(sql, callback);
      connexion.release();
    }
  });
}

module.exports.InsererPhoto = function(photoNum, photoVip, callback) {
  db.getConnection(function(err, connexion) {
      if (!err) {
          let sql = "INSERT INTO PHOTO SET PHOTO_NUMERO = " + photoNum + ", VIP_NUMERO = " + photoVip.VIP_NUMERO + ", PHOTO_SUJET = '"+ photoVip.PHOTO_SUJET;
          sql = sql + "', PHOTO_COMMENTAIRE = '" + photoVip.PHOTO_COMMENTAIRE + "', PHOTO_ADRESSE = '" + photoVip.PHOTO_ADRESSE + "'";
          // console.log(sql);
          connexion.query(sql, callback);
          connexion.release();
      }
  });
}

module.exports.DeletePhoto = function(vipNum, photoNum, callback) {
  db.getConnection(function(err, connexion) {
      if (!err) {
            let sql = "DELETE FROM PHOTO WHERE VIP_NUMERO = " + vipNum + " AND PHOTO_NUMERO = " + photoNum;
          // console.log(sql);
          connexion.query(sql, callback);
          connexion.release();
      }
  });
}
