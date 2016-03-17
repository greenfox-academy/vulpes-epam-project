'use strict';

function createTemplateController(queries) {
  var schema = require('./schemas.js')();

  function getAllTemplates(req, res) {
    queries.getTemplates(function (err, result) {
      handleResponse(err, schema.allTemplatesSchema(result), res);
    });
  }

  function postTemplate(req, res) {
    var errorMessage = false;
    queries.postTemplate(req.body, function (err, result, response) {
      if (err) {
        dbErrorResponse(response);
      } else {
        req.body.schema.forEach(function (elem) {
          queries.postTemplateSetup(elem, req.body.title, function (err) {
            if (err)
              errorMessage = true;
          });
        });

        handleResponse(errorMessage, 'Post ok', res);
      }
    });
  }

  function deleteTemplate(req, res) {
    queries.deleteTemplate(req.params.id, function (err, result, response) {
      if (err) {
        dbErrorResponse(response);
      } else {
        queries.deleteTemplateSetup(req.params.id, function (err) {
          handleResponse(err, 'Delete ok', res);
        });
      }
    });
  }

  function getTemplateQuestions(req, res) {
    queries.getTemplateSetup(req.params.id, function (err, result) {
      if (err) {
        dbErrorResponse(res);
      } else {
        var generatedQuestions = generateQuestions(result.rows);
        Promise.all(generatedQuestions)
        .then(schema.questionsSchema)
        .then((questions) => {
          res.status(200).json(questions);
        });
      }
    });
  }

  function generateQuestions(types) {
    var questions = [];
    types.forEach((questionTypes) => {
      questions.push(
        new Promise((resolve) => {
          queries.getQuestions(questionTypes.type, questionTypes.count,
            (err, qResult) => {
              if (err) throw err;
              resolve(qResult.rows);
            });
        }));
    });
    return questions;
  }

  function handleResponse(err, result, response) {
    if (err) {
      dbErrorResponse(response);
    } else {
      response.status(200).json(result);
    }
  }

  function dbErrorResponse(response) {
    response.status(503).json({
      errorMessage: 'Database error. Please try again later.',
    });
  }

  return {
    getAllTemplates: getAllTemplates,
    postTemplate: postTemplate,
    getTemplateQuestions: getTemplateQuestions,
    deleteTemplate: deleteTemplate,
  };
}

module.exports = createTemplateController;
