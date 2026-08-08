import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [
    "input",
    "openIcon",
    "closedIcon"
  ]

  toggle() {
    this.openIconTarget.classList.toggle('hidden');
    this.closedIconTarget.classList.toggle('hidden');
  }

  open() {
    if (this.openIconTarget.classList.contains("hidden")) {
      this.inputTarget.firstElementChild.type = 'text'
    } else {
      this.inputTarget.firstElementChild.type = 'password'
    }
  }
}
