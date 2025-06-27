function isImmediateClaim(required, announcedNumbers) {
    let lastAnnouncedIndex = -1;
    for (let i = 0; i < announcedNumbers.length; i++) {
        if (required.includes(announcedNumbers[i])) {
            lastAnnouncedIndex = i;
        }
    }
    return lastAnnouncedIndex === announcedNumbers.length - 1;
}

function isRowComplete(row, announcedNumbers) {
    const required = row.filter(num => num !== 0);
    if (!required.every(num => announcedNumbers.includes(num))) return false;
    // Immediate claim logic
    return isImmediateClaim(required, announcedNumbers);
}


// Full House: Check if all numbers (except zeros) in the ticket are in the announced numbers.
function isFullHouse(ticket, announcedNumbers) {
    const required = ticket.flat().filter(num => num !== 0); //flatten 2D array into 1D like [[1,2,3],[4,5,6]] => [1,2,3,4,5,6]
    if (!required.every(num => announcedNumbers.includes(num))) return false;
    // Immediate claim logic
    return isImmediateClaim(required, announcedNumbers);
}

// Early five: Check if at least 5 numbers from the ticket are in the announced numbers, and the 5th is the last announced
// Note: We don't reuse isImmediateClaim here because Early Five requires the 5th crossed number to be the last announced, not all required numbers.
function isEarlyFive(ticket, announcedNumbers) {
    const allNumbers = ticket.flat().filter(num => num !== 0); //flatten 2D array into 1D like [[1,2,3],[4,5,6]] => [1,2,3,4,5,6]
    const crossed = [];
    for (let num of announcedNumbers) {
        if (allNumbers.includes(num) && !crossed.includes(num)) {
            crossed.push(num);
            if (crossed.length === 5) break;
        }
    }
    if (crossed.length < 5) return false;
    // The 5th crossed number must be the last announced
    return announcedNumbers[announcedNumbers.length - 1] === crossed[4];
}



function validateClaim(ticket, announcedNumbers, gameType) {
    if (!isValidTicket(ticket)) {
        return "Rejected";
    }
    switch (gameType) {
        case 'top_line': 
            return isRowComplete(ticket[0], announcedNumbers) ? "Accepted" : "Rejected";
        case 'middle_line':
            return isRowComplete(ticket[1], announcedNumbers) ? "Accepted" : "Rejected";
        case 'bottom_line':
            return isRowComplete(ticket[2], announcedNumbers) ? "Accepted" : "Rejected";
        case 'full_house':
            return isFullHouse(ticket, announcedNumbers) ? "Accepted" : "Rejected";
        case 'early_five':
            return isEarlyFive(ticket, announcedNumbers) ? "Accepted" : "Rejected";
        default: 
            throw new Error('Unknown game type');
    }
}

// Validates that a ticket is a 3x9 grid (each row is an array of length 9)
function isValidTicket(ticket) {
    return Array.isArray(ticket) &&
        ticket.length === 3 &&
        ticket.every(row => Array.isArray(row) && row.length === 9);
}

module.exports = { isRowComplete, isFullHouse, isEarlyFive, validateClaim, isImmediateClaim, isValidTicket }
