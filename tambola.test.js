const { isRowComplete, isFullHouse, isEarlyFive, validateClaim } = require('./tambola')

// --- Minimal 3x9 ticket for logic tests ---
const TICKET_3x9 = [
    [1, 2, 0, 0, 0, 0, 0, 0, 0],
    [3, 0, 4, 0, 0, 0, 0, 0, 0],
    [5, 6, 0, 0, 0, 0, 0, 0, 0]
];

// --- Example of a full-size Tambola ticket (for realism) ---
const FULL_SIZE_TAMBOLA_TICKET = [
    [5, 12, 0, 34, 0, 56, 67, 0, 89],
    [0, 18, 23, 0, 45, 0, 0, 78, 90],
    [7, 0, 28, 39, 0, 59, 0, 81, 0]
];

describe('Tambola game logic', () => {
    // --- Core logic tests for individual patterns ---
    test('isRowComplete: returns true only if all non-zero numbers are announced and claim is immediate', () => {
        expect(isRowComplete([1, 2, 0, 4], [1, 2, 4])).toBe(true);      // claim after 4
        expect(isRowComplete([1, 2, 0, 4], [1, 4, 2])).toBe(true);      // 2 not last in row, but last announced
        expect(isRowComplete([1, 2, 0, 4], [1, 2, 4, 5])).toBe(false);  // extra number after
    });

    test('isFullHouse: returns true only if all numbers are announced and claim is immediate', () => {
        expect(isFullHouse(TICKET_3x9, [1, 2, 3, 4, 5, 6])).toBe(true);
        expect(isFullHouse(TICKET_3x9, [1, 2, 3, 4, 5, 6, 7])).toBe(false);
    });

    test('isEarlyFive: returns true only if 5 numbers are crossed and the 5th is the last announced', () => {
        expect(isEarlyFive(TICKET_3x9, [1, 2, 3, 4, 5])).toBe(true);
        expect(isEarlyFive(TICKET_3x9, [1, 2, 3, 4, 6, 5])).toBe(false);
        expect(isEarlyFive(TICKET_3x9, [1, 2, 3, 4])).toBe(false);
    });

    // --- validateClaim tests using a minimal 3x9 ticket ---
    describe('validateClaim: enforces immediate claim for all game types (minimal 3x9)', () => {
        test('Top line: accepts only immediate claims', () => {
            expect(validateClaim(TICKET_3x9, [1, 2], 'top_line')).toBe("Accepted");
            expect(validateClaim(TICKET_3x9, [1, 2, 3], 'top_line')).toBe("Rejected");
        });
        test('Middle line: accepts only immediate claims', () => {
            expect(validateClaim(TICKET_3x9, [3, 4], 'middle_line')).toBe("Accepted");
            expect(validateClaim(TICKET_3x9, [3, 4, 5], 'middle_line')).toBe("Rejected");
        });
        test('Bottom line: accepts only immediate claims', () => {
            expect(validateClaim(TICKET_3x9, [5, 6], 'bottom_line')).toBe("Accepted");
            expect(validateClaim(TICKET_3x9, [5, 6, 1], 'bottom_line')).toBe("Rejected");
        });
        test('Full house: accepts only immediate claims', () => {
            expect(validateClaim(TICKET_3x9, [1, 2, 3, 4, 5, 6], 'full_house')).toBe("Accepted");
            expect(validateClaim(TICKET_3x9, [1, 2, 3, 4, 5, 6, 7], 'full_house')).toBe("Rejected");
        });
        test('Early five: accepts only immediate claims', () => {
            expect(validateClaim(TICKET_3x9, [1, 2, 3, 4, 5], 'early_five')).toBe("Accepted");
            expect(validateClaim(TICKET_3x9, [1, 2, 3, 4, 6, 5], 'early_five')).toBe("Rejected");
        });
    });

    // --- Full-size ticket tests for realism ---
    test('validateClaim: works for top_line on a full-size ticket', () => {
        // Top line numbers: 5, 12, 34, 56, 67, 89
        const announced = [5, 12, 34, 56, 67, 89];
        expect(validateClaim(FULL_SIZE_TAMBOLA_TICKET, announced, 'top_line')).toBe("Accepted");
    });

    test('isFullHouse: works for a full-size ticket', () => {
        // All numbers from the ticket, in any order, last one is 90
        const announced = [5, 12, 34, 56, 67, 89, 18, 23, 45, 78, 90, 7, 28, 39, 59, 81];
        expect(isFullHouse(FULL_SIZE_TAMBOLA_TICKET, announced)).toBe(true);
    });
});