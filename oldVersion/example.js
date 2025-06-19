const { Ticket, Game, Claim, ClaimValidator } = require('./tambola.js');

// Example usage of Tambola Claim Validator

console.log('🎯 Tambola Claim Validator Examples\n');

// Create a sample ticket (3x9 grid)
const ticket = new Ticket([
    [1, 2, 3, 4, 5, 6, 7, 8, 9],      // Top row
    [10, 11, 12, 13, 14, 15, 16, 17, 18], // Middle row
    [19, 20, 21, 22, 23, 24, 25, 26, 27]  // Bottom row
]);

const validator = new ClaimValidator();

// Example 1: Valid Top Line Claim
console.log('📋 Example 1: Valid Top Line Claim');
const topLineNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const topLineClaim = new Claim(Game.TOP_LINE, ticket, topLineNumbers);
const topLineResult = validator.validateClaim(topLineClaim);
console.log(`Announced numbers: [${topLineNumbers.join(', ')}]`);
console.log(`Result: ${topLineResult.accepted ? '✅ ACCEPTED' : '❌ REJECTED'} - ${topLineResult.reason}\n`);

// Example 2: Invalid Middle Line Claim (incomplete)
console.log('📋 Example 2: Invalid Middle Line Claim (Incomplete)');
const incompleteMiddleNumbers = [10, 11, 12, 13, 14]; // Only 5 numbers
const middleLineClaim = new Claim(Game.MIDDLE_LINE, ticket, incompleteMiddleNumbers);
const middleLineResult = validator.validateClaim(middleLineClaim);
console.log(`Announced numbers: [${incompleteMiddleNumbers.join(', ')}]`);
console.log(`Result: ${middleLineResult.accepted ? '✅ ACCEPTED' : '❌ REJECTED'} - ${middleLineResult.reason}\n`);

// Example 3: Valid Early Five Claim
console.log('📋 Example 3: Valid Early Five Claim');
const earlyFiveNumbers = [1, 2, 3, 4, 5, 100, 200]; // 5 from ticket + extras
const earlyFiveClaim = new Claim(Game.EARLY_FIVE, ticket, earlyFiveNumbers);
const earlyFiveResult = validator.validateClaim(earlyFiveClaim);
console.log(`Announced numbers: [${earlyFiveNumbers.join(', ')}]`);
console.log(`Result: ${earlyFiveResult.accepted ? '✅ ACCEPTED' : '❌ REJECTED'} - ${earlyFiveResult.reason}\n`);

// Example 4: Valid Full House Claim
console.log('📋 Example 4: Valid Full House Claim');
const allNumbers = ticket.getAllNumbers();
const fullHouseClaim = new Claim(Game.FULL_HOUSE, ticket, allNumbers);
const fullHouseResult = validator.validateClaim(fullHouseClaim);
console.log(`Announced numbers: All 27 numbers from ticket`);
console.log(`Result: ${fullHouseResult.accepted ? '✅ ACCEPTED' : '❌ REJECTED'} - ${fullHouseResult.reason}\n`);

// Example 5: Ticket with Empty Spaces (zeros)
console.log('📋 Example 5: Ticket with Empty Spaces');
const ticketWithZeros = new Ticket([
    [1, 0, 3, 0, 5, 6, 0, 8, 9],    // Top row with zeros
    [10, 11, 12, 13, 14, 15, 16, 17, 18], // Middle row
    [19, 20, 21, 22, 23, 24, 25, 26, 27]  // Bottom row
]);

const zeroTicketNumbers = [1, 3, 5, 6, 8, 9]; // Only non-zero numbers from top row
const zeroTicketClaim = new Claim(Game.TOP_LINE, ticketWithZeros, zeroTicketNumbers);
const zeroTicketResult = validator.validateClaim(zeroTicketClaim);
console.log(`Ticket top row: [1, 0, 3, 0, 5, 6, 0, 8, 9] (0 = empty)`);
console.log(`Announced numbers: [${zeroTicketNumbers.join(', ')}]`);
console.log(`Result: ${zeroTicketResult.accepted ? '✅ ACCEPTED' : '❌ REJECTED'} - ${zeroTicketResult.reason}\n`);

// Example 6: Invalid Game Type
console.log('📋 Example 6: Invalid Game Type');
const invalidClaim = new Claim('invalid_game', ticket, [1, 2, 3]);
const invalidResult = validator.validateClaim(invalidClaim);
console.log(`Game type: 'invalid_game'`);
console.log(`Result: ${invalidResult.accepted ? '✅ ACCEPTED' : '❌ REJECTED'} - ${invalidResult.reason}\n`);

console.log('🎉 All examples completed! Run "npm test" to see comprehensive test results.'); 