function generateSquareGrid(rows) {
    let grid = [];
    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < rows; j++) {
            row.push(0);
        }
        grid.push(row);
    }
    return grid;
}

const initPG = () => {
    for (let indexX = 0; indexX < playground.length; indexX++) {
        for (let indexY = 0; indexY < playground[indexX].length; indexY++) {

            let chance = genererNombreAleatoire();

            if (chance <= difficultyValue) {
                playground[indexX][indexY] = "bombe";
                nbrBombeTotal++;
            }

            let row = document.querySelector(`#row${indexX}`);

            if (row === null) {
                row = document.createElement("div");
                row.id = `row${indexX}`;
                row.classList.add("row");
                bg.append(row);
            }

            let bloc = document.createElement("div");
            // A retirer

            /* if (playground[indexX][indexY] == "bombe") {
                bloc.innerHTML = "💣";
            } */

            // --------
            bloc.classList.add("case");
            bloc.id = `${indexX}${indexY}`;
            row.append(bloc);
        }

    }
    nbrBombeTotalFin = nbrBombeTotal;
    nbrBombeTotalDiv.innerHTML = `Nombre de bombe : ${nbrBombeTotal}`;
}

function genererNombreAleatoire() {
    return Math.floor(Math.random() * 100) + 1;
}

const checkAround = (x, y) => {
    let nbrBombe = 0;
    if (playground[x - 1] != undefined && playground[x - 1][y - 1] != undefined) {
        if (playground[x - 1][y - 1] == "bombe") {
            nbrBombe++;
        }
    }
    if (playground[x - 1] != undefined && playground[x - 1][y] != undefined) {
        if (playground[x - 1][y] == "bombe") {
            nbrBombe++;
        }
    }
    if (playground[x - 1] != undefined && playground[x - 1][y + 1] != undefined) {
        if (playground[x - 1][y + 1] == "bombe") {
            nbrBombe++;
        }
    }
    if (playground[x] != undefined && playground[x][y - 1] != undefined) {
        if (playground[x][y - 1] == "bombe") {
            nbrBombe++;
        }
    }
    if (playground[x] != undefined && playground[x][y + 1] != undefined) {
        if (playground[x][y + 1] == "bombe") {
            nbrBombe++;
        }
    }
    if (playground[x + 1] != undefined && playground[x + 1][y - 1] != undefined) {
        if (playground[x + 1][y - 1] == "bombe") {
            nbrBombe++;
        }
    }
    if (playground[x + 1] != undefined && playground[x + 1][y] != undefined) {
        if (playground[x + 1][y] == "bombe") {
            nbrBombe++;
        }
    }
    if (playground[x + 1] != undefined && playground[x + 1][y + 1] != undefined) {
        if (playground[x + 1][y + 1] == "bombe") {
            nbrBombe++;
        }
    }
    return nbrBombe;
}

const play = () => {
    console.log(difficultyValue);
    initPG();
    document.querySelectorAll(".case").forEach(element => {
        element.addEventListener("click", function () {

            let identifier = element.id.substring(0);
            let indexX = parseInt(identifier.charAt(0));
            let indexY = parseInt(identifier.charAt(1));

            console.log(indexX, indexY);

            if (playground[indexX][indexY] !== "bombe") {
                if (checkAround(indexX, indexY) != 0) {
                    element.classList.add("uncovered");
                    element.innerHTML = checkAround(indexX, indexY);
                } else {
                    element.classList.add("uncovered");
                }
            } else {
                element.innerHTML = "💣";
                element.classList.add("bombe");
                setTimeout(() => {
                    location.reload();
                }, 2000)
            }
            isFinished();

        }.bind(element));

        element.addEventListener('mousedown', function (event) {
            if (event.button === 1) {
                if (element.innerHTML !== "🚩") {
                    element.innerHTML = "🚩";
                    nbrBombeTotal--;
                    nbrBombeTotalDiv.innerHTML = `Nombre de bombe : ${nbrBombeTotal}`;
                } else if (element.innerHTML === "🚩") {
                    element.innerHTML = "";
                    nbrBombeTotal++;
                    nbrBombeTotalDiv.innerHTML = `Nombre de bombe : ${nbrBombeTotal}`;
                }

            }

        });

    });
}

const isFinished = () => {
    document.querySelectorAll(".case").forEach(element => {
        if (element.classList.contains("uncovered")) {
            nbrUncovered++;
        }
    })
    console.log(nbrUncovered);
    if (document.querySelectorAll(".case").length - nbrUncovered == nbrBombeTotalFin) {
        console.log("objectif atteint");
    }
    nbrUncovered = 0;
}

// -----------------------------------------------------------------------------------------------------------
// ---------------------------------- PROGRAMME PRINCIPAL-----------------------------------------------------
// -----------------------------------------------------------------------------------------------------------

/* globalThis.playground = [
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null]
] */


globalThis.bg = document.querySelector("#battleG");
globalThis.nbrBombeTotalDiv = document.querySelector("#nbrBtotal");
globalThis.begin = false;
globalThis.ix = 0;
globalThis.iy = 0;
globalThis.nbrBombeTotal = 0;
globalThis.nbrBombeTotalFin = 0;
globalThis.nbrUncovered = 0;
globalThis.gridSize = document.querySelector("#gridSize");
globalThis.sizeSpan = document.querySelectorAll(".size");
const difficultyValue = localStorage.getItem('difficultyValue');
const gridSizeValue = localStorage.getItem('gridSizeValue');
globalThis.playground = generateSquareGrid(gridSizeValue);
/* globalThis.gridSizeValue = 0;
globalThis.difficultyValue = 0; */ // <------- Probleme lors de la relecture du script

console.dir(playground)

document.querySelector("#info").addEventListener("click", () => {
    document.querySelector("#infoDiv").classList.toggle("hide");
    document.querySelector("#infoDiv").classList.toggle("show");
});

if (document.querySelector("#restart")) {
    document.querySelector("#restart").addEventListener("click", () => {
        location.reload();
    });
}
console.log(begin);
document.querySelectorAll(".size").forEach(element => {
    element.innerHTML = document.getElementById("gridSize").value;
})

if (document.querySelector("#gridSize")) {
    document.getElementById("gridSize").oninput = () => {
        document.querySelectorAll(".size").forEach(element => {
            element.innerHTML = document.getElementById("gridSize").value;
        })
    }
}
console.log(begin);
if (document.querySelector("#playNow")) {
    document.querySelector("#playNow").addEventListener("click", () => {
        let gridSizeValueT = document.getElementById("gridSize").value;
        let difficultyValueT = document.querySelector("#difficulty").value;
        localStorage.setItem('difficultyValue', difficultyValueT);
        localStorage.setItem('gridSizeValue', gridSizeValueT);
        console.log(document.querySelector("#difficulty").value);
        begin = true;

    })

}
play();


console.dir(playground)