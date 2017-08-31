/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findNRooksSolution = function(n) {
  var solution;

  var getSolution = function(board, row) {
    if (row === n) {
      solution = board.rows();
      return;
    }

    for (var col = 0; col < n; col++) {
      board.togglePiece(row, col);
      if (board.hasRowConflictAt(row) || board.hasColConflictAt(col)) {
        board.togglePiece(row, col);
      } else {
        getSolution(board, row + 1);
        if (solution) {
          return;
        }
        board.togglePiece(row, col);
      }
    }
  };

  getSolution(new Board({n: n}), 0);

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  // var solutionCount = 0;

  // var countSolutions = function(board, row) {
  //   if (row === n) {
  //     solutionCount++;
  //     return;
  //   }

  //   for (var col = 0; col < n; col++) {
  //     board.togglePiece(row, col);
  //     if (board.hasRowConflictAt(row) || board.hasColConflictAt(col)) {
  //       board.togglePiece(row, col);
  //     } else {
  //       countSolutions(board, row + 1);
  //       board.togglePiece(row, col);
  //     }
  //   }
  // };

  // countSolutions(new Board({n: n}), 0);

  var factorial = function (n) {
    if (n === 0) {
      return 1;
    }
    return n * factorial(n - 1);
  }

  solutionCount = factorial(n);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution;

  var getSolution = function(board, row) {
    if (row === n) {
      solution = board.rows();
      return;
    }

    for (var col = 0; col < n; col++) {
      board.togglePiece(row, col);
      var hasRowConflict = board.hasRowConflictAt(row);
      var hasColConflict = board.hasColConflictAt(col);
      var hasMajorDiagonalConflict = board.hasMajorDiagonalConflictAt(board._getFirstRowColumnIndexForMajorDiagonalOn(row, col));
      var hasMinorDiagonalConflict = board.hasMinorDiagonalConflictAt(board._getFirstRowColumnIndexForMinorDiagonalOn(row, col));
      if (hasRowConflict || hasColConflict || hasMajorDiagonalConflict || hasMinorDiagonalConflict) {
        board.togglePiece(row, col);
      } else {
        getSolution(board, row + 1);
        if (solution) {
          return;
        }
        board.togglePiece(row, col);
      }
    }
  };

  getSolution(new Board({n: n}), 0);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  if (!solution) {
    return new Board({n: n}).rows();
  } else {
    return solution;
  }
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;

  var countSolutions = function(board, row) {
    if (row === n) {
      solutionCount++;
      return;
    }

    for (var col = 0; col < n; col++) {
      board.togglePiece(row, col);
      var hasRowConflict = board.hasRowConflictAt(row);
      var hasColConflict = board.hasColConflictAt(col);
      var hasMajorDiagonalConflict = board.hasMajorDiagonalConflictAt(board._getFirstRowColumnIndexForMajorDiagonalOn(row, col));
      var hasMinorDiagonalConflict = board.hasMinorDiagonalConflictAt(board._getFirstRowColumnIndexForMinorDiagonalOn(row, col));
      if (hasRowConflict || hasColConflict || hasMajorDiagonalConflict || hasMinorDiagonalConflict) {
        board.togglePiece(row, col);
      } else {
        countSolutions(board, row + 1);
        board.togglePiece(row, col);
      }
    }
  };

  countSolutions(new Board({n: n}), 0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
