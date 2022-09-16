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
        <div class="milestone border-b" id="${milstoneData._id}">
        <div class="flex">
        <div class="checkbox">
          <input type="checkbox" onclick="markMileStone(this,${milstoneData._id})"/>
        </div>
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

function markMileStone(checkbox, id) {
  // const doneList = document.querySelector(".doneList");
  const doneList = document.getElementById("doneListContainer");
  const milestonesList = document.getElementById("milestoneContainer");
  // const milestonesList = document.querySelector(".milestones");
  const item = document.getElementById(id);

  if (checkbox.checked) {
    // mark as done
    milestonesList.removeChild(item);
    doneList.appendChild(item);
  } else {
    // back to main list
    milestonesList.appendChild(item);
    doneList.removeChild(item);
    // task - do the sorting
    // reload list
  }

}


// function markMileStone(checkBox, id) {
//   // const doneList = document.querySelector(".doneList");
  // const doneList = document.getElementById("doneListContainer");
//   const milestonesList = document.getElementById("milestoneContainer");
//   const item = document.getElementById(id)

//   if (checkBox.checked) {
//     milestonesList.removeChild(item)
//     doneList.appendChild(item)
//   } else {
//     milestonesList.appendChild(item)
//     doneList.removeChild(item)
//   }

  // const milestonesList = document.getElementById("milestoneContainer");
  // document.getElementById(id).style.display = "none";
  // const div = document.createElement('div');
  // div.classList.add("complitedMilston")
  // div.innerHTML = `
  //   <p onclick="showAgain('${id}')">${name}</p>
  // `
  // milestonesList.appendChild(div);

// }

// const showAgain = (id) => {
//   console.log(id)
//   document.getElementById(id).style.display = "block";
//   const doneList = document.querySelector(".doneList");
//   doneList.style.display = "none";
// }

displayMilestone()
