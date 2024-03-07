async function getPlantCatalogPage(page) {
    
    try {
        await fetch(`http://localhost:3000/plantCatalog/?page=${page}`, {
            method:'GET'
        })
        .then(res => res.json())
        .then(async plants => {
            let plantsArray = Object.values(plants);
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
                    return plantsArray[0];
                });
            }
            return plantsArray[0]; 
        })
        .catch(error => {
            throw new Error("Failed to fetch plant details: " + error);
        });
    } 
    catch (error){
        console.log("Failed to retrieve plantCatalog: " + error);
    }
}

async function findPlantById(id) {
    try{
        const response = await fetch(`http://localhost:3000/plantCatalog/plant/?id=${id}`, {
            method:'GET'
        });

        if (!response.ok) {
            throw new Error('Failed to fetch plant data');
        }

        const plant = await response.json();
        console.log(plant.data[0]);
        return plant.data[0];
        
    } catch(err) {
        console.error("Failed to find plant:", err);
        return null;
    }
}
