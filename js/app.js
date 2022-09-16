const loadMilestone = async () => {
  const url = `http://openapi.programming-hero.com/api/course/curriculum`
  const res = await fetch(url)
  const data = await res.json()
  return data.data
}

const displayMilestone = async () => {
  const data = await loadMilestone()
  // ================== Display Milestone List =================
  const milstoneContainer = document.getElementById('milestoneContainer')
  data.forEach(milstoneData => {
    const div = document.createElement('div')

    div.innerHTML = `
        <div class="milestone border-b">
        <div class="flex">
          <div class="checkbox" onclick="markMilston(this, id)"><input type="checkbox" /></div>
          <div onclick="openMilstion(this, ${milstoneData._id})">
            <p>
              ${milstoneData.name}
              <span><i class="fas fa-chevron-down"></i></span>
            </p>
          </div>
        </div>
        <div class="hidden_panel">

          ${milstoneData.modules.map(function (item) {
      return `
                <div class="module border-b">
                    <p>${item.name}</p>
                </div>
            `}).join("")}
        </div>
      </div>
    `
    // ==================== append div =================
    milstoneContainer.appendChild(div)
  });

}

const openMilstion = (milstonEliment, id) => {
  const currentPanel = milstonEliment.parentNode.nextElementSibling;
  const shownPanel = document.querySelector('.show')
  const active = document.querySelector('.active')

  if (active && !milstonEliment.classList.contains('active')) {
    active.classList.remove('active')
  }
  milstonEliment.classList.toggle('active');

  if (!currentPanel.classList.contains("show") && shownPanel) {
    shownPanel.classList.remove('show');
  }
  currentPanel.classList.toggle("show")

  showMilestone(id)
}

const showMilestone = async (id) => {
  const data = await loadMilestone()
  console.log(data)

  const milestoneImage = document.querySelector('.milestoneImage')
  milestoneImage.style.opacity = "0";
  milestoneImage.src = data[id].image

  const milstoneTitle = document.querySelector('.title')
  milstoneTitle.innerText = data[id].name

  const milstoneDetails = document.querySelector('.details')
  milstoneDetails.innerText = data[id].description
}

// listen for image load 
const milestoneImage = document.querySelector('.milestoneImage')
milestoneImage.onload = function () {
  this.style.opacity = "1";
}


const markMilston = () => {
  const doneList = document.querySelector('.doneList');
  const milstonsList = document.querySelector('.milestones');


}


displayMilestone()
