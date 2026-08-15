import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [
    "input",
    "count"
  ]

  static values = {
    max: Number
  }

  update() {
    const current = this.inputTarget.value.length

    this.countTarget.textContent =
      `${current} / ${this.maxValue}文字`

    this.countTarget.classList.remove(
      "text-red-500",
      "text-green-600"
    )

    if (current === 0) {
      return
    } else if (current > this.maxValue) {
      this.countTarget.classList.add("text-red-500")
    } else {
      this.countTarget.classList.add("text-green-600")
    }
  }
}
