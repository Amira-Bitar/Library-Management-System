module.exports = function (plop) {
  plop.setGenerator("resource", {
    description: "Generate model, controller, and route",

    prompts: [
      {
        type: "input",
        name: "name",
        message: "Resource name?",
      },
    ],

    actions: [
      // MODEL
      {
        type: "add",
        path: "src/models/{{pascalCase name}}.js",
        templateFile: "plop-templates/model.hbs",
      },

      // CONTROLLER
      {
        type: "add",
        path: "src/controllers/{{camelCase name}}Controller.js",
        templateFile: "plop-templates/controller.hbs",
      },

      // ROUTE
      {
        type: "add",
        path: "src/routes/{{camelCase name}}Routes.js",
        templateFile: "plop-templates/route.hbs",
      },
    ],
  });
};