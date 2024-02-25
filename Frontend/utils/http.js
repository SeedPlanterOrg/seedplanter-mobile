async function getPlantCatalogEntries() {
    
    try {
        await fetch(`http://localhost:3000/plantCatalog`, {
            method:'GET'
        })
        .then(res => res.json())
        .then(plants => {
            const plantsArray = Object.values(plants);
            console.log(plants);
            console.log("TEST ARRAY");
            console.log(plantsArray[0][0]);
        })
        .catch(error => {
            throw new Error("Failed to fetch plant details: " + error);
        });
    } 
    catch (error){
        console.log("Failed to retrieve plantCatalog: " + error);
    }
}
getPlantCatalogEntries();