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
    const current = this.inputTarget.value.length;
    this.countTarget.innerHTML = `${current} / ${this.maxValue}文字以上`

    const isValid = current >= this.maxValue

    if (isValid) {
      document.getElementById('countTarget').classList.remove('text-red-500');
      this.countTarget.classList.add('text-green-600')
    } else {
      document.getElementById('countTarget').classList.add('text-red-500')
    }
  }
}
