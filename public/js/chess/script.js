'use strict'
var chsArr = null;
var chsIsDead = [];
var chsIsCross = [];

//  #region event handler
const UPDATE_CHESS_BOARD_CUSTOM_EVENT = 'UPDATE_CHESS_BOARD_CUSTOM_EVENT';
const UPDATE_CHESS_BOARD_FROM_SOCKET_CUSTOM_EVENT = 'UPDATE_CHESS_BOARD_FROM_SOCKET_CUSTOM_EVENT';

const CAN_ACCESS_CHESS_BOARD = 'CAN_ACCESS_CHESS_BOARD';
let canAccessChessBoard = false;
let currentTeam = -1;
// Recieve from socket up update check board;
document.addEventListener(UPDATE_CHESS_BOARD_FROM_SOCKET_CUSTOM_EVENT, (event) => {
  const board = event?.detail.board;
  const nextSide = event?.detail?.nextTurnTeam;
  const chsIsDeadUpdate = event?.detail?.chsIsDead;

  chsArr = board;
  
  var chssTemp = document.querySelectorAll('.ch');
  
  chssTemp.forEach(function (ch) {
    ch.remove();
  });

  chsIsDead = chsIsDeadUpdate;
  updateChessboard(board);
  nextTurn(nextSide);
  console.log('Received update:');
  console.log(side);

  isCheck(side, chsArr)
})

// Event can access chess board
document.addEventListener(CAN_ACCESS_CHESS_BOARD, (event) => {
  canAccessChessBoard = event?.detail.isPlayer;
  currentTeam = event?.detail.team;
})

var moveHistory = [];
/// Draw the chessboard
var cont = document.querySelector('.cont')
var bg = document.querySelector('.bg')
var sqs = []
for (var y = 0; y < 9; y++) {
  var row = document.createElement('div')
  row.classList.add('row')
  sqs[y] = row
  for (var x = 0; x < 8; x++) {
    var sq = document.createElement('div')
    sq.classList.add('sq')
    sqs[y][x] = sq
    row.appendChild(sq)
  }
  bg.appendChild(row)
}

var rows = document.querySelectorAll('.row')
rows[4].classList.add('middle')

sqs[1][4].classList.add('cross')
sqs[8][4].classList.add('cross')

var mks = [
  [2, 1], [2, 7],
  [3, 0], [3, 2], [3, 4], [3, 6], [3, 8],
  [6, 0], [6, 2], [6, 4], [6, 6], [6, 8],
  [7, 1], [7, 7]
]
for (var i = 0; i < mks.length; i++) {
  var mk = document.createElement('div')
  mk.classList.add('mk')
  mk.style.top = (mks[i][0] * 64 + 2) + 'px'
  mk.style.left = (mks[i][1] * 64 + 2) + 'px'
  bg.appendChild(mk)
}
/// Draw chess pieces
/// [side, name, y, x]
var chs = document.querySelector('.chs')
chsArr = [
  [1, '車', 0, 0], [1, '車', 0, 8],
  [1, '马', 0, 1], [1, '马', 0, 7],
  [1, '相', 0, 2], [1, '相', 0, 6],
  [1, '仕', 0, 3], [1, '仕', 0, 5],
  [1, '帅', 0, 4],
  [1, '砲', 2, 1], [1, '砲', 2, 7],
  [1, '兵', 3, 0], [1, '兵', 3, 2], [1, '兵', 3, 4], [1, '兵', 3, 6], [1, '兵', 3, 8],

  [-1, '車', 9, 0], [-1, '車', 9, 8],
  [-1, '马', 9, 1], [-1, '马', 9, 7],
  [-1, '象', 9, 2], [-1, '象', 9, 6],
  [-1, '士', 9, 3], [-1, '士', 9, 5],
  [-1, '将', 9, 4],
  [-1, '炮', 7, 1], [-1, '炮', 7, 7],
  [-1, '卒', 6, 0], [-1, '卒', 6, 2], [-1, '卒', 6, 4], [-1, '卒', 6, 6], [-1, '卒', 6, 8]
]
for (var i = 0; i < chsArr.length; i++) {
  placeChess.apply(null, chsArr[i].concat(i))
}

function placeChess(side, name, y, x, i) {
  
  var ch = document.createElement('span')
  ch.textContent = name
  ch.classList.add('ch', side > 0 ? 'red' : 'green')
  ch.setAttribute('i', i)
  ch.style.top = en(y) + 'px'
  ch.style.left = en(x) + 'px'
  chs.appendChild(ch)
}




function en(n) {
  return n * 64 + 2
}
function de(v) {
  return (v - 2) / 64
}

/// Player moves
var side = null
var done = [null, null]
var pick = [null, null]
var each = Array.prototype.forEach
var abs = Math.abs
var round = Math.round
var chss = chs.querySelectorAll('.ch')
nextTurn()

