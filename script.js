// Function to create a promise that resolves after a random time between 1 and 3 seconds
function createRandomPromise(index) {
    return new Promise((resolve) => {
        const time = (Math.random() * 2 + 1).toFixed(3); // Random time between 1 and 3 seconds
        setTimeout(() => resolve({ index, time }), time * 1000);
    });
}

// Add initial loading row
const outputTable = document.getElementById("output");
const loadingRow = document.createElement("tr");
loadingRow.id = "loading"; // Set ID for Cypress to find
loadingRow.innerHTML = `<td colspan="2">Loading...</td>`;
outputTable.appendChild(loadingRow);

// Create an array of three promises
const promises = [
    createRandomPromise(1),
    createRandomPromise(2),
    createRandomPromise(3),
];

// Use Promise.all to wait for all promises to resolve
Promise.all(promises).then((results) => {
    // Clear the output table
    outputTable.innerHTML = "";

    // Populate the table with each promise result
    results.forEach(result => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>Promise ${result.index}</td><td>${result.time} seconds</td>`;
        outputTable.appendChild(row);
    });

    // Calculate the total time taken for all promises
    const totalTime = results.reduce((total, result) => total + parseFloat(result.time), 0).toFixed(3);
    const totalRow = document.createElement("tr");
    totalRow.innerHTML = `<td>Total</td><td>${totalTime} seconds</td>`;
    outputTable.appendChild(totalRow);

    // Remove loading row if it still exists
    loadingRow.remove(); // This ensures the loading row is removed after completion
});
