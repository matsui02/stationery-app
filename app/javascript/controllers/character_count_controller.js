import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["input", "count"]
  static values  = { max: Number }

  connect() {
    this.update()
  }

  update() {
    const current = this.inputTarget.value.length
    const max     = this.maxValue

    this.countTarget.textContent = `${current} / ${max}`

    // 上限に近づいたら色を変える
    if (current >= max) {
      this.countTarget.style.color = "#ef4444"      // 赤：上限超過
    } else if (current >= max * 0.8) {
      this.countTarget.style.color = "#f59e0b"      // 黄：80%以上
    } else {
      this.countTarget.style.color = "#9ca3af"      // グレー：通常
    }
  }
}
