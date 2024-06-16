let gfg = [];
let row = 3;
let col = 3;
let h = 100;
let state = 1;  // state=0 -> playing against computer, state=1 -> playing pvp
let count = 1;//phele x ki chance
let Xwins = 0;
let Ywins = 0;

for (let i = 0; i < row; i++) {
    gfg[i] = [];
    for (let j = 0; j < col; j++) {
        gfg[i][j] = h;
    }
}

function clicked(id) {
    let ls = document.getElementById(id).children;

    if (count == 1) {
        ls[0].style.display = "inline-block";
    } else {
        ls[1].style.display = "inline-block";
    }

    let rowIndex = Math.floor((id - 1) / 3);
    let colIndex = (id - 1) % 3;

    if (gfg[rowIndex][colIndex] == 100) {
        gfg[rowIndex][colIndex] = (count == 1) ? 1 : 0;
        count = (count == 1) ? 0 : 1;
    } else {
        console.log("Already placed");
        return;
    }

    if (state == 0 && count == 0) {  // AI move
        let flag = false;
        while (!flag) {
            let num = Math.floor(Math.random() * 9) + 1;
            let aiRowIndex = Math.floor((num - 1) / 3);
            let aiColIndex = (num - 1) % 3;
            if (gfg[aiRowIndex][aiColIndex] == 100) {
                gfg[aiRowIndex][aiColIndex] = 0;
                document.getElementById(num).children[1].style.display = "inline-block";
                count = 1;
                flag = true;
            }
        }
    }

    let result = checkWin();
    let heading = document.getElementById("head");

    if (result == 1) {
        heading.innerHTML = "X wins";
        Xwins++;
        document.getElementById("X").innerHTML = Xwins;
        setTimeout(reset, 5000);
    } else if (result == 0) {
        heading.innerHTML = "O wins";
        Ywins++;
        document.getElementById("O").innerHTML = Ywins;
        setTimeout(reset, 5000);
    } else if (result == -1) {
        heading.innerHTML = "Draw";
        setTimeout(reset, 5000);
    } else {
        heading.innerHTML = (count == 1) ? "X's turn" : "O's turn";
    }
}

function checkWin() {
    for (let i = 0; i < 3; i++) {
        if (gfg[i][0] == gfg[i][1] && gfg[i][1] == gfg[i][2] && gfg[i][0] != 100) {
            return gfg[i][0];
        }
        if (gfg[0][i] == gfg[1][i] && gfg[1][i] == gfg[2][i] && gfg[0][i] != 100) {
            return gfg[0][i];
        }
    }

    if (gfg[0][0] == gfg[1][1] && gfg[1][1] == gfg[2][2] && gfg[0][0] != 100) {
        return gfg[0][0];
    }
    if (gfg[0][2] == gfg[1][1] && gfg[1][1] == gfg[2][0] && gfg[0][2] != 100) {
        return gfg[0][2];
    }
    
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (gfg[i][j] == 100) {
                return 100;
            }
        }
    }

    return -1; 
}

function reset() {
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            gfg[i][j] = h;
        }
    }
    count = 1;
    for (let i = 1; i <= 9; i++) {
        document.getElementById("cross" + i).style.display = "none";
        document.getElementById("cricle" + i).style.display = "none";
    }
    document.getElementById("head").innerHTML = "X's turn";
}

function stateChange() {
    reset();
    if (state == 0) {
        state = 1;
        document.getElementById("hi").innerHTML = "Play against computer";
    } else {
        state = 0;
        document.getElementById("hi").innerHTML = "Play against player";
    }
}

function resetScore() {
    Xwins = 0;
    Ywins = 0;
    document.getElementById("X").innerHTML = Xwins;
    document.getElementById("O").innerHTML = Ywins;
}
