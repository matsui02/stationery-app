import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["tab", "panel"]
  static values  = { default: { type: Number, default: 0 } }

  connect() {
    this.showTab(this.defaultValue)
  }

  switch(event) {
    const index = this.tabTargets.indexOf(event.currentTarget)
    this.showTab(index)
  }

  showTab(index) {
    this.tabTargets.forEach((tab, i) => {
      // border の切り替え
      tab.classList.toggle("border-black",       i === index)
      tab.classList.toggle("border-transparent", i !== index)
      // 文字色の切り替え
      tab.classList.toggle("text-black",   i === index)
      tab.classList.toggle("text-gray-500", i !== index)
    })
    this.panelTargets.forEach((panel, i) => {
      panel.classList.toggle("hidden", i !== index)
    })
  }
}
