import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [
    "input",
    "brand",
    "category",
    "indicator"
  ]

  connect() {
    this.element.addEventListener(
      "item-status:check",
      this.#handleCheck
    )
  }

  disconnect() {
    this.element.removeEventListener(
      "item-status:check",
      this.#handleCheck
    )
  }

  #handleCheck = () => {
    this.check()
  }

  check() {
    const isComplete =
      this.inputTarget.value.trim() !== "" &&
      this.brandTarget.value.trim() !== "" &&
      this.categoryTarget.value !== ""

    if (isComplete) {
      this.indicatorTarget.textContent = "✓"
      this.indicatorTarget.classList.add(
        "bg-black",
        "text-white"
      )
    } else {
      this.indicatorTarget.textContent = ""
      this.indicatorTarget.classList.remove(
        "bg-black",
        "text-white"
      )
    }
  }
}
