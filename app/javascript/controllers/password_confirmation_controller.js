import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["password", "confirmation", "message"]

  check() {
    const password     = this.passwordTarget.value
    const confirmation = this.confirmationTarget.value

    if (confirmation === "") {
      this.setMessage("", "#9ca3af")
    } else if (password === confirmation) {
      this.setMessage("✓ パスワードが一致しています", "#16a34a")
    } else {
      this.setMessage("パスワードが一致していません", "#ef4444")
    }
  }

  setMessage(text, color) {
    this.messageTarget.textContent = text
    this.messageTarget.style.color = color
  }
}
