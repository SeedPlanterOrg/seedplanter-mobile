// needs to be your ip to run 
// const DEPLOYMENT = process.env.EXPO_PUBLIC_DEPLOYMENT;
// const PORT = process.env.EXPO_PUBLIC_PORT;
let link = process.env.EXPO_PUBLIC_IP
const env = process.env.EXPO_PUBLIC_ENV;

if(env == "production"){
  link = process.env.EXPO_PUBLIC_DEPLOYMENT
}


async function getPlantCatalogPage(page) {
    try {

        const response = await fetch(`${link}/plantCatalog/?page=${page}`);
        if (!response.ok) {
            throw new Error('Failed to fetch plant catalog');
        }

        const plants = await response.json();
        let plantsArray = Object.values(plants);
        if (!plantsArray[0].length) {

            const patchResponse = await fetch(`${link}/plantCatalog/?page=${page}`, { method: 'PATCH' });
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
        const response = await fetch(`${link}/plantCatalog/plant/?id=${id}`, {
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

async function getGarden(id) {
    // ${EXPO_PUBLIC_DEPLOYMENT} or http://localhost:3000/
    const url = new URL(`${link}/garden/get_garden`);

    // If you have parameters to send, append them to the URL
    const params = {
        userId: id, // Example parameter
    };
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    try {
        const response = await fetch(url, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        return responseData; // Return the fetched data

    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error; // Rethrow the error for the caller to handle
    }

}

async function addPlant(gardenPlant) {
    // ${EXPO_PUBLIC_DEPLOYMENT} or http://localhost:3000/
    const url = new URL(`${link}/garden/add_plant`);
    console.log(gardenPlant);
    fetch(url, {
        method: 'PUT', // GET method
        headers: {
            'Content-Type': 'application/json' // Set Content-Type to application/json
        },
        body: JSON.stringify({ gardenPlant })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // Assuming the response is JSON
    })
    .then(responseData => {
        // Process the response data
        console.log(responseData);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

async function createGarden(userId) {
    // ${EXPO_PUBLIC_DEPLOYMENT} or http://localhost:3000/
    const url = new URL(`${link}/garden/create_garden`);
    console.log(userId);
    fetch(url, {
        method: 'POST', // GET method
        headers: {
            'Content-Type': 'application/json' // Set Content-Type to application/json
        },
        body: JSON.stringify(userId),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // Assuming the response is JSON
    })
    .then(responseData => {
        // Process the response data
        console.log(responseData);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}



// // drivers

// async function run() {
//         try {
//             let object = {
//                 id: "65efc58051a3024ba286442d"
//             };
//             const plantsArray = await createGarden(object);
//             console.log(plantsArray);
//             // You can use plantsArray here
//         } catch (error) {
//             console.error("Error: ", error);
//         }
//     }
//     run();

// async function run() {
//     try {
//         let id = "65efc324a82682e507e38ebc";
//         const plantsArray = await getGarden(id);
//         console.log(plantsArray);
//         // You can use plantsArray here
//     } catch (error) {
//         console.error("Error: ", error);
//     }
// }
// run();
// async function run() {
//         try {
//             let object = {
//                 _id: "66003bc6d48a27039a864f5b",
//                 id: "65efc324a82682e507e38ebc1",
//                 plantId: 2,
//                 water: true,
//                 fertilize: false,
//                 prune: true,
//                 waterLevel: 5,
//                 lastWateringDate: "2024-03-21",
//                 fertilizerLevel: 3,
//                 lastFertilizingDate: "2024-03-15",
//                 notes: " ",
//                 imagesUrls: [
//                   "http://example.com/image1.jpg",
//                   "http://example.com/image2.jpg"
//                 ]
//             };
//             const plantsArray = await addPlant(object);
//             console.log(plantsArray);
//             // You can use plantsArray here
//         } catch (error) {
//             console.error("Error: ", error);
//         }
//     }
//     run();
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
    findPlantById, 
    getGarden,
    addPlant,
    createGarden
};

