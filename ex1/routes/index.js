var express = require('express');
var router = express.Router();
var Edicao = require('../controllers/edicao');

/* GET home page. */
router.get('/edicoes', function(req, res, next) {
  if(req.query.org){
    Edicao.getEdicaoByOrg(req.query.org)
      .then(data => res.status(200).jsonp(data))
      .catch(error => res.status(500).jsonp(error))
  }
  else{
    Edicao.getEdicoes()
      .then(data => res.status(200).jsonp(data))
      .catch(error => res.status(500).jsonp(error))
  }
});

router.get('/paises', function(req, res, next) {
  const papel = req.query.papel;
    
    Edicao.getPaisesPorPapel(papel)
        .then(result => res.json(result))
        .catch(err => res.status(400).json({ error: err.message }));
});

router.get('/paises/organizado/:pais', function(req, res, next) {
  const pais = req.params.pais;
  
  Edicao.getOrganizadasPorPais(pais)
    .then(data => res.status(200).jsonp(data))
    .catch(error => res.status(500).jsonp(error))
});

router.get('/paises/:pais', function(req, res, next) {
  const pais = req.params.pais;
  
  Edicao.getParticipacoesPorPais(pais)
    .then(data => res.status(200).jsonp(data))
    .catch(error => res.status(500).jsonp(error))
});  

router.get('/interpretes', function(req, res, next) {
  Edicao.getInterpretes()
    .then(data => res.status(200).jsonp(data))
    .catch(error => res.status(500).jsonp(error))
});

router.get('/edicoes/:id', function(req, res, next) {
  const edicaoId = req.params.id;
  
  Edicao.getEdicaoById(edicaoId)
    .then(data => res.status(200).jsonp(data))
    .catch(error => res.status(500).jsonp(error))
});

//post
router.post('/edicoes', function(req, res, next) {
  const edicaoData = req.body;
  
  Edicao.addEdicao(edicaoData)
    .then(data => res.status(201).jsonp(data))
    .catch(error => res.status(500).jsonp(error));
});

router.put('/edicoes/:id', function(req, res, next) {
  const edicaoId = req.params.id;
  const updatedData = req.body;
  
  Edicao.updateEdicao(edicaoId, updatedData)
    .then(data => res.status(200).jsonp(data))
    .catch(error => res.status(500).jsonp(error));
});

//delete
router.delete('/edicoes/:id', function(req, res, next) {
  const edicaoId = req.params.id;
  
  Edicao.deleteEdicao(edicaoId)
    .then(data => res.status(200).jsonp({ message: `Register with ID ${edicaoId} deleted successfully!` }))
    .catch(error => res.status(500).jsonp(error));
});

module.exports = router;