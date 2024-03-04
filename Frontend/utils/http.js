async function getPlantCatalogPages(page) {
    
    try {
        await fetch(`http://localhost:3000/plantCatalog/?page=${page}`, {
            method:'GET'
        })
        .then(res => res.json())
        .then(async plants => {
            let plantsArray = Object.values(plants);
            console.log(plants);
            console.log("TEST ARRAY");
            console.log(plantsArray[0]);
            if(!plantsArray[0].length) {
                console.log("patch");
                await fetch(`http://localhost:3000/plantCatalog/?page=${page}`, {
                    method:'PATCH'
                })
                .then(res => res.json())
                .then(plants => {
                    plantsArray = Object.values(plants);
                    // replace with return 
                    return plantsArray;
                });
            }
            return plantsArray; 
        })
        .catch(error => {
            throw new Error("Failed to fetch plant details: " + error);
        });
    } 
    catch (error){
        console.log("Failed to retrieve plantCatalog: " + error);
    }
}
getPlantCatalogPages(3);