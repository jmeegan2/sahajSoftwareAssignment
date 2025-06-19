const { isRowComplete, isFullHouse, isEarlyFive, validateClaim } = require('./tambola')


describe('Tambola game logic', () => {

    test('isRowComplete enforces immediate claim', () => {
        expect(isRowComplete([1, 2, 0, 4], [1, 2, 4])).toBe(true); // claim after 4
        expect(isRowComplete([1, 2, 0, 4], [1, 4, 2])).toBe(true); // 2 not last
        expect(isRowComplete([1, 2, 0, 4], [1, 2, 4, 5])).toBe(false); // extra number after
    })

    test('isFullHouse enforces immediate claim', () => {
        const ticket = [
            [1, 2, 0],
            [3, 0, 4],
            [5, 6, 0]
        ];
        expect(isFullHouse(ticket, [1, 2, 3, 4, 5, 6])).toBe(true); // claim after 6
        expect(isFullHouse(ticket, [1, 2, 3, 4, 5, 6, 7])).toBe(false); // extra number after
    })

    test('isEarlyFive enforces immediate claim', () => {
        const ticket = [
            [1, 2, 0],
            [3, 0, 4],
            [5, 6, 0]
        ];
        expect(isEarlyFive(ticket, [1, 2, 3, 4, 5])).toBe(true); // 5th crossed is last
        expect(isEarlyFive(ticket, [1, 2, 3, 4, 6, 5])).toBe(false); // 5th crossed is not last
        expect(isEarlyFive(ticket, [1, 2, 3, 4])).toBe(false); // less than 5
    })

    test('validateClaim enforces immediate claim for all game types', () => {
        const ticket = [
            [1, 2, 0],
            [3, 0, 4],
            [5, 6, 0]
        ];
        expect(validateClaim(ticket, [1, 2], 'top_line')).toBe("Accepted");
        expect(validateClaim(ticket, [1, 2, 3], 'top_line')).toBe("Rejected"); // extra number after
        expect(validateClaim(ticket, [3, 4], 'middle_line')).toBe("Accepted");
        expect(validateClaim(ticket, [3, 4, 5], 'middle_line')).toBe("Rejected");
        expect(validateClaim(ticket, [5, 6], 'bottom_line')).toBe("Accepted");
        expect(validateClaim(ticket, [5, 6, 1], 'bottom_line')).toBe("Rejected");
        expect(validateClaim(ticket, [1, 2, 3, 4, 5, 6], 'full_house')).toBe("Accepted");
        expect(validateClaim(ticket, [1, 2, 3, 4, 5, 6, 7], 'full_house')).toBe("Rejected");
        expect(validateClaim(ticket, [1, 2, 3, 4, 5], 'early_five')).toBe("Accepted");
        expect(validateClaim(ticket, [1, 2, 3, 4, 6, 5], 'early_five')).toBe("Rejected");
    })



    const FULL_SIZE_TAMBOLA_TICKET = [
        [  5, 12,  0, 34,  0, 56, 67,  0, 89 ],
        [  0, 18, 23,  0, 45,  0,  0, 78, 90 ],
        [  7,  0, 28, 39,  0, 59,  0, 81,  0 ]
      ];

    test('validateClaim works for top_line on full-size ticket', () => {
        // Top line numbers: 5, 12, 34, 56, 67, 89
        const announced = [5,12,34,56,67,89];
        expect(validateClaim(FULL_SIZE_TAMBOLA_TICKET, announced, 'top_line')).toBe("Accepted");
    });
      
    test('Full house claim works for full-size ticket', () => {
        // All numbers from the ticket, in any order, last one is 90
        const announced = [5,12,34,56,67,89,18,23,45,78,90,7,28,39,59,81];
        expect(isFullHouse(FULL_SIZE_TAMBOLA_TICKET, announced)).toBe(true);
    });
});