var Handlebars = require("handlebars");
var template = Handlebars.compile("Name: {{name}}");
console.log(template({ name: "Nils" }));
