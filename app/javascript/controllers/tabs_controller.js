import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["tab"]

  switch(event) {
    const index = event.currentTarget.dataset.index

    this.tabTargets.forEach((tab, i) => {
      if (i == index) {
        tab.classList.add("border-black", "text-black")
        tab.classList.remove("border-transparent", "text-gray-500")
      } else {
        tab.classList.remove("border-black", "text-black")
        tab.classList.add("border-transparent", "text-gray-500")
      }
    })

    this.panelTargets.forEach((panel, i) => {
      panel.classList.toggle("hidden", i != index)
    })
  }
}
