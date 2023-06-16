// let textjson = `{
//   "Empleado": {
//     "RUT": "string",
//     "salario": "number",
//     "telefono": "string"
//   },
//   "Departamento": {
//     "DNO": "string",
//     "nombre": "string",
//     "presupuesto": "number"
//   },
//   "Hijo": {
//     "nombre": "string",
//     "edad": "number"
//   },
//   "Trabaja_en": {
//     "cardinalidad": "N:1",
//     "entidades": ["Empleado", "Departamento"],
//     "descripcion": "un empleado trabaja en un departamento"
//   },
//   "Maneja": {
//     "cardinalidad": "1:1",
//     "entidades": ["Empleado", "Departamento"],
//     "descripcion": "un departamento es manejado por un empleado"
//   },
//   "Identificado_por": {
//     "cardinalidad": "1:N",
//     "entidades": ["Empleado", "Hijo"],
//     "descripcion": "un empleado puede tener varios hijos identificados por su nombre"
//   }
// }`;

// let objectMer = JSON.parse(textjson);

// const listOfkeys = Object.keys(objectMer);
// const listOfRels = [];
// const listOfEntities = [];

// listOfkeys.forEach((element) => {
//   if (objectMer[element]["cardinalidad"]) {
//     listOfRels.push(element);
//   } else {
//     listOfEntities.push(element);
//   }
// });

// console.log(objectMer);
// // console.log(listOfRels);
// // console.log(listOfEntities);
// console.log(getEntitiesWithAttribs(listOfEntities));
// console.log(getRelations(listOfRels));












//get entities with attribs in mermaid format.
function getEntitiesWithAttribs(objectMer,listOfEntities){
  
let atrEntity = "";
listOfEntities.forEach(entity => {
   const objectKeys= Object.keys(objectMer[entity]);

let text = "";
for (let i = 0; i < objectKeys.length; i++) {
    let atr = objectKeys[i];
    let typeOfData = objectMer[entity][objectKeys[i]];
    //console.log(atr, typeOfData); 
     text = text + `${typeOfData} ${atr}`+ "\n";
}
 atrEntity = atrEntity + `${entity}` + " { \n" + `${text}` + "\n}\n" ;

});
atrEntity = atrEntity.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
atrEntity = "erDiagram\n"+atrEntity 
return atrEntity;

}




// console.log("****************************************");


function getRelations(objectMer,listOfRels){
let relation = "";
listOfRels.forEach(rel => {
   
   let cardinality  = objectMer[rel]["cardinalidad"];
   const entitiesRel = objectMer[rel]["entidades"];

  if(cardinality == "1:N"){
    cardinality = "||--|{"
  }else if(cardinality == "N:1"){
    cardinality = "}|--||"
  }else if(cardinality == "1:1"){
    cardinality = "||--||"
  }else{
    cardinality = "}|--|{"
  }
rel_trim = rel.replace(" ","_")
rel_trim = rel_trim.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
relation = relation + `${entitiesRel[0]} ${cardinality} ${entitiesRel[1]} : ${rel_trim} \n`;

});

return relation;
}


exports.getEntitiesWithAttribs = getEntitiesWithAttribs
exports.getRelations = getRelations