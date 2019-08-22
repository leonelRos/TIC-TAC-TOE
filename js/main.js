var lookup = {
    '1': 'black',
    '-1': 'gray',
    'null': 'white'
  };
  
  var winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  
  var board, turn, winner
  
  var squares = document.querySelectorAll('td div');
  var message = document.querySelector('h1');
  
  document.querySelector('table').addEventListener('click', handleMove);
  document.querySelector('button').addEventListener('click', initialize);
  
  
  function handleMove(evt) {
    // obtain index of square
    var idx = parseInt(evt.target.id.replace('sq', ''));
    // check if square is available and return if not
    if (board[idx] || winner) return;
    // update state (board, turn, winner)
    board[idx] = turn;
    turn *= -1;
    winner = getWinner();
    render();
  }
  
  function getWinner() {
    for (var i = 0; i < winningCombos.length; i++) {
      if (Math.abs(board[winningCombos[i][0]] + board[winningCombos[i][1]] + board[winningCombos[i][2]]) === 3) return board[winningCombos[i][0]];
    }
    
    if (board.includes(null)) return null;
    return 'D';
  }
  
  function render() {
    board.forEach(function(sq, idx) {
      squares[idx].style.background = lookup[sq];
    });
    if (winner === 'D') {
      message.innerHTML = 'You tie!';
    } else if (winner) {
      message.innerHTML = `Congrats ${lookup[winner].toUpperCase()}!`;
    } else {
      message.innerHTML = `${lookup[turn].toUpperCase()}'s Move`;
    }
  }
  function initialize() {
    board = [null, null, null, null, null, null, null, null, null];
    turn = 1;
    winner = null;
    render();
  }
  
  initialize();