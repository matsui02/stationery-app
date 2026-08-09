import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["input", "message"]

  connect() {
    this.update()
  }

  update() {
    const length = this.inputTarget.value.length

    if (length >= 8) {
      this.messageTarget.textContent = "✓ 8文字以上"
      this.messageTarget.classList.remove("text-gray-500", "text-red-500")
      this.messageTarget.classList.add("text-green-600")
    } else {
      this.messageTarget.textContent = `${length} / 8文字`
      this.messageTarget.classList.remove("text-green-600")
      this.messageTarget.classList.add("text-gray-500")
    }
  }
}
