import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["container", "template"]

  addItem() {
    const index = Date.now()
    const template = this.templateTarget.content.firstElementChild
    const newElement = template.cloneNode(true)

    newElement.querySelectorAll("[name]").forEach((element) => {
      element.name = element.name.replace(/NEW_RECORD/g, index)
    })

    this.containerTarget.appendChild(newElement)
  }
}
