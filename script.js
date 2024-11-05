//your JS code here. If required.

function createRandomPromise(index) {
    return new Promise((resolve) => {
        const time = (Math.random() * 2 + 1).toFixed(3);
        setTimeout(() => resolve({ index, time }), time * 1000);
    });
}

const outputTable = document.getElementById("output");
const loadingRow = document.createElement("tr");
loadingRow.innerHTML = `<td colspan="2">Loading...</td>`;
outputTable.appendChild(loadingRow);

const promises = [
    createRandomPromise(1),
    createRandomPromise(2),
    createRandomPromise(3),
];

const startTime = performance.now();


Promise.all(promises).then((results) => {
    outputTable.innerHTML = "";


    results.forEach(result => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>Promise ${result.index}</td><td>${result.time} seconds</td>`;
        outputTable.appendChild(row);
    });


    const totalTime = ((performance.now() - startTime) / 1000).toFixed(3);
    const totalRow = document.createElement("tr");
    totalRow.innerHTML = `<td>Total</td><td>${totalTime} seconds</td>`;
    outputTable.appendChild(totalRow);
});
