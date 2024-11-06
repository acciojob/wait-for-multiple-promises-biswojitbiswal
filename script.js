function createRandomPromise(index) {
    const time = (Math.random() * 2 + 1).toFixed(3); // Random time between 1 and 3 seconds
    return new Promise((resolve) => {
      setTimeout(() => resolve({ index: `Promise ${index}`, time: parseFloat(time) }), time * 1000);
    });
  }

  // Create three promises
  const promises = [createRandomPromise(1), createRandomPromise(2), createRandomPromise(3)];
  const table = document.getElementById('resultTable');
  
  // Use Promise.all to wait for all promises to resolve
  const start = performance.now();
  Promise.all(promises).then((results) => {
    const totalTime = (performance.now() - start) / 1000;

    // Remove loading row
    document.getElementById('loading').remove();

    // Populate the table with the results
    results.forEach((result) => {
      const row = document.createElement('tr');
      row.innerHTML = `<td>${result.index}</td><td>${result.time} seconds</td>`;
      table.appendChild(row);
    });

    // Add the total time row
    const totalRow = document.createElement('tr');
    totalRow.innerHTML = `<td>Total</td><td>${totalTime.toFixed(3)} seconds</td>`;
    table.appendChild(totalRow);
  });