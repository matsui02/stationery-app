import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["input", "message"]

  update() {
    const value  = this.inputTarget.value
    const length = value.length
    const min    = 8

    if (length === 0) {
      this.setMessage(`0 / ${min}文字`, "#9ca3af")
    } else if (length < min) {
      this.setMessage(`${length} / ${min}文字`, "#ef4444")
    } else {
      this.setMessage(`✓ ${min}文字以上`, "#16a34a")
    }
  }

  setMessage(text, color) {
    this.messageTarget.textContent = text
    this.messageTarget.style.color = color
  }
}
