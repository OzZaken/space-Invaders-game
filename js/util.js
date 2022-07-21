'sue strict'
///////////////////////////////////////////////////////////////////////////////////////////////
function createCell(pos, gameObject, imgPath, className) {
    return {
        pos: pos,
        gameObject: gameObject,
        imgPath: imgPath,
        className: className
    }
}
function updateCell(pos, gameObject = OBJECTS.empty, className = CLASSES.sky,imgPath =  getImgPath(OBJECTS.empty)) {
    console.log(`updateCell(${pos},${gameObject})`)

    // Model
    gBoard[pos.i][pos.j].gameObject = gameObject

    gBoard[pos.i][pos.j].imgPath = imgPath

    gBoard[pos.i][pos.j].className = className

    //  Dom
    var elCell = getElCell(pos)
    elCell.innerHTML = imgPath
    elCell.classList.add(className)

}
function getElCell(pos) {
    // console.log(`getElCell(${pos.i},${pos.j})↓`)
    return document.querySelector(`[data-i='${pos.i}'][data-j='${pos.j}']`)
}
function getImgPath(elementName) {
    // console.log(`getImgPath(${elementName})`);
    return `<img src="img/${elementName}.gif" />`
}
///////////////////////////////////////////////////////////////////////////////////////////////