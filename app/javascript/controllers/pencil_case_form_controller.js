import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  addItem() {
    const template = document.getElementById("item-template")
    if (!template) {
      console.error("item-template が見つかりません")
      return
    }

    const index   = Date.now()
    const html    = template.innerHTML.replace(/NEW_INDEX/g, index)
    const wrapper = document.createElement("div")
    wrapper.innerHTML = html

    const container = document.getElementById("pencil-case-items")
    container.appendChild(wrapper.firstElementChild)

    // 追加した要素にStimulusを適用
    // （Turboが有効な場合は自動で適用される）
  }
}
