const { Ticket, Game, Claim, ClaimValidator } = require('./tambola.js');

describe('Tambola Claim Validator Tests', () => {
    let validator;
    let sampleTicket;

    beforeEach(() => {
        validator = new ClaimValidator();
        // Sample ticket: 3x9 grid with some zeros (empty spaces)
        sampleTicket = new Ticket([
            [1, 2, 3, 4, 5, 6, 7, 8, 9],    // Top row
            [10, 11, 12, 13, 14, 15, 16, 17, 18], // Middle row
            [19, 20, 21, 22, 23, 24, 25, 26, 27]  // Bottom row
        ]);
    });

    describe('Ticket Class', () => {
        test('should create valid ticket', () => {
            expect(sampleTicket.numbers).toHaveLength(3);
            expect(sampleTicket.numbers[0]).toHaveLength(9);
        });

        test('should throw error for invalid ticket structure', () => {
            expect(() => new Ticket([[1, 2], [3, 4]])).toThrow('Ticket must have exactly 3 rows');
            expect(() => new Ticket([[1, 2, 3, 4, 5, 6, 7, 8], [9, 10, 11, 12, 13, 14, 15, 16], [17, 18, 19, 20, 21, 22, 23, 24]])).toThrow('Each row must have exactly 9 numbers');
        });

        test('should get row correctly', () => {
            expect(sampleTicket.getRow(0)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
            expect(sampleTicket.getRow(1)).toEqual([10, 11, 12, 13, 14, 15, 16, 17, 18]);
        });

        test('should get all numbers', () => {
            const allNumbers = sampleTicket.getAllNumbers();
            expect(allNumbers).toHaveLength(27);
            expect(allNumbers).toContain(1);
            expect(allNumbers).toContain(27);
        });
    });

    describe('Top Line Validation', () => {
        test('should accept valid top line claim', () => {
            const announcedNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            const claim = new Claim(Game.TOP_LINE, sampleTicket, announcedNumbers);
            const result = validator.validateClaim(claim);
            
            expect(result.accepted).toBe(true);
            expect(result.reason).toBe('Line completed');
        });

        test('should reject incomplete top line claim', () => {
            const announcedNumbers = [1, 2, 3, 4, 5]; // Only 5 numbers
            const claim = new Claim(Game.TOP_LINE, sampleTicket, announcedNumbers);
            const result = validator.validateClaim(claim);
            
            expect(result.accepted).toBe(false);
            expect(result.reason).toBe('Line not completed');
        });
    });

    describe('Middle Line Validation', () => {
        test('should accept valid middle line claim', () => {
            const announcedNumbers = [10, 11, 12, 13, 14, 15, 16, 17, 18];
            const claim = new Claim(Game.MIDDLE_LINE, sampleTicket, announcedNumbers);
            const result = validator.validateClaim(claim);
            
            expect(result.accepted).toBe(true);
            expect(result.reason).toBe('Line completed');
        });

        test('should reject incomplete middle line claim', () => {
            const announcedNumbers = [10, 11, 12]; // Only 3 numbers
            const claim = new Claim(Game.MIDDLE_LINE, sampleTicket, announcedNumbers);
            const result = validator.validateClaim(claim);
            
            expect(result.accepted).toBe(false);
            expect(result.reason).toBe('Line not completed');
        });
    });

    describe('Bottom Line Validation', () => {
        test('should accept valid bottom line claim', () => {
            const announcedNumbers = [19, 20, 21, 22, 23, 24, 25, 26, 27];
            const claim = new Claim(Game.BOTTOM_LINE, sampleTicket, announcedNumbers);
            const result = validator.validateClaim(claim);
            
            expect(result.accepted).toBe(true);
            expect(result.reason).toBe('Line completed');
        });
    });

    describe('Full House Validation', () => {
        test('should accept valid full house claim', () => {
            const allNumbers = sampleTicket.getAllNumbers();
            const claim = new Claim(Game.FULL_HOUSE, sampleTicket, allNumbers);
            const result = validator.validateClaim(claim);
            
            expect(result.accepted).toBe(true);
            expect(result.reason).toBe('Line completed');
        });

        test('should reject incomplete full house claim', () => {
            const announcedNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]; // Only 14 numbers
            const claim = new Claim(Game.FULL_HOUSE, sampleTicket, announcedNumbers);
            const result = validator.validateClaim(claim);
            
            expect(result.accepted).toBe(false);
            expect(result.reason).toBe('Line not completed');
        });
    });

    describe('Early Five Validation', () => {
        test('should accept valid early five claim', () => {
            const announcedNumbers = [1, 2, 3, 4, 5, 10, 11]; // 7 numbers announced, 5 from ticket
            const claim = new Claim(Game.EARLY_FIVE, sampleTicket, announcedNumbers);
            const result = validator.validateClaim(claim);
            
            expect(result.accepted).toBe(true);
            expect(result.reason).toBe('Early five achieved');
        });

        test('should reject early five claim with less than 5 numbers', () => {
            const announcedNumbers = [1, 2, 3, 4]; // Only 4 numbers
            const claim = new Claim(Game.EARLY_FIVE, sampleTicket, announcedNumbers);
            const result = validator.validateClaim(claim);
            
            expect(result.accepted).toBe(false);
            expect(result.reason).toBe('Less than 5 numbers crossed');
        });
    });

    describe('Edge Cases', () => {
        test('should handle ticket with zeros (empty spaces)', () => {
            const ticketWithZeros = new Ticket([
                [1, 0, 3, 0, 5, 6, 0, 8, 9],    // Top row with zeros
                [10, 11, 12, 13, 14, 15, 16, 17, 18], // Middle row
                [19, 20, 21, 22, 23, 24, 25, 26, 27]  // Bottom row
            ]);
            
            const announcedNumbers = [1, 3, 5, 6, 8, 9]; // Only non-zero numbers from top row
            const claim = new Claim(Game.TOP_LINE, ticketWithZeros, announcedNumbers);
            const result = validator.validateClaim(claim);
            
            expect(result.accepted).toBe(true);
            expect(result.reason).toBe('Line completed');
        });

        test('should handle invalid game type', () => {
            const claim = new Claim('invalid_game', sampleTicket, [1, 2, 3]);
            const result = validator.validateClaim(claim);
            
            expect(result.accepted).toBe(false);
            expect(result.reason).toBe('Invalid game type');
        });

        test('should handle extra announced numbers', () => {
            const announcedNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 100, 200, 300]; // Extra numbers
            const claim = new Claim(Game.TOP_LINE, sampleTicket, announcedNumbers);
            const result = validator.validateClaim(claim);
            
            expect(result.accepted).toBe(true);
            expect(result.reason).toBe('Line completed');
        });
    });
}); 