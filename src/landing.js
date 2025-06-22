/*
<div class="landing">
  <h1 class="heading">battleship</h1>
  <button>play</button>
</div>
*/

function landing() {
  const main = document.querySelector(".main");
  const landing = document.createElement("div");
  landing.classList.add("landing");

  const heading = document.createElement("h1");
  heading.classList.add("heading");
  heading.textContent = "battleship";

  const button = document.createElement("button");
  button.textContent = "play";

  landing.appendChild(heading);
  landing.appendChild(button);

  main.appendChild(landing);
}

export default landing;
