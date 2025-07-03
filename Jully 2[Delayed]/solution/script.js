const addButton = document.getElementById("addButton");
const cardGrid = document.getElementById("cardGrid");

const cards = JSON.parse(localStorage.getItem("cards")) || [];
cards.forEach((card) => createCard(card.id, card.description, card.color));


addButton.addEventListener("click", () => {
  const id = Date.now();
  const color = getRandomColor();
  createCard(id, "", color);
});

function getRandomColor() {
  const colors = [
    "#E97451", "#C9CC3F", "#FF5F15", "#F88379",
    "#F89880", "#5F9EA0", "#FFFF8F", "#E2DFD2",
    "#8A9A5B", "#088F8F", "#097969", "#E4D00A", "#7DF9FF"
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

function createCard(id, description = "", color) {
  const col = document.createElement("div");
  col.className = "col-12 col-sm-6 col-md-4 col-lg-3 mb-4";
  col.dataset.id = id;

  col.innerHTML = `
    <div class="card h-100 p-2" style="background-color: ${color}; border: none; box-shadow: none;">
      <div class="card-body" style="border: none;">
        <textarea class="form-control-plaintext descInput mb-2" rows="6" placeholder=" .  .  .  ." style="background: transparent; border: none; resize: none;">${description}</textarea>
        <div class="d-flex justify-content-between mt-auto">
          <button class="saveBtn" style="
            background-color: black;
            color: white;
            border: none;
            border-radius: 50%;
            width: 50px;
            height: 50px;
          ">
            <i class="fas ${description ? 'fa-edit' : 'fa-save'}"></i>
          </button>
          <button class="deleteBtn" style="
            background-color: black;
            color: white;
            border: none;
            border-radius: 50%;
            width: 50px;
            height: 50px;
          ">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>
    </div>
  `;

  const descInput = col.querySelector(".descInput");
  const saveBtn = col.querySelector(".saveBtn");
  const deleteBtn = col.querySelector(".deleteBtn");

  saveBtn.dataset.mode = description ? "edit" : "save";

  if (description) {
    descInput.setAttribute("readonly", true);
  }

  saveBtn.addEventListener("click", () => {
    if (saveBtn.dataset.mode === "save") {
      const newDesc = descInput.value.trim();
      if (newDesc === "") return;

      descInput.setAttribute("readonly", true);
      saveBtn.innerHTML = `<i class="fas fa-edit"></i>`;
      saveBtn.dataset.mode = "edit";
      updateLocalStorage(id, newDesc, color);
    } else {
      descInput.removeAttribute("readonly");
      saveBtn.innerHTML = `<i class="fas fa-save"></i>`;
      saveBtn.dataset.mode = "save";
    }
  });

  deleteBtn.addEventListener("click", () => {
    col.remove();
    removeFromLocalStorage(id);
  });

  cardGrid.appendChild(col);
}

function updateLocalStorage(id, description, color) {
  const cards = JSON.parse(localStorage.getItem("cards")) || [];
  const index = cards.findIndex((c) => c.id === id);
  if (index !== -1) {
    cards[index] = { id, description, color };
  } else {
    cards.push({ id, description, color });
  }
  localStorage.setItem("cards", JSON.stringify(cards));
}

function removeFromLocalStorage(id) {
  let cards = JSON.parse(localStorage.getItem("cards")) || [];
  cards = cards.filter((card) => card.id !== id);
  localStorage.setItem("cards", JSON.stringify(cards));
}