document.addEventListener('mousedown', function (e) {
  e = e.originalEvent || e
  // if (side < 0) {
  if (e.target.classList.contains('ch') &&
    e.target.classList.contains(side > 0 ? 'red' : 'green')) {

    // lock when user cant not acces check board == viewer
    // if (!canAccessChessBoard) {
    //   alert(`Bạn chỉ là con người bình thường làm sao mà bấm được vào bàn cờ`)
    //   return;
    // }

    // // Nếu bạn bên đỏ thì không được move cờ bên đen và ngược lại
    // if (currentTeam !== side) {
    //   alert(`Chơi ăn gian - không được đụng vào cờ của đối thủ`);
    //   return;
    // }

    // lock when user cant not acces check board == viewer

    if (pick[side] != null) {
      chss[pick[side]].classList.remove('active')
    }
    e.target.classList.add('active')
    pick[side] = +e.target.getAttribute('i')
    return
  }
  if (pick[side] != null) {
    var x = de(e.pageX - bg.offsetLeft)
    var y = de(e.pageY - bg.offsetTop)
    if (!(x >= -0.4 && x <= 8.4 &&
      y >= -0.4 && y <= 9.4)) return
    if (abs(round(x) - x) > 0.4 ||
      abs(round(y) - y) > 0.4) return
    x = round(x)
    y = round(y)
    var c = chsArr[pick[side]]

    if (!canGo(c, x, y)) return
    chsArr.forEach(function (c, i) {
      if (!c.dead && c[2] === y && c[3] === x) {

        //If can go and can kill chess
        c.dead = true
        chsIsDead.push(c);
        chss[i].style.display = 'none'
      }
    })
    // update board state
    recordMove(c, c[3], c[2], x, y, i);

    if (isMoveCausingCheck(side, c[3], c[2], x, y)) {
      console.log("Nước đi này gây chiếu tướng!");
    } else {
      console.log("Nước đi này không gây chiếu tướng.");
    }
    
    
    var ch = chss[pick[side]]
    ch.style.left = en(x) + 'px'
    ch.style.top = en(y) + 'px'

    c[2] = y
    c[3] = x
    if (c[1] === '兵' || c[1] === '卒') {
      if (side > 0 ? (c[2] >= 5) : (c[2] <= 4))
      {
        c.cross = true
        chsIsCross.push(c);
       
      } 
    }

    done[side] = pick[side]
    if (done[-side] != null) {
      chss[done[-side]].classList.remove('active')
    }

    pick[side] = null

    updateChsArr(chsArr, chsIsDead);
    updateChessboard(chsArr);
    return
  }
  // }
})

/// [side, name, y, x]

// Real-time calculation of cursor update
function canGo(c, x, y) {

  // if (chsArr.some(function(c1){
  // return !c1.dead && c1[2] === y && c1[3] === x && c1[0] === c[0]
  // })) return false
  let dx = x - c[3]
  let dy = y - c[2]

  if (c[1] === '兵' || c[1] === '卒') {
    if (c.cross && dy === 0 && abs(dx) === 1) return true
    return dx === 0 && dy === c[0]
  }
  if (c[1] === '帅' || c[1] === '将') {
    if (!(
      c[0] > 0 ? (x >= 3 && x <= 5 && y >= 0 && y <= 2) :
        (x >= 3 && x <= 5 && y >= 7 && y <= 9)
    )) return false
    return abs(dx) + abs(dy) === 1
  }
  if (c[1] === '仕' || c[1] === '士') {
    if (!(
      c[0] > 0 ? (x >= 3 && x <= 5 && y >= 0 && y <= 2) :
        (x >= 3 && x <= 5 && y >= 7 && y <= 9)
    )) return false
    return abs(dx) * abs(dy) === 1
  }
  if (c[1] === '相' || c[1] === '象') {
    if (!(
      c[0] > 0 ? (x >= 0 && x <= 8 && y >= 0 && y <= 4) :
        (x >= 0 && x <= 8 && y >= 5 && y <= 9)
    )) return false
    if (chsArr.some(function (c1) {
      return !c1.dead &&
        c1[2] - c[2] === dy / 2 &&
        c1[3] - c[3] === dx / 2
    })) return false
    return abs(dx) === 2 && abs(dy) === 2
  }
  if (c[1] === '马') {
    if (chsArr.some(function (c1) {
      return !c1.dead &&
        c1[2] - c[2] === sign(dy) * (abs(dy) - 1) &&
        c1[3] - c[3] === sign(dx) * (abs(dx) - 1)
    })) return false
    return abs(dx) * abs(dy) === 2
  }
  if (c[1] === '車') {
    if (dx * dy !== 0) return false
    var n = chsArr.reduce(function (m, c1) {
      var dx1 = (c1[3] - c[3]) / sign(dx)
      var dy1 = (c1[2] - c[2]) / sign(dy)
      var f = c1 !== c && !c1.dead && (
        (dy && c1[3] === c[3] && dy1 < abs(dy) && dy1 > 0) ||
        (dx && c1[2] === c[2] && dx1 < abs(dx) && dx1 > 0)
      )
      return f ? m + 1 : m
    }, 0)
    return n === 0
  }
  if (c[1] === '砲' || c[1] === '炮') {
    if (dx * dy !== 0) return false
    var n = chsArr.reduce(function (m, c1) {
      var dx1 = (c1[3] - c[3]) / sign(dx)
      var dy1 = (c1[2] - c[2]) / sign(dy)
      var f = c1 !== c && !c1.dead && (
        (dy && c1[3] === c[3] && dy1 < abs(dy) && dy1 > 0) ||
        (dx && c1[2] === c[2] && dx1 < abs(dx) && dx1 > 0)
      )
      return f ? m + 1 : m
    }, 0)
    if (chsArr.some(function (c1) {
      return !c1.dead && c1[2] === y && c1[3] === x
    })) {
      return n === 1
    }
    return n === 0
  }
}
function sign(v) {
  return v > 0 ? 1 :
    v < 0 ? -1 : 0
}

