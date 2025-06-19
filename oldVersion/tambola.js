// Tambola Claim Validator
// Game types and validation logic

class Ticket {
    constructor(numbers) {
        this.numbers = numbers; // 3x9 grid represented as array of arrays
        this.validateTicket();
    }

    validateTicket() {
        if (!this.numbers || this.numbers.length !== 3) {
            throw new Error('Ticket must have exactly 3 rows');
        }

        for (let row of this.numbers) {
            if (!Array.isArray(row) || row.length !== 9) {
                throw new Error('Each row must have exactly 9 numbers');
            }
        }
    }

    getRow(rowIndex) {
        return this.numbers[rowIndex];
    }

    getAllNumbers() {
        return this.numbers.flat();
    }
}

class Game {
    static TOP_LINE = 'top_line';
    static MIDDLE_LINE = 'middle_line';
    static BOTTOM_LINE = 'bottom_line';
    static FULL_HOUSE = 'full_house';
    static EARLY_FIVE = 'early_five';
}

class Claim {
    constructor(gameType, ticket, announcedNumbers) {
        this.gameType = gameType;
        this.ticket = ticket;
        this.announcedNumbers = announcedNumbers;
    }
}

class ClaimValidator {
    validateClaim(claim) {
        try {
            switch (claim.gameType) {
                case Game.TOP_LINE:
                    return this.validateTopLine(claim);
                case Game.MIDDLE_LINE:
                    return this.validateMiddleLine(claim);
                case Game.BOTTOM_LINE:
                    return this.validateBottomLine(claim);
                case Game.FULL_HOUSE:
                    return this.validateFullHouse(claim);
                case Game.EARLY_FIVE:
                    return this.validateEarlyFive(claim);
                default:
                    return { accepted: false, reason: 'Invalid game type' };
            }
        } catch (error) {
            return { accepted: false, reason: error.message };
        }
    }

    validateTopLine(claim) {
        const topRow = claim.ticket.getRow(0);
        const validNumbers = topRow.filter(num => num !== 0);
        return this.validateLine(validNumbers, claim.announcedNumbers);
    }

    validateMiddleLine(claim) {
        const middleRow = claim.ticket.getRow(1);
        const validNumbers = middleRow.filter(num => num !== 0);
        return this.validateLine(validNumbers, claim.announcedNumbers);
    }

    validateBottomLine(claim) {
        const bottomRow = claim.ticket.getRow(2);
        const validNumbers = bottomRow.filter(num => num !== 0);
        return this.validateLine(validNumbers, claim.announcedNumbers);
    }

    validateFullHouse(claim) {
        const allNumbers = claim.ticket.getAllNumbers();
        const validNumbers = allNumbers.filter(num => num !== 0);
        return this.validateLine(validNumbers, claim.announcedNumbers);
    }

    validateEarlyFive(claim) {
        const allNumbers = claim.ticket.getAllNumbers();
        const validNumbers = allNumbers.filter(num => num !== 0);
        const crossedNumbers = validNumbers.filter(num => 
            claim.announcedNumbers.includes(num)
        );
        
        if (crossedNumbers.length >= 5) {
            return { accepted: true, reason: 'Early five achieved' };
        }
        return { accepted: false, reason: 'Less than 5 numbers crossed' };
    }

    validateLine(requiredNumbers, announcedNumbers) {
        const crossedNumbers = requiredNumbers.filter(num => 
            announcedNumbers.includes(num)
        );
        
        if (crossedNumbers.length === requiredNumbers.length) {
            return { accepted: true, reason: 'Line completed' };
        }
        return { accepted: false, reason: 'Line not completed' };
    }
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Ticket, Game, Claim, ClaimValidator };
} 