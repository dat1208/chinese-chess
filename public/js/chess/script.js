'use strict'
  var chsArr = null;


  var roomCurrent = localStorage.getItem('roomCurrent');
  var socket = io('http://localhost:3200');

  socket.emit('JOIN_ROOM', roomCurrent);

  socket.on('updateChessBoard', function(board) {
    console.log('Received board in room:', board);
    updateChessboard(board);
    nextTurn();
  });
  
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
    mk.style.top = (mks[i][0] * 64+2) + 'px'
    mk.style.left = (mks[i][1] * 64 +2) + 'px'
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

  function placeChess(side, name, y, x, i){
    var ch = document.createElement('span')
    ch.textContent = name
    ch.classList.add('ch', side > 0 ? 'red': 'green')
    ch.setAttribute('i', i)
    ch.style.top = en(y) + 'px'
    ch.style.left = en(x) + 'px'
    chs.appendChild(ch)
  }
  function en(n){
    return n * 64 + 2
  }
  function de(v){
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

  document.addEventListener('mousedown', function(e){
    e = e.originalEvent || e
    // if (side < 0) {
      if (e.target.classList.contains('ch') &&
        e.target.classList.contains(side > 0 ? 'red' : 'green')) {
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
        chsArr.forEach(function(c, i){
          if (!c.dead && c[2] === y && c[3] === x) {
            c.dead = true
            chss[i].style.display = 'none'
          }
        })
        // update board state
        recordMove(c, c[3], c[2], x, y);
        console.log(moveHistory);
        
        

        var ch = chss[pick[side]]
        ch.style.left = en(x) + 'px'
        ch.style.top = en(y) + 'px'
        updateChsArr(c, c[3], c[2], x, y); 
        
        c[2] = y
        c[3] = x
        if (c[1] === '兵' || c[1] === '卒') {
          if (side > 0 ? (c[2] >= 5) : (c[2] <= 4)) c.cross = true
        }
        
        done[side] = pick[side]
        if (done[-side] != null) {
          chss[done[-side]].classList.remove('active')
        }
        
        
        pick[side] = null
        updateChessboard(chsArr);
        nextTurn();
        return
      }
    // }
  })

  /// [side, name, y, x]

 // Real-time calculation of cursor update
  function canGo(c, x, y){
  
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
      if (chsArr.some(function(c1){
        return !c1.dead &&
          c1[2] - c[2] === dy / 2 &&
          c1[3] - c[3] === dx / 2
      })) return false
      return abs(dx) === 2 && abs(dy) === 2
    }
    if (c[1] === '马') {
      if (chsArr.some(function(c1){
        return !c1.dead &&
          c1[2] - c[2] === sign(dy) * (abs(dy)-1) &&
          c1[3] - c[3] === sign(dx) * (abs(dx)-1)
      })) return false
      return abs(dx) * abs(dy) === 2
    }
    if (c[1] === '車') {
      if (dx * dy !== 0) return false
      var n = chsArr.reduce(function(m, c1){
        var dx1 = (c1[3] - c[3]) / sign(dx)
        var dy1 = (c1[2] - c[2]) / sign(dy)
        var f = c1 !== c && !c1.dead && (
          (dy && c1[3] === c[3] && dy1 < abs(dy) && dy1 > 0) ||
          (dx && c1[2] === c[2] && dx1 < abs(dx) && dx1 > 0)
          )
        return f ? m+1 : m
      }, 0)
      return n === 0
    }
    if (c[1] === '砲' || c[1] === '炮') {
      if (dx * dy !== 0) return false
      var n = chsArr.reduce(function(m, c1){
        var dx1 = (c1[3] - c[3]) / sign(dx)
        var dy1 = (c1[2] - c[2]) / sign(dy)
        var f = c1 !== c && !c1.dead && (
          (dy && c1[3] === c[3] && dy1 < abs(dy) && dy1 > 0) ||
          (dx && c1[2] === c[2] && dx1 < abs(dx) && dx1 > 0)
          )
        return f ? m+1 : m
      }, 0)
      if (chsArr.some(function(c1){
        return !c1.dead && c1[2] === y && c1[3] === x
      })) {
        return n === 1
      }
      return n === 0
    }
  }
  function sign(v){
    return v > 0 ? 1 :
      v < 0 ? -1 : 0
  }

  function nextTurn(){
    if (side == null) side = 1
    else side = -side
    if (side > 0) {
      // todo: AI
      // setTimeout(function(){
      //   nextTurn()
      // }, 2000)
      
    } else {
     
    }
    console.log(side);
  }


  function recordMove(c, fromX, fromY, toX, toY) {
    var move = {
      piece: c[1],      // Tên quân cờ
      from: [fromX, fromY], // Tọa độ điểm bắt đầu
      to: [toX, toY]     // Tọa độ điểm kết thúc
    };
    moveHistory.push(move);
  }

  function updateChsArr(c, fromX, fromY, toX, toY) {
    // Tìm vị trí của quân cờ trong mảng chsArr
    var index = chsArr.findIndex(function (item) {
      return item[2] === fromY && item[3] === fromX;
    });
  
    if (index !== -1) {
      // Cập nhật tọa độ mới của quân cờ
      chsArr[index][2] = toY;
      chsArr[index][3] = toX;
    }
    if (c !== chsArr[index]) {
        chsArr[index].dead = true;
        
      
    } else {
      //Nếu không tìm thấy, thêm một quân cờ mới
      //chsArr.push([c, c[1], toY, toX]);
    }
    

    console.log(chsArr);
    
    socket.emit('updateChessBoard', roomCurrent, chsArr);

    }
    
  
    function updateChessboard(board) {
      // Loại bỏ các quân cờ hiện tại
      var chss = document.querySelectorAll('.ch');
      chss.forEach(function(ch) {
        ch.remove();
      });
    
      // Vẽ lại các quân cờ mới từ trạng thái bàn cờ mới (board)
      for (var i = 0; i < board.length; i++) {
        var pieceInfo = board[i];
        placeChess.apply(null, pieceInfo.concat(i));
      }
      chsArr = board;
      
    }
    
 
  
  
