
/*
  * File: 
    *http.js

  * Description: 
    * Contains all the http requests to the backend endpoints, 
    * with the exception of chatbot requests 
*/
let link = process.env.EXPO_PUBLIC_IP
const env = process.env.EXPO_PUBLIC_ENV;

if(env == "production"){
  link = process.env.EXPO_PUBLIC_DEPLOYMENT
}

/**
 * Gets a plant page based of a number
 * @param {Number} page - page number. 
 * @returns {Array} an array of plant objects 
 */
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

/**
 * Gets a plant based off a peranual id 
 * @param {Number} ID - id number of API plant. 
 * @returns {Object} a singular plant object 
 */
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


/**
 * Gets a a garden based off the userId
 * @param {String} ID - mongoDB ID in form of 661fca981bfbf7709fa95cda. 
 * @returns {Object} returns a complex garden obejct see postman or docs  
 */
async function getGarden(userId) {
    // ${EXPO_PUBLIC_DEPLOYMENT} or http://localhost:3000/
    const url = new URL(`${link}/garden/get_garden`);

    // If you have parameters to send, append them to the URL
    const params = {
        userId: userId, // Example parameter
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

/**
 * Adds a garden plant to the user garden
 * @param {Object} PlantObject - takes a gardenPlant object in form of mongoose schema. 
 * @returns {Object} returns a response object from server  
 */
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

/**
 * Creates a garden for a user
 * @param {String} ID - mongoDB ID in form of 661fca981bfbf7709fa95cda. 
 * @returns {Object} returns a newly created garden for user   
 */
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

/**
 * Removes a garden plant from a user garden
 * @param {String} userId - mongoDB userID in form of 661fca981bfbf7709fa95cda.
 * @param {String} plantId - mongoDB plantID in form of 661fca981bfbf7709fa95cda.
 * @returns {Object} returns a response object informing on success of operation   
 */
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

/**
 * Creates journal and associates it with a user
 * @param {Object} entryObject - An entry object in the defined by mongoose entry schema.
 * @returns {Object} returns a response object informing on success of operation   
 */
async function createJournalEntry(entryObject) {
    const url = new URL(`${link}/journal/create_entry`);
    //const url = new URL(`http://localhost:3000/journal/create_entry`);// for unit test
    console.log(entryObject);
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Set Content-Type to application/json
            },
            body: JSON.stringify(entryObject),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log("Response from create journal entry:", responseData);
        return responseData; // Optionally return this if you need to use the response data outside the function
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

/**
 * Deletes a journal entry for a user 
 * @param {String} ID - mongoDB ID of entry in form of 661fca981bfbf7709fa95cda.
 * @returns {Object} returns a response object informing on success of operation   
 */
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

/**
 * Gets a specific journal entry from database
 * @param {String} ID - mongoDB ID of entry in form of 661fca981bfbf7709fa95cda.
 * @returns {Object} returns a journalEntry object   
 */
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

/**
 * Updates a specific entry for a user 
 * @param {object} entryObject - entry object with new data
 * @returns {Object} returns a response object   
 */
async function updateJournalEntry(entryObject) {
    const url = new URL(`${link}/journal/update_entry`);
    // const url = new URL(`http://localhost:3000/journal/update_entry`);// for unit test
    console.log("OBJECT TO UPDATE: " + entryObject);
    fetch(url, {
        method: 'PUT',
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

/**
 * Gets a journal for a user 
 * @param {String} ID - mongoDB ID for userId in form of 661fca981bfbf7709fa95cda.
 * @returns {Array} array of entry objects for a user   
 */
async function getJournal(_id) {
    const url = new URL(`${link}/journal/get_journal`);
    // const url = new URL(`http://localhost:3000/journal/get_journal`);// for unit test
    const params = { id: _id };
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    try {
        const response = await fetch(url, { method: 'GET' });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseData = await response.json();
        console.log(responseData); // Process the response data
        return responseData; // Optionally return this if you need to use the response data outside the function
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
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
    deleteGardenPlant,
    updateJournalEntry
};

