//get entities with attribs in mermaid format.
exports.getEntitiesWithAttribs = (objectMer, listOfEntities) => {

    let atrEntity = "";
    listOfEntities.forEach(entity => {
        const objectKeys = Object.keys(objectMer[entity]);

        let text = "";
        for (let i = 0; i < objectKeys.length; i++) {
            let atr = objectKeys[i];
            let typeOfData = objectMer[entity][objectKeys[i]];
            //console.log(atr, typeOfData); 
            text = text + `${typeOfData} ${atr}` + "\n";
        }
        atrEntity = atrEntity + `${entity}` + " { \n" + `${text}` + "\n}\n";

    });
    atrEntity = atrEntity.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    atrEntity = "erDiagram\n" + atrEntity
    return atrEntity;

}

exports.splitMermaidObject = function (objectToSplit) {
    //Separating entities and relationships
    const listOfkeys = Object.keys(objectToSplit);
    const listOfRels = [];
    const listOfEntities = [];

    listOfkeys.forEach((element) => {
        if (objectToSplit[element]["cardinalidad"]) {
            listOfRels.push(element);
        } else {
            listOfEntities.push(element);
        }
    });
    return { listOfEntities, listOfRels }
}

exports.getRelations = (objectMer, listOfRels) => {
    let relation = "";
    listOfRels.forEach(rel => {

        let cardinality = objectMer[rel]["cardinalidad"];
        const entitiesRel = objectMer[rel]["entidades"];

        if (cardinality == "1:N") {
            cardinality = "||--|{"
        } else if (cardinality == "N:1") {
            cardinality = "}|--||"
        } else if (cardinality == "1:1") {
            cardinality = "||--||"
        } else {
            cardinality = "}|--|{"
        }
        rel_trim = rel.replace(" ", "_")
        rel_trim = rel_trim.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        relation = relation + `${entitiesRel[0]} ${cardinality} ${entitiesRel[1]} : ${rel_trim} \n`;

    });

    return relation;
}