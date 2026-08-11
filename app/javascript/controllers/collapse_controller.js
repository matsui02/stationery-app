import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["content", "icon"]

  toggle() {
    const isHidden = this.contentTarget.classList.contains('hidden')

    if (isHidden) {
      this.contentTarget.classList.remove('hidden')
      this.iconTarget.style.transform = 'rotate(180deg)'
    } else {
      this.contentTarget.classList.add('hidden')
      this.iconTarget.style.transform = 'rotate(0deg)'
    }
  }
}
