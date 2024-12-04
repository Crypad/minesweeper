import { checkAround } from "./modules/checkAround.js";

const play = () => {
    document.querySelectorAll(".case").forEach(element => {
        element.addEventListener("click", () => {
            element.classList.add("uncovered");
            let id = this.id.substring(1);
        })
    });
}

export { play };