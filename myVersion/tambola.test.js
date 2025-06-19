const { isRowComplete, isFullHouse, isEarlyFive, validateClaim } = require('./tambola')


describe('Tambola game logic', () => {

    test('isRowComplete returns true if all non-zero numbers are announced', () => {
        expect(isRowComplete([1, 2, 0, 4], [1, 2, 4])).toBe(true);
        expect(isRowComplete([1, 2, 0, 4], [1, 4])).toBe(false);
    })

    test('isFullHouse returns true if all numbers are announced', () => {
        const ticket = [
            [1, 2, 0],
            [3, 0, 4],
            [5, 6, 0]
        ];
        expect(isFullHouse(ticket, [1, 2, 3, 4, 5, 6])).toBe(true);
        expect(isFullHouse(ticket, [1, 2, 3, 4, 5])).toBe(false);
    })

    test('isEarlyFive returns true if at least 5 numbers are announced', () => {
        const ticket = [
            [1, 2, 0],
            [3, 0, 4],
            [5, 6, 0]
        ];
        expect(isEarlyFive(ticket, [1, 2, 3, 4, 5])).toBe(true);
        expect(isEarlyFive(ticket, [1, 2, 3, 4])).toBe(false);
    })

    test('validateClaim works for all game types', () => {
        const ticket = [
            [1, 2, 0],
            [3, 0, 4],
            [5, 6, 0]
        ];
        expect(validateClaim(ticket, [1, 2], 'top_line')).toBe(true);
        expect(validateClaim(ticket, [3, 4], 'middle_line')).toBe(true);
        expect(validateClaim(ticket, [5, 6], 'bottom_line')).toBe(true);
        expect(validateClaim(ticket, [1, 2, 3, 4, 5, 6], 'full_house')).toBe(true);
        expect(validateClaim(ticket, [1, 2, 3, 4, 5], 'early_five')).toBe(true);
    })

});