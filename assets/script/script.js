const initPG = () => {
    for (let indexX = 0; indexX < playground.length; indexX++) {
        for (let indexY = 0; indexY < playground[indexX].length; indexY++) {

            let chance = genererNombreAleatoire();

            if (chance <= 2) {
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
    nbrBombeTotalDiv.innerHTML = `Nombre de bombe : ${nbrBombeTotal}`;
}

function genererNombreAleatoire() {
    return Math.floor(Math.random() * 10) + 1;
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


globalThis.playground = [
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
]

globalThis.bg = document.querySelector("#battleG");
globalThis.nbrBombeTotalDiv = document.querySelector("#nbrBtotal");
globalThis.ix = 0;
globalThis.iy = 0;
globalThis.nbrBombeTotal = 0;

console.dir(playground)



play();

console.dir(playground)