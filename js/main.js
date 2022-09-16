const getMileston = () => {
  const url = 'http://openapi.programming-hero.com/api/course/curriculum'
  fetch(url)
    .then(res => res.json())
    .then(data => displayMileston(data.data))
}

const displayMileston = (milestonData) => {
  // console.log(milestonData);
  const milestonContainer = document.querySelector('.milestones')

  milestonContainer.innerHTML = `
    ${milestonData.map(function (milestone){
    return `
        <div class="milestone border-b">
        <div class="flex">
          <div class="checkbox"><input type="checkbox" /></div>
          <div>
            <p>
              ${milestone.name}
              <span><i class="fas fa-chevron-down"></i></span>
            </p>
          </div>
        </div>

        <div class="hidden_panel">
          <div class="module border-b">
            <p>Module Name</p>
          </div>
        </div>
      </div>
    `;

  }).join("")}
  
  `



}

displayMileston()