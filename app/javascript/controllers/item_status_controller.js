import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [
    "input",
    "brandInput",
    "categorySelect",
    "indicator",
    "check"
  ]

  update() {
    const itemName = this.inputTarget.value.trim()
    const brand    = this.brandInputTarget.value.trim()
    const category = this.categorySelectTarget.value.trim()

    const completed =
      itemName !== "" &&
      brand    !== "" &&
      category !== ""

    if (completed) {
      // 3項目すべて入力済み → 緑・チェックマーク表示
      this.indicatorTarget.classList.remove(
        "border-gray-300", "bg-white"
      )
      this.indicatorTarget.classList.add(
        "border-green-500", "bg-green-500", "scale-110"
      )
      if (this.hasCheckTarget) {
        this.checkTarget.classList.remove("hidden")
      }
    } else {
      // 1つでも未入力 → グレー・チェックマーク非表示
      this.indicatorTarget.classList.remove(
        "border-green-500", "bg-green-500", "scale-110"
      )
      this.indicatorTarget.classList.add(
        "border-gray-300", "bg-white"
      )
      if (this.hasCheckTarget) {
        this.checkTarget.classList.add("hidden")
      }
    }
  }
}
