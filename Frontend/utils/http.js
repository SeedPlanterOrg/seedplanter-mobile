// needs to be your ip to run 

async function getPlantCatalogPage(page) {
    try {

        const response = await fetch(`${EXPO_PUBLIC_DEPLOYMENT}/plantCatalog/?page=${page}`);
        if (!response.ok) {
            throw new Error('Failed to fetch plant catalog');
        }

        const plants = await response.json();
        let plantsArray = Object.values(plants);
        if (!plantsArray[0].length) {

            const patchResponse = await fetch(`${EXPO_PUBLIC_DEPLOYMENT}/plantCatalog/?page=${page}`, { method: 'PATCH' });
            if (!patchResponse.ok) {
                throw new Error('Failed to patch plant catalog');
            }

            const patchedPlants = await patchResponse.json();
            plantsArray = Object.values(patchedPlants);
        }
        return plantsArray[0];
    } catch (error) {
        throw new Error("Failed to retrieve plantCatalog: " + error.message);
    }
}

async function findPlantById(id) {
    try{
        const response = await fetch(`${EXPO_PUBLIC_DEPLOYMENT}/plantCatalog/plant/?id=${id}`, {
            method:'GET'
        });

        if (!response.ok) {
            throw new Error('Failed to fetch plant data');
        }

        const plant = await response.json();
        //console.log(plant.data[0]);
        return plant.data[0];
        
    } catch(err) {
        console.error("Failed to find plant:", err);
        return null;
    }
}



// driver 

// async function run() {
//     try {
//         const plantsArray = await getPlantCatalogPage(4);
//         const stuff = await plantsArray;
//         //console.log(plantsArray[0]);
//         // You can use plantsArray here
//         return stuff;
//     } catch (error) {
//         console.error("Error: ", error);
//     }
    
// }

// const gotstuff = run();
// const finaldrive = gotstuff.then((value) => {
//     console.log(value);
//     //return value;
// })
// console.log(finaldrive);

module.exports = {
    getPlantCatalogPage,
    findPlantById
};

