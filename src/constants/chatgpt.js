exports.CHATGPT_CONSTANTS = {
    HEAD_PROMPT: `Identifica las entidades, atributos, y la cardinalidad de las relaciones de un modelo entidad relacion y escribelas de esta forma:{
    "EntidadX": {
      "atributo": "string"
  
    },
    "Relacion": {
      "cardinalidad": "1:N",
      "entidades": ["entidadA", "entidadB"],
      "descripcion": "descripcion en 3 palabras de la relacion"
    }
  }, usando el siguiente texto:`
}