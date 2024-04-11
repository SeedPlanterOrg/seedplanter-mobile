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
        return response.json();
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
        return response.json();
    })
    .then(responseData => {
        // Process the response data
        console.log(responseData);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

async function deleteGardenPlant(_userId, _plantId) {
    const url = new URL(`${link}/garden/remove_plant`);
    // const url = new URL(`http://localhost:3000/garden/remove_plant`); // unit testing 
    const requestBody = {
        userId: _userId,
        plantId: _plantId
    };

    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        return responseData; // Return the response from the server

    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error; // Rethrow the error for the caller to handle
    }
}

async function createJournalEntry(entryObject) {
    const url = new URL(`${link}/journal/create_entry`);
    //const url = new URL(`http://localhost:3000/journal/create_entry`);// for unit test
    console.log(entryObject);
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Set Content-Type to application/json
        },
        body: JSON.stringify(entryObject),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(responseData => {
        // Process the response data
        console.log(responseData);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

async function deleteJournalEntry(_id) {
    const url = new URL(`${link}/journal/delete_entry_by_Id`);
    //const url = new URL(`http://localhost:3000/journal/delete_entry_by_Id`);// for unit test
    const params = {
       id: _id,
    };
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    fetch(url, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(responseData => {
        // Process the response data
        console.log(responseData);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

async function getJournalEntry(_id) {
    const url = new URL(`${link}/journal/get_entry_by_id`);
    //const url = new URL(`http://localhost:3000/journal/get_entry_by_id`);// for unit test
    const params = {
       id: _id,
    };
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    fetch(url, {
        method: 'GET'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(responseData => {
        // Process the response data
        console.log(responseData);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

async function getJournal(_id) {
    const url = new URL(`${link}/journal/get_journal`);
    // const url = new URL(`http://localhost:3000/journal/get_journal`);// for unit test
    const params = {
       id: _id,
    };
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    fetch(url, {
        method: 'GET'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(responseData => {
        // Process the response data
        console.log(responseData);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

module.exports = {
    getPlantCatalogPage,
    findPlantById, 
    getGarden,
    addPlant,
    createGarden,
    createJournalEntry,
    deleteJournalEntry,
    getJournal,
    getJournalEntry,
    deleteGardenPlant
};

