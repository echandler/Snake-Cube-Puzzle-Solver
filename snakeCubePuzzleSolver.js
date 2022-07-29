//
// The solution is an array of x,y,z coords for each block when the puzzle is solved, and in the
// correct order because there is an elastic cord going through each block keeping them in order.
//
// Label each block in some way. There are 3 block types: end blocks, blocks with holes drilled
// straight through them (I call these "fixed" blocks), and blocks with 45 degree holes drilled
// in them (I call these "swivel" blocks).
//

let ary = ["start", "f", "s", "s", "s", "f", "s", "s", "f", "s", "s", "s", "f", 
           "s", "f", "s", "s", "s", "s", "f", "s", "f", "s", "f", "s", "f", "end"];

//  Start at other end of puzzle. (ary.reverse() basically)
//let ary = ["start", "f", "s", "f", "s", "f", "s", "f", "s", "s", "s", "s", "f",
//           "s", "f", "s", "s", "s", "f", "s", "s", "f", "s", "s", "s", "f", "end"];

let solution = [];
// Hardcode first couple of blocks
solution.push([0, 0, 0]);
solution.push([1, 0, 0]);

solve(2);

console.log("Done!", solution);

function solve(idx) {
    // Tests ------------------------------------------------------------------------------------

    // If idx has gone past the end of the array then a solution was found.
    if (idx >= ary.length) return true;

    // Check if block has gone "out of bounds". The cube can only be 3 blocks wide.
    for (let n = 0; n < solution.length; n++) {
        if (solution[n][0] > 2 || solution[n][0] < 0 || solution[n][1] > 2 || 
            solution[n][1] < 0 || solution[n][2] > 2 || solution[n][2] < 0) return false;
    }

    // Is previous block colliding with another block.
    let q = solution[idx - 1];
    for (let p = 0; p < solution.length - 2; p++) {
        if (samePos(q, solution[p])) return false;
    }

    // Brute force algorithm --------------------------------------------------------------------

    let p2 = solution[idx - 2];

    solution[idx] = [...solution[idx - 1]]; // Previous block.

    if (ary[idx - 1] === "f") {
        // The previous block was a "fixed" block (block with cord going straight through it), so
        // current block has to be opposite side of the "fixed" block that the previous block was on.
        // Example: If the previous block was on the left side of the "fixed" block, then current block
        // has to on the right side of the "fixed" block.

        for (let n = 0; n < 3; n++) {
            solution[idx][n] += 1;

            if (samePos(solution[idx], p2)) {
                solution[idx][n] -= 2;
                break;
            }

            solution[idx][n] -= 2;

            if (samePos(solution[idx], p2)) {
                solution[idx][n] += 2;
                break;
            }

            solution[idx][n] += 1; // Reset the coordinate.
        }

        if (solve(idx + 1)) return true;

        solution.pop();

        return false;
    } else if (ary[idx - 1] === "s") {
        // Previous block was a "swivel" block (block with the cord going 45 degrees through it),
        // so current block will swivel with the "swivel" block in only four of the six directions
        // depending on the "swivel" block's orientation. Try all four directions one at a time.
        let p = [...solution[idx - 1]];

        if (samePos([p[0] - 1, p[1], p[2]], p2) || samePos([p[0] + 1, p[1], p[2]], p2)) {
            // forward, backward, up, down

            solution[idx][1] += 1; // up
            if (solve(idx + 1)) return true;

            solution[idx][1] -= 2; // down
            if (solve(idx + 1)) return true;

            solution[idx][1] += 1; // reset y

            solution[idx][2] -= 1; // forward
            if (solve(idx + 1)) return true;

            solution[idx][2] += 2; // backward
            if (solve(idx + 1)) return true;
        } else if (samePos([p[0], p[1] - 1, p[2]], p2) || samePos([p[0], p[1] + 1, p[2]], p2)) {
            // forward, backward, left, right

            solution[idx][0] += 1; // right;
            if (solve(idx + 1)) return true;

            solution[idx][0] -= 2; // left;
            if (solve(idx + 1)) return true;

            solution[idx][0] += 1; // reset x;

            solution[idx][2] -= 1; // forward
            if (solve(idx + 1)) return true;

            solution[idx][2] += 2; // backward
            if (solve(idx + 1)) return true;
        } else if (samePos([p[0], p[1], p[2] - 1], p2) || samePos([p[0], p[1], p[2] + 1], p2)) {
            // right, left, up, down

            solution[idx][1] += 1; // up
            if (solve(idx + 1)) return true;

            solution[idx][1] -= 2; // down
            if (solve(idx + 1)) return true;

            solution[idx][1] += 1; // reset y

            solution[idx][0] += 1; // right
            if (solve(idx + 1)) return true;

            solution[idx][0] -= 2; // left
            if (solve(idx + 1)) return true;
        }

        solution.pop();

        return false;
    }
}

function samePos(a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
}
/*
let ary = ["start", "f", "s", "f", "s", "f", "s", "f", "s", "s", "s", "s", "f", 
           "s", "f", "s", "s", "s", "f", "s", "s", "f", "s", "s", "s", "f", "end"];

// Solution 1
0: (3) [0, 0, 0]
1: (3) [1, 0, 0]
2: (3) [2, 0, 0]
3: (3) [2, 1, 0]
4: (3) [2, 2, 0]
5: (3) [1, 2, 0]
6: (3) [0, 2, 0]
7: (3) [0, 2, 1]
8: (3) [0, 2, 2]
9: (3) [1, 2, 2]
10: (3) [1, 2, 1]
11: (3) [2, 2, 1]
12: (3) [2, 1, 1]
13: (3) [2, 0, 1]
14: (3) [1, 0, 1]
15: (3) [0, 0, 1]
16: (3) [0, 0, 2]
17: (3) [0, 1, 2]
18: (3) [0, 1, 1]
19: (3) [0, 1, 0]
20: (3) [1, 1, 0]
21: (3) [1, 1, 1]
22: (3) [1, 1, 2]
23: (3) [1, 0, 2]
24: (3) [2, 0, 2]
25: (3) [2, 1, 2]
26: (3) [2, 2, 2]

// Solution 2 (matches solution on business website)
let ary = ["start",'f', 's', 's', 's', 'f', 's', 's', 'f', 's', 's', 's', 'f', 
           's', 'f', 's', 's', 's', 's', 'f', 's', 'f', 's', 'f', 's', 'f', "end"];

0: (3) [0, 0, 0]
1: (3) [1, 0, 0]
2: (3) [2, 0, 0]
3: (3) [2, 1, 0]
4: (3) [1, 1, 0]
5: (3) [1, 1, 1]
6: (3) [1, 1, 2]
7: (3) [1, 2, 2]
8: (3) [1, 2, 1]
9: (3) [1, 2, 0]
10: (3) [2, 2, 0]
11: (3) [2, 2, 1]
12: (3) [2, 1, 1]
13: (3) [2, 0, 1]
14: (3) [1, 0, 1]
15: (3) [0, 0, 1]
16: (3) [0, 1, 1]
17: (3) [0, 1, 0]
18: (3) [0, 2, 0]
19: (3) [0, 2, 1]
20: (3) [0, 2, 2]
21: (3) [0, 1, 2]
22: (3) [0, 0, 2]
23: (3) [1, 0, 2]
24: (3) [2, 0, 2]
25: (3) [2, 1, 2]
26: (3) [2, 2, 2]
*/
