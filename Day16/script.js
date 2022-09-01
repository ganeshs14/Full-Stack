const taskContainer = document.querySelector(".task__container");
console.log(taskContainer);

const saveChanges = () => {
  const taskData = {
    id: `${Date.now()}`,
    imageUrl: document.getElementById("image__url").value,
    taskTitle: document.getElementById("task__title").value,
    taskType: document.getElementById("task__type").value,
    taskDescription: document.getElementById("task__description").value
  };
  const newCard = `
      <div class="col-sm-12 col-md-6 col-lg-4 mt-4 mb-4 h-100" id=${taskData.id}>
        <div class="card shadow">
          <div class="card-header d-flex justify-content-end gap-2">
            <button type="button" class="btn btn-success"><i class="fas fa-pencil-alt"></i></button>
            <button type="button" class="btn btn-danger"><i class="fas fa-trash-alt"></i></button>
          </div>
          <div class="card-body">
            <img src="${taskData.imageUrl}" class="card-img-top" alt="task_image">
            <h5 class="card-title mt-3 fw-bold text-warning">${taskData.taskTitle}</h5>
            <p class="card-text text-primary">${taskData.taskType}</p>
            <p class="card-text">${taskData.taskDescription}</p>
          </div>
        </div>
      </div>
    `

    taskContainer.insertAdjacentHTML("beforeend", newCard);
};
