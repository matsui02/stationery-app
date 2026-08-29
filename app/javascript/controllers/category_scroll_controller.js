import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["tab", "item", "emptyMessage"]

  select(event) {
    const category = event.currentTarget.dataset.category

    this.tabTargets.forEach((tab) => {
      const active = tab.dataset.category === category

      tab.classList.toggle("bg-black", active)
      tab.classList.toggle("text-white", active)

      tab.classList.toggle("bg-gray-100", !active)
      tab.classList.toggle("text-gray-600", !active)
    })

    let visibleCount = 0

    this.itemTargets.forEach((item) => {
      const show =
        category === "all" ||
        item.dataset.category === category

        item.classList.toggle("hidden", !show)

      if (show) {
        visibleCount++
      }
    })

    this.emptyMessageTarget.classList.toggle(
      "hidden",
      visibleCount > 0
    )
  }
}
