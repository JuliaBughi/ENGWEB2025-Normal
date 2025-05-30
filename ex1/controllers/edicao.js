var Edicao = require('../models/edicao')

module.exports.getEdicoes = () => {
    return Edicao.find().exec()
}

module.exports.getEdicaoById = id => {
    return Edicao.findOne({_id: id}).exec()
}

module.exports.getEdicaoByOrg = org => {
    return Edicao.find(
        { organizacao: org },
        { anoEdição: 1, organizacao: 1, vencedor: 1, _id: 0 }
    ).exec();
};

module.exports.getPaisesPorPapel = papel => {
    if (papel === "org") {
        return Edicao.aggregate([
            {
                $group: {
                    _id: "$organizacao",
                    anos: { $addToSet: "$anoEdição" }
                }
            },
            { $sort: { _id: 1 } },
            {
                $project: {
                    pais: "$_id",
                    anos: 1,
                    _id: 0
                }
            }
        ]).exec();
    }

    else if (papel === "venc") {
        return Edicao.aggregate([
            { $match: { vencedor: { $exists: true } } },
            {
                $group: {
                    _id: "$vencedor",
                    anos: { $addToSet: "$anoEdição" }
                }
            },
            { $sort: { _id: 1 } },
            {
                $project: {
                    pais: "$_id",
                    anos: 1,
                    _id: 0
                }
            }
        ]).exec();
    }

    else {
        // Se valor inválido for passado, retorna uma Promise rejeitada
        return Promise.reject(new Error("Valor inválido para 'papel'. Use 'org' ou 'venc'."));
    }
};

module.exports.getInterpretes = () => {
    return Edicao.aggregate([
        { $unwind: "$musicas" },
        {
            $group: {
                _id: {
                    nome: "$musicas.intérprete",
                    pais: "$musicas.país"
                }
            }
        },
        {
            $project: {
                nome: "$_id.nome",
                pais: "$_id.pais",
                _id: 0
            }
        },
        { $sort: { nome: 1 } }
    ]).exec();
};

module.exports.addEdicao = edicao => {
    var newEdicao = new Edicao(edicao);
    return newEdicao.save();
};

module.exports.deleteEdicao = id => {
    return Edicao.findByIdAndDelete(id).exec()
};

module.exports.updateEdicao = (id, edicaoAtualizada) => {
     return Edicao.findByIdAndUpdate(id, edicaoAtualizada, {new: true}).exec()
}

module.exports.getParticipacoesPorPais = (pais) => {
  return Edicao.find(
    { "musicas.país": pais }, // filtro por país nas músicas
    { _id: 1, anoEdição: 1, vencedor: 1, musicas: 1 } // campos que queremos
  )
  .then(edicoes => {
    // Mapear edições para formato desejado
    return edicoes.map(edicao => {
      // filtrar músicas só do país pedido
      const musicasDoPais = edicao.musicas.filter(m => m.país === pais);

      // Para cada música, criar um objeto com título, intérprete, etc
      return musicasDoPais.map(musica => ({
        id: edicao._id,
        ano: edicao.anoEdição,
        título: musica.título,
        intérprete: musica.intérprete,
        venceu: edicao.vencedor === pais
      }));
    }).flat(); // "achatar" arrays aninhados em uma lista só
  });
};

module.exports.getOrganizadasPorPais = (pais) => {
  return Edicao.find(
    { organizacao: pais },  // filtro por país organizador
    { _id: 1, anoEdição: 1 } // só id e ano
  );
};