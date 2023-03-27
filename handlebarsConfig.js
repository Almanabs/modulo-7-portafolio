const exphbs = require('express-handlebars');

const hbs = exphbs.create({
  defaultLayout: 'main',
  layoutsDir: 'views/layouts',
  partialsDir: 'views/partials',
  // Agrega opciones de tiempo de ejecución para permitir el acceso a propiedades de prototipo
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
  helpers: {
    extend: function (name, context) {
      var block = context.data.root.blocks || {};
      if (!block[name]) {
        block[name] = [];
        block[name].toString = function () {
          return block[name].join('\n');
        };
      }

      block[name].push(context.fn(this));
    },

    content: function (name, context) {
      var block = context.blocks && context.blocks[name];
      return block ? block.toString() : '';
    },
  },
});
hbs.handlebars.registerPartial('horizontalCard', '{{img}} {{nombre}} {{descripcion}} {{precio}} {{stock}} {{id}}');
// Registrar los helpers "extend" y "content" directamente en el objeto de handlebars
hbs.handlebars.registerHelper('extend', hbs.helpers.extend);
hbs.handlebars.registerHelper('content', hbs.helpers.content);

module.exports = hbs;



