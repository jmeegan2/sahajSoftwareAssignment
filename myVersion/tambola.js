function isRowComplete(row, announcedNumbers) {
    return row.filter(num => num !== 0).every(num => announcedNumbers.includes(num))
}


// Full House: Check if all numbers (except zeros) in the ticket are in the announced numbers.
function isFullHouse(ticket, announcedNumbers) {
    const allNumbers = ticket.flat().filter(num => num !== 0);
    return allNumbers.every(num => announcedNumbers.includes(num));
}

// Early five: Check if all at least 5 numbers from the ticket are in the announced numbers
function isEarlyFive(ticket, announcedNumbers) {
    const allNumbers = ticket.flat().filter(num => num !== 0);
    const crossed = allNumbers.filter(num => announcedNumbers.includes(num));
    return crossed.length >= 5;
}


function validateClaim(ticket, announcedNumbers, gameType) {
    switch (gameType) {
        case 'top_line': 
            return isRowComplete(ticket[0], announcedNumbers);
        case 'middle_line':
            return isRowComplete(ticket[1], announcedNumbers);
        case 'bottom_line':
            return isRowComplete(ticket[2], announcedNumbers);
        case 'full_house':
            return isFullHouse(ticket, announcedNumbers);
        case 'early_five':
            return isEarlyFive(ticket, announcedNumbers);
        default: 
            throw new Error('Unknown game type');
    }
}

module.exports = { isRowComplete, isFullHouse, isEarlyFive, validateClaim }
