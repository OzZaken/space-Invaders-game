'sue strict'


//! Not in Use
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min))) + Math.ceil(min)
}

//! //  ///   /////    ///////      cells      \\\\\\\\   \\\\\    \\\  !\\
function createCell(pos, gameObject, className) {
    // console.log(`createCell(${pos},${gameObject},${className})`)
    // * Only Model 
    gBoard[pos.i][pos.j].gameObject = gameObject
    gBoard[pos.i][pos.j].className = className
    return { className: CLASSES.className, gameObject: gameObject, pos }
}
function refreshElCellByPos(pos, gameObject = gBoard[pos.i][pos.j], className = gBoard[pos.i][pos.j].className) {
    // console.log(`updateCellByPos(${pos.i}|${pos.j}, ${gameObject}, ${className})`)
    // *Only Dom
    var elCell = getElCell(pos)
    elCell.innerHTML = gameObject
}
function updateCell(pos, gameObject = '', className = CLASSES.sky) {
    console.log(`updateCell(${pos},${gameObject})`);
    // gameObject = gameObject === OBJECTS.hero ? OBJECTS.hero : gameObject
    // gameObject = (gameObject === OBJECTS.alien) ? OBJECTS.alien : gameObject
    
    //* Model && Dom
    // Model
    gBoard[pos.i][pos.j].gameObject = gameObject
    gBoard[pos.i][pos.j].className = className
    //  Dom
    var elCell = getElCell(pos)
    elCell.innerHTML = gameObject
    elCell.classList.add(CLASSES.sky)

}
///////////////////////////////////////////////////////////////////////////////////////////////
function getElCell(pos) {
    // console.log(`getElCell(${pos.i},${pos.j})↓`)
    return document.querySelector(`[data-i='${pos.i}'][data-j='${pos.j}']`)
}

function renderCell(pos) {
    console.log('renderCell(pos):↓');
    document.querySelector(` .cell-${pos.i}-${pos.j}`).innerHTML = getImgPath(gBoard[i][j].gameObject)
}
///////////////////////////////////////////////////////////////////////////////////////////////
function getImgPath(elementName) {
    // console.log(`getImgPath(${elementName})`);
    return `<img src="img/${elementName}.gif" />`
}
///////////////////////////////////////////////////////////////////////////////////////////////