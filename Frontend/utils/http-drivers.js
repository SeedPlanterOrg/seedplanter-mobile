// import here as needed

// drivers

async function run() {
    try {
        let object = {
            id: "65efc58051a3024ba286442d"
        };us
        const plantsArray = await createGarden(object);
        console.log(plantsArray);
        // You can use plantsArray here
    } catch (error) {
        console.error("Error: ", error);
    }
}
run();

async function run() {
try {
    let id = "65efc324a82682e507e38ebc";
    const plantsArray = await getGarden(id);
    console.log(plantsArray);
    // You can use plantsArray here
} catch (error) {
    console.error("Error: ", error);
}
}
run();
async function run() {
    try {
        let object = {
            _id: "66003bc6d48a27039a864f5b",
            id: "65efc324a82682e507e38ebc1",
            plantId: 2,
            water: true,
            fertilize: false,
            prune: true,
            waterLevel: 5,
            lastWateringDate: "2024-03-21",
            fertilizerLevel: 3,
            lastFertilizingDate: "2024-03-15",
            notes: " ",
            imagesUrls: [
              "http://example.com/image1.jpg",
              "http://example.com/image2.jpg"
            ]
        };
        const plantsArray = await addPlant(object);
        console.log(plantsArray);
        // You can use plantsArray here
    } catch (error) {
        console.error("Error: ", error);
    }
}
run();
async function run() {
try {
    const plantsArray = await getPlantCatalogPage(4);
    const stuff = await plantsArray;
    //console.log(plantsArray[0]);
    // You can use plantsArray here
    return stuff;
} catch (error) {
    console.error("Error: ", error);
}

}

const gotstuff = run();
const finaldrive = gotstuff.then((value) => {
console.log(value);
//return value;
})
console.log(finaldrive);
async function testCreateJournalEntry() {
// Mock data for testing
const mockEntryObjects = [
    {
        userId: "5f50c31b12e34b18d4a7b5e6",
        plantId: "5f50c31b12e34b18d4a7b5e7",
        date: "2024-04-05T08:00:00.000Z",
        images: [
            "https://example.com/image1.jpg",
            "https://example.com/image2.jpg"
        ],
        notes: [
            "Noticed new growth on the left side.",
            "Leaves are healthy and green."
        ],
        waterLevel: 5,
        fertilizerLevel: 3
    },
    // Additional test cases can be added here (e.g., missing fields, invalid data types)
];

// Iterating over each mock entry object and testing the createJournalEntry function
for (let entryObject of mockEntryObjects) {
    try {
        console.log("Testing with entry object:", entryObject);
        await createJournalEntry(entryObject);
        console.log("Test passed for entry object:", entryObject);
    } catch (error) {
        console.error("Test failed for entry object:", entryObject, "Error:", error);
    }
}
}

// // Example usage
// testCreateJournalEntry();
async function testGetJournal() {
// Define a set of test IDs, including valid and potentially invalid ones
const testIds = [
    "5f50c31b12e34b18d4a7b5e6", // Valid test case 
];

// Function to simulate a delay (useful for observing asynchronous behavior)
//const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// Iterate over each test ID and call getJournal
for (const testId of testIds) {
    try {
        console.log(`Testing getJournal with ID: ${testId}`);
        const response = await getJournal(testId);
        console.log('Response:', response);
        //await delay(1000); // Adding delay between tests for readability
    } catch (error) {
        console.error(`Error with ID ${testId}:`, error.message);
    }
}
}

// Run the test driver
testGetJournal();

async function testGetJournalEntry() {
// Define a set of test IDs, including valid and potentially invalid ones
const testIds = [
    "6617f60f7aff0a53ce7b7008",
    "6615b1beab1965363dfdadd4" // Example valid ID
                    // Test case with invalid ID
    // Add more test cases as needed
];

// Function to simulate a delay (useful for observing asynchronous behavior)
//const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// Iterate over each test ID and call getJournalEntry
for (const testId of testIds) {
    try {
        console.log(`Testing getJournalEntry with ID: ${testId}`);
        await getJournalEntry(testId);
        //await delay(1000); // Adding delay between tests for readability
    } catch (error) {
        console.error(`Error with ID ${testId}:`, error.message);
    }
}
}

// Run the test driver
testGetJournalEntry();

async function testDeleteJournalEntry() {
// Define a set of test IDs, including valid and potentially invalid ones
const testIds = [
    "6615abb5ab1965363dfdadd2",   // Replace with a valid ID that exists in your database
                   // Test case with empty ID
    // Add more test cases as needed
];

// Function to simulate a delay (useful for observing asynchronous behavior)
//const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// Iterate over each test ID and call deleteJournalEntry
for (const testId of testIds) {
    try {
        console.log(`Testing deleteJournalEntry with ID: ${testId}`);
        await deleteJournalEntry(testId);
       // await delay(1000); // Adding delay between tests for readability
    } catch (error) {
        console.error(`Error with ID ${testId}:`, error.message);
    }
}
}

// Run the test driver
testDeleteJournalEntry();

async function testDeleteGardenPlant() {
    // JSON input
    const inputData = {
        userId: "65efc324a82682e507e38ebc",
        plantId: "6605a0fe870528bde51243b0"
    };

    // Call the deleteGarden function with the provided input
    try {
        console.log("Attempting to delete garden with the following data:", inputData);
        const response = await deleteGardenPlant(inputData.userId, inputData.plantId);
        console.log("Delete operation successful. Response:", response);
    } catch (error) {
        console.error("Delete operation failed. Error:", error.message);
    }
}

// Run the test driver
testDeleteGardenPlant();