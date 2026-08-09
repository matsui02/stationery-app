import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["password", "confirmation", "message"]

  connect() {
    this.check()
  }

  check() {
    const password = this.passwordTarget.value
    const confirmation = this.confirmationTarget.value

    if (confirmation === "") {
      this.messageTarget.textContent = ""
      return
    }

    if (password === confirmation) {
      this.messageTarget.textContent = "✓ パスワードが一致しています"
      this.messageTarget.classList.remove("text-red-500")
      this.messageTarget.classList.add("text-green-600")
    } else {
      this.messageTarget.textContent = "パスワードが一致しません"
      this.messageTarget.classList.remove("text-green-600")
      this.messageTarget.classList.add("text-red-500")
    }
  }
}
