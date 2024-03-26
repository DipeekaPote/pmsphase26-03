const fs = require('fs');

// Function to create a folder for the current year
function createYearFolder(parentFolder) {
    const currentYear = new Date().getFullYear();
    const yearFolder = `${parentFolder}/${currentYear}`;
    if (!fs.existsSync(yearFolder)) {
        fs.mkdirSync(yearFolder);
    }
}
module.exports = createYearFolder;

