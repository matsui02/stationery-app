import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["panel"]

  toggle() {
    this.panelTarget.classList.toggle('hidden')
  }

  // ドロワーの外側クリックで閉じる
  connect() {
    this._clickOutside = (e) => {
      if (!this.element.contains(e.target)) {
        this.panelTarget.classList.add('hidden')
      }
    }
    document.addEventListener('click', this._clickOutside)
  }

  disconnect() {
    document.removeEventListener('click', this._clickOutside)
  }
}
