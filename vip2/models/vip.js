let db = require('../configDb');


module.exports.listerLettres = function(callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT DISTINCT LEFT(vip_nom, 1) as Lettre FROM vip ORDER BY 1;";
            //console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.VipLettre = function(lettres, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT v.VIP_NUMERO, VIP_NOM , VIP_PRENOM , PHOTO_ADRESSE from vip v join photo p ON v.VIP_NUMERO = p.VIP_NUMERO ";
                sql = sql + "WHERE VIP_NOM LIKE '" + lettres + "%' AND PHOTO_NUMERO = 1;";
            //console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getVipPhoto = function(num, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT PHOTO_ADRESSE from vip v join photo p ON v.VIP_NUMERO = p.VIP_NUMERO WHERE v.VIP_NUMERO ="+num+";";
            //console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getVipDate = function(num, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT VIP_NAISSANCE from vip WHERE VIP_NUMERO = "+num+";";
            //console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getVipNPD = function(num, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT VIP_NOM , VIP_PRENOM, VIP_TEXTE from vip WHERE VIP_NUMERO = "+num+";";
            //console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};
module.exports.getVipNatio = function(num, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT NATIONALITE_NOM FROM nationalite n JOIN vip v ON n.NATIONALITE_NUMERO = v.NATIONALITE_NUMERO WHERE VIP_NUMERO = "+num+";";
            //console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};
module.exports.getVipLiaison = function(num, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            // SELECT l.VIP_NUMERO, v.VIP_NOM, v.VIP_PRENOM , l.DATE_EVENEMENT , l.LIAISON_MOTIFFIN FROM liaison l JOIN vip v ON l.VIP_NUMERO = v.VIP_NUMERO WHERE v.VIP_NUMERO =19 UNION SELECT l2.VIP_NUMERO,v2.VIP_NOM, v2.VIP_PRENOM, l2.DATE_EVENEMENT, l2.LIAISON_MOTIFFIN FROM liaison l2 JOIN vip v2 ON l2.VIP_VIP_NUMERO = v2.VIP_NUMERO WHERE l2.VIP_NUMERO =19
            let sql = "SELECT l.VIP_NUMERO, v.VIP_NOM, v.VIP_PRENOM , v.VIP_TEXTE , p.PHOTO_ADRESSE, l.DATE_EVENEMENT , l.LIAISON_MOTIFFIN FROM liaison l JOIN vip v ON l.VIP_NUMERO = v.VIP_NUMERO JOIN photo p ON v.VIP_NUMERO = p.VIP_NUMERO";
            sql = sql +" WHERE l.VIP_VIP_NUMERO =" +num+" AND p.PHOTO_NUMERO=1";
            sql = sql +" UNION SELECT l.VIP_VIP_NUMERO,v.VIP_NOM, v.VIP_PRENOM, v.VIP_TEXTE,p.PHOTO_ADRESSE, l.DATE_EVENEMENT, l.LIAISON_MOTIFFIN ";
            sql = sql +"FROM liaison l JOIN vip v ON l.VIP_VIP_NUMERO = v.VIP_NUMERO JOIN photo p ON v.VIP_NUMERO = p.VIP_NUMERO WHERE l.VIP_NUMERO =" +num+" AND p.PHOTO_NUMERO=1;";
            //console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};
module.exports.getVipMariage = function(num, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT m.VIP_NUMERO, m.DATE_EVENEMENT, m.MARIAGE_LIEU, m.MARIAGE_FIN, v.VIP_NOM, v.VIP_PRENOM, v.VIP_TEXTE, p.PHOTO_ADRESSE FROM mariage m JOIN vip v ON v.VIP_NUMERO = m.VIP_NUMERO";
            sql = sql + " JOIN photo p ON v.VIP_NUMERO = p.VIP_NUMERO WHERE m.VIP_VIP_NUMERO="+num+" AND p.PHOTO_NUMERO=1";
            sql =sql + " UNION SELECT m.VIP_VIP_NUMERO, m.DATE_EVENEMENT, m.MARIAGE_LIEU, m.MARIAGE_FIN, v.VIP_NOM, v.VIP_PRENOM, v.VIP_TEXTE, p.PHOTO_ADRESSE ";
            sql = sql + "FROM mariage m JOIN vip v ON v.VIP_NUMERO = m.VIP_VIP_NUMERO JOIN photo p ON v.VIP_NUMERO = p.VIP_NUMERO WHERE m.VIP_NUMERO="+ num +" AND p.PHOTO_NUMERO=1;";
            console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getVipAllPhoto = function(num, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT PHOTO_NUMERO, PHOTO_SUJET, PHOTO_COMMENTAIRE, PHOTO_ADRESSE FROM photo WHERE VIP_NUMERO ="+ num +";";
           // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.realisateurVip = function(numStar, callback) {
  db.getConnection(function(err, connexion) {
      if (!err) {
          let sql = "SELECT * FROM realisateur WHERE vip_numero = " + numStar;
            // console.log(sql);
          connexion.query(sql, callback);
          connexion.release();
      }
  });
}

module.exports.acteurVip = function(numStar, callback) {
  db.getConnection(function(err, connexion) {
      if (!err) {
          let sql = "SELECT * FROM acteur WHERE vip_numero = " + numStar;
            // console.log(sql);
          connexion.query(sql, callback);
          connexion.release();
      }
  });
}

module.exports.chanteurVip = function(numStar, callback) {
  db.getConnection(function(err, connexion) {
      if (!err) {
          let sql = "SELECT * FROM chanteur WHERE vip_numero = " + numStar;
            // console.log(sql);
          connexion.query(sql, callback);
          connexion.release();
      }
  });
}

module.exports.mannequinVip = function(numStar, callback) {
  db.getConnection(function(err, connexion) {
      if (!err) {
          let sql = "SELECT * FROM mannequin WHERE vip_numero = " + numStar;
            // console.log(sql);
          connexion.query(sql, callback);
          connexion.release();
      }
  });
}

module.exports.couturierVip = function(numStar, callback) {
  db.getConnection(function(err, connexion) {
      if (!err) {
          let sql = "SELECT * FROM couturier WHERE vip_numero = " + numStar;
            // console.log(sql);
          connexion.query(sql, callback);
          connexion.release();
      }
  });
}

module.exports.joueVip = function(numStar, callback) {
  db.getConnection(function(err, connexion) {
      if (!err) {
        let sql = "SELECT substring(v.VIP_NOM, 1,1) AS letNom, v.VIP_NUMERO, v.VIP_NOM, v.VIP_PRENOM, f.FILM_TITRE, f.FILM_DATEREALISATION, p.PHOTO_ADRESSE,";
        sql = sql + " v.VIP_TEXTE FROM JOUE j JOIN FILM f ON j.FILM_NUMERO = f.FILM_NUMERO LEFT OUTER JOIN REALISATEUR r ON f.VIP_NUMERO = r.VIP_NUMERO";
        sql = sql + " LEFT OUTER JOIN VIP v ON r.VIP_NUMERO = v.VIP_NUMERO JOIN PHOTO p ON v.vip_numero = p.vip_numero";
        sql = sql + " WHERE p.PHOTO_NUMERO = 1 AND j.VIP_NUMERO = " + numStar;
            // console.log(sql);
          connexion.query(sql, callback);
          connexion.release();
      }
  });
}

module.exports.filmsVip = function(numStar, callback) {
  db.getConnection(function(err, connexion) {
      if (!err) {
          let sql = "SELECT * FROM FILM f, REALISATEUR r WHERE r.VIP_NUMERO = f.VIP_NUMERO AND r.VIP_NUMERO = " + numStar;
            // console.log(sql);
          connexion.query(sql, callback);
          connexion.release();
      }
  });
}

module.exports.albumsVip = function(numStar, callback) {
  db.getConnection(function(err, connexion) {
      if (!err) {
          let sql = "SELECT ALBUM_TITRE, ALBUM_DATE, MAISONDISQUE_NOM FROM COMPOSER c, ALBUM a, MAISONDISQUE m"
          sql = sql + " WHERE c.ALBUM_NUMERO = a.ALBUM_NUMERO AND a.MAISONDISQUE_NUMERO = m.MAISONDISQUE_NUMERO AND c.VIP_NUMERO = " + numStar;
            // console.log(sql);
          connexion.query(sql, callback);
          connexion.release();
      }
  });
}

module.exports.defiledansVip = function(numStar, callback) {
  db.getConnection(function(err, connexion) {
    if (!err) {
      let sql = "SELECT substring(v.VIP_NOM, 1,1) AS letNom, v.VIP_NUMERO, v.VIP_NOM, v.VIP_PRENOM, d.DEFILE_LIEU, d.DEFILE_DATE, p.PHOTO_ADRESSE, v.VIP_TEXTE";
      sql = sql + " FROM MANNEQUIN m, DEFILEDANS dd, DEFILE d, COUTURIER c, VIP v, PHOTO p WHERE m.VIP_NUMERO = dd.VIP_NUMERO AND v.vip_numero = p.vip_numero AND";
      sql = sql + " dd.DEFILE_NUMERO = d.DEFILE_NUMERO AND v.VIP_NUMERO = c.VIP_NUMERO AND c.VIP_NUMERO = d.VIP_NUMERO AND  p.PHOTO_NUMERO = 1 AND m.VIP_NUMERO = " + numStar;
      // console.log(sql);
      connexion.query(sql, callback);
      connexion.release();
    }
  });
}

module.exports.defilesVip = function(numStar, callback) {
  db.getConnection(function(err, connexion) {
      if (!err) {
          let sql = "SELECT * FROM DEFILE d, COUTURIER c WHERE c.VIP_NUMERO = d.VIP_NUMERO AND c.VIP_NUMERO = " + numStar;
            // console.log(sql);
          connexion.query(sql, callback);
          connexion.release();
      }
  });
}


////////////////////ARTICLES////////////////////////


module.exports.getVipWithArticle = function(callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT DISTINCT VIP_NOM, VIP_PRENOM, v.VIP_NUMERO FROM vip v JOIN apoursujet a ON v.VIP_NUMERO = a.VIP_NUMERO WHERE ARTICLE_NUMERO IS NOT null;";
            //console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getVipArticles = function(number, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT ARTICLE_RESUME, ARTICLE_DATE_INSERT, v.VIP_NUMERO FROM article a JOIN apoursujet aps ON a.ARTICLE_NUMERO=aps.ARTICLE_NUMERO JOIN vip v ON aps.VIP_NUMERO=v.VIP_NUMERO WHERE v.VIP_NUMERO="+number+";";
            //console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

////////////////////ALBUM////////////////////////

module.exports.afficherToutesPhotosPrincipales = function(callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT v.VIP_NUMERO as numeroVip, VIP_NOM, VIP_PRENOM, PHOTO_ADRESSE, v.VIP_NUMERO as numVip FROM vip v JOIN photo p ON ";
                sql = sql + "v.VIP_NUMERO=p.VIP_NUMERO WHERE PHOTO_NUMERO=1 ORDER BY v.VIP_NOM;";
                          //console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.afficherCommentairesPhotosPrincipales = function(numeroVip,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT PHOTO_COMMENTAIRE, PHOTO_ADRESSE, VIP_NOM, VIP_PRENOM, v.VIP_NUMERO FROM vip v JOIN photo p ON ";
                sql = sql + "v.VIP_NUMERO=p.VIP_NUMERO WHERE v.VIP_NUMERO="+numeroVip+";";
                          console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};
