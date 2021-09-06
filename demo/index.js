import { add } from "./add.js";
const res = add("1", "5");
document.querySelector("#app").innerHTML = `<h1>hahha${res}</h1>`