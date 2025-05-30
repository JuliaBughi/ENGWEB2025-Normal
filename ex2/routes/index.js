var express = require('express');
var axios = require('axios');
var router = express.Router();

router.get('/', function(req, res, next) {
  axios.get('http://localhost:25000/edicoes') // supõe que esta API retorna lista completa de edicoes
    .then(resp => {
      res.status(200).render('index', { edicoes: resp.data });
    })
    .catch(erro => {
      res.status(500).render('error', { error: erro });
    });
});

router.get('/:id', function(req, res, next) {
   axios.get(`http://localhost:25000/edicoes/${req.params.id}`)
    .then(resp => {
      res.status(200).render('edicao', { edicao: resp.data });
    })
    .catch(erro => {
      res.status(500).render('error', { error: erro });
    });
});


router.get('/paises/:pais', function(req, res, next) {
  const pais = req.params.pais;
  axios.get(`http://localhost:25000/paises/${pais}`)
    .then(resp => {
      
      participacoes = resp.data;

      axios.get(`http://localhost:25000/paises/organizado/${pais}`)
        .then(resp => {
          organizado = resp.data;
          res.status(200).render('pais', { pais: pais, participacoes: participacoes, organizado: organizado });
        })
        .catch(erro => {
          res.status(500).render('error', { error: erro });
        });
    })
    .catch(erro => {
      res.status(500).render('error', { error: erro });
    });

});

module.exports = router;
