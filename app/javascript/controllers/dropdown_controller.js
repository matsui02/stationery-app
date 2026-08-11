import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["menu"]

  connect() {
    document.addEventListener('click', this.handleOutsideClick)
  }

  open(event) {
    event.stopPropagation()
    this.menuTarget.classList.toggle('hidden');
  }

  handleOutsideClick = (event) => {
    if (!this.menuTarget.contains(event.target)) {
      this.menuTarget.classList.add('hidden');
    }
  }
}
