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
    const milestonItem = milstoneData.modules

    div.innerHTML = `
        <div class="milestone border-b">
        <div class="flex">
          <div class="checkbox"><input type="checkbox" /></div>
          <div onclick="openMilstion(this)">
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

const openMilstion = (milstonEliment) => {
  const currentPanel = milstonEliment.parentNode.nextElementSibling;
  const shownPanel = document.querySelector('.show')

  if (!currentPanel.classList.contains("show") && shownPanel) {
    shownPanel.classList.remove('show');
  }

  currentPanel.classList.toggle("show")
}

displayMilestone()