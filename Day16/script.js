const taskContainer = document.querySelector(".task__container");
let globalStore = [];

const generateNewCard = (taskData) =>
  `
      <div class="col-sm-12 col-md-6 col-lg-3 mb-4">
        <div class="card shadow">
          <div class="card-header d-flex justify-content-end gap-2">
            <button type="button" class="btn btn-success"><i class="fas fa-pencil-alt"></i></button>
            <button type="button" class="btn btn-danger" id=${taskData.id} onclick="deleteCard.apply(this, arguments)"><i class="fas fa-trash-alt" id=${taskData.id} onclick="deleteCard.apply(this, arguments)"></i></button>
            <!--
            <div id=${taskData.id}>
              <button type="button" class="btn btn-danger" onclick="deleteCard.apply(this, arguments)"><i class="fas fa-trash-alt" onclick="deleteCard.apply(this, arguments)"></i></button>
            </div>
            -->
          </div>
          <div class="card-body">
            <img src="${taskData.imageUrl}" onerror="this.src='task.png'" class="card-img-top" alt="task_image">
            <h5 class="card-title mt-3 fw-bold text-warning">${taskData.taskTitle}</h5>
            <p class="card-text fw-bold">${taskData.taskType}</p>
            <p class="card-text">${taskData.taskDescription}</p>
          </div>
        </div>
      </div>
    `;

const loadInitialCardData = () =>{
  // Initial Storage to get the task card Data
  const getCardData = localStorage.getItem("unique__id__12345");

  // convert to normal object
  const {cards} = JSON.parse(getCardData);

  // loop over those array of task object to create HTML card, inject it to DOM
  cards.map((cardObject) => {
    taskContainer.insertAdjacentHTML("beforeend", generateNewCard(cardObject));

    // Update the globalStore
    globalStore.push(cardObject);
  })
};


// Delete Function

const deleteCard = (event) => {
  event = window.event;
  const targetID = event.target.id;
  const tagname = event.target.tagname;

  globalStore = globalStore.filter((cardObject) => cardObject.id !== targetID);
  localStorage.setItem("unique__id__12345", JSON.stringify({cards: globalStore}));

  if(tagname === "BUTTON") {
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);
  }
  else {
      return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
  }

}


const saveChanges = () => {
  const taskData = {
    id: `${Date.now()}`,
    imageUrl: document.getElementById("image__url").value,
    taskTitle: document.getElementById("task__title").value,
    taskType: document.getElementById("task__type").value,
    taskDescription: document.getElementById("task__description").value
  };

    taskContainer.insertAdjacentHTML("beforeend", generateNewCard(taskData));

    globalStore.push(taskData);
    localStorage.setItem("unique__id__12345", JSON.stringify({cards :globalStore}));

};