function nextTurn(_side) {
  if (_side) {
    side = _side;
    return side;
  }
  if (side == null) side = 1
  else side = -side
  if (side > 0) {
    // todo: AI
    // setTimeout(function(){
    //   nextTurn()
    // }, 2000)

  } else {

  }
  return side;
}

function findPieceCoordinatesByName(name) {
  for (var i = 0; i < chsArr.length; i++) {
    var pieceInfo = chsArr[i];
    if (pieceInfo[1] === name) {
      return pieceInfo; // Trả về tọa độ [x, y]
    }
  }
  return null; // Trả về null nếu không tìm thấy
}

function isCheck(phe, board) {
  var kingPos = findPieceCoordinatesByName(phe === 1 ? '帅' : '将', board); // Tìm tướng của phe
  console.log('-----------------------------------isCheck--------------------------------------')
  console.log(kingPos);
  for (var i = 0; i < board.length; i++) {
      var pieceInfo = board[i];
      if (pieceInfo[0] === -phe) {
          var isValidAttack = canGo(pieceInfo, kingPos[3], kingPos[2]);
          if (isValidAttack) {
              console.log(`Tướng của phe ${phe} bị chiếu!`);
              return true;
          }
      }
  }
  return false;
}

function isMoveCausingCheck(side, fromX, fromY, toX, toY) {
  // Bước 1: Tạo bản sao tạm thời
  var tempChsArr = chsArr.slice(); // Tạo bản sao của chsArr

  // Bước 2: Thực hiện nước đi của bạn
  var pieceToMove = tempChsArr.find(piece => piece[2] === fromY && piece[3] === fromX);
  pieceToMove[2] = toY;
  pieceToMove[3] = toX;

  // Bước 3: Kiểm tra xem nước đi này có gây chiếu tướng không
  var isCheckAfterMove = isCheck(side, tempChsArr); // Kiểm tra chiếu tướng cho phe đang đi

  // Bước 4: Khôi phục trạng thái ban đầu
  tempChsArr = chsArr.slice(); // Khôi phục trạng thái ban đầu của chsArr

  return isCheckAfterMove;
}


function recordMove(c, fromX, fromY, toX, toY, id) {
  
  var move = {
    piece: c[1],      // Tên quân cờ
    from: [fromX, fromY], // Tọa độ điểm bắt đầu
    to: [toX, toY],     // Tọa độ điểm kết thúc
    id: id            // Thêm ID của quân cờ
  };
  moveHistory.push(move);
  console.log(moveHistory);

// Gọi sự kiện di chuyển quân cờ có ID là 0 đến tọa độ (200, 200)
}

function updateChsArr(chsArr, chsIsDead) {
  // PUSH EVENT TO COMPONENT
  const updateBoardCustomEvent = new CustomEvent(UPDATE_CHESS_BOARD_CUSTOM_EVENT, {
    detail: {
      board_matrix: chsArr,
      nextTurn: nextTurn(),
      chsIsDead: chsIsDead
    }
  });
  document.dispatchEvent(updateBoardCustomEvent);
  // PUSH EVENT TO COMPONENT
}

function updateChessboard(board) {
  // Loại bỏ các quân cờ hiện tại
  var chssTemp = document.querySelectorAll('.ch');
  
  chssTemp.forEach(function (ch) {
    ch.remove();
  });

  // Vẽ lại các quân cờ mới từ trạng thái bàn cờ mới (board)
  for (var i = 0; i < chsArr.length; i++) {
    var pieceInfo = chsArr[i];
    var isDead = chsIsDead.some(chsDead => 
        chsDead[0] === pieceInfo[0] &&
        chsDead[1] === pieceInfo[1] &&
        chsDead[2] === pieceInfo[2] &&
        chsDead[3] === pieceInfo[3]
    );

    var isCross = chsIsCross.some(chsCross => 
      chsCross[0] === pieceInfo[0] &&
      chsCross[1] === pieceInfo[1] &&
      chsCross[2] === pieceInfo[2] &&
      chsCross[3] === pieceInfo[3]
  );

  if(isCross){
    chsArr[i].cross = true;
  }
    
    if (!isDead) {
        placeChess.apply(null, pieceInfo.concat(i));
    } else {
        chsArr[i].dead = true;
        chss[i].style.display = 'none';
    }
}
  
  
}