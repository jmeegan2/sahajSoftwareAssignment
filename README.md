## How to Use

1. **Install dependencies (if any):**
   ```
   npm install
   ```

2. **Run the tests:**
   ```
   npm test
   ```

# Tambola Claim Validator - Requirements & Approach

## Problem Statement
Build a claim validator for the game of Tambola (Housie). The system should determine if a player's claim for a specific game is valid based on the numbers announced so far and the ticket provided.

---

## Functional Requirements
1. **Input:**
   - Numbers announced so far (array of numbers)
   - A valid ticket (3x9 grid, numbers or blanks)   (I just looked this up)
   - A claim for a specific game (game type)

2. **Output:**
   - Accepted/Rejected 

3. **Game Types (Winning Patterns):**
   - **Top line:** All numbers in the top row are crossed fastest
   - **Middle line:** All numbers in the middle row are crossed fastest
   - **Bottom line:** All numbers in the bottom row are crossed fastest
   - **Full house:** All 15 numbers on the ticket are crossed first
   - **Early five:** Fastest ticket to have 5 numbers crossed

4. **Rules:**
   - System only returns whether a claim is accepted or rejected
   - A claim is only valid if made immediately after the number that completes the winning sequence is announced

---

## Non-Functional/Design Requirements
- Code should be clean, readable, and maintainable
- Apply SOLID, YAGNI, and KISS principles
- Use unit tests to guarantee correctness
- No GUI or command-line I/O; use code/tests for input/output
- No frameworks or databases; keep it simple and platform-agnostic

---

## Technology Choices
- **Language:** JavaScript (Node.js)
- **Testing Framework:** Jest

---

## Approach
1. Start with a simple function to check if a row is complete.
2. Expand to handle all game types using if/else or a switch statement.
3. Encapsulate logic in classes if the problem grows in complexity. ( I didn't use classes because the problem is simple and functional code is clearer for this scope. If the requirements grow, refactoring to classes would make sense.)
4. Write tests as I go to make sure each part works.
5. Refactor to remove duplication and improve clarity.



// Current magic numbers:
- 5 (Early Five count)
- 3 (ticket rows) 
- 9 (ticket columns)
- 0 (empty space)
- 4 (index for 5th element in Early Five)

Create enums.js to store ticket and game type constants using Object.freeze. This allows me to import and use these constants throughout the codebase, replacing magic numbers and string literals for clarity and maintainability.



validation and error message for input. 

//Input Validation & Error Messages
function isValidTicket(ticket) {
    return Array.isArray(ticket) &&
        ticket.length === 3 &&
        ticket.every(row => Array.isArray(row) && row.length === 9);
}




