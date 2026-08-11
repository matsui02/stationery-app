import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [
    "input",
    "checkText"
  ]

  check() {
    const passwordValue = document.getElementById('password').value;
    const confirmationValue = this.inputTarget.value

    if (!confirmationValue) {
      return;
    }

    if (passwordValue === confirmationValue) {
      this.checkTextTarget.textContent = "パスワードが一致しています"
      this.checkTextTarget.classList.remove('text-red-500')
      this.checkTextTarget.classList.add('text-green-600')
    } else {
      this.checkTextTarget.classList.remove('text-green-600')
      this.checkTextTarget.classList.add('text-red-500')
      this.checkTextTarget.textContent = "パスワードが一致していません"
    }
  }
}
