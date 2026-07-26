// app/javascript/controllers/item_status_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["input", "indicator"]

  update() {
    const value = this.inputTarget.value.trim()

    if (value.length > 0) {
      // 入力あり → 緑色に変化
      this.indicatorTarget.classList.remove(
        "border-gray-300", "bg-white"
      )
      this.indicatorTarget.classList.add(
        "border-green-500", "bg-green-500", "scale-110"
      )
    } else {
      // 入力なし → グレーに戻す
      this.indicatorTarget.classList.remove(
        "border-green-500", "bg-green-500", "scale-110"
      )
      this.indicatorTarget.classList.add(
        "border-gray-300", "bg-white"
      )
    }
  }
}
