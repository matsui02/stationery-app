import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['tab', 'panel']
  static values = { default: { type: Number, default: 0 } }

  connect() {
    // URLパラメータの tab を確認する
    const params = new URLSearchParams(window.location.search)
    const tab = params.get('tab')

    if (tab === 'login') {
      this.showTab(1)
    } else if (tab === 'signup') {
      this.showTab(0)
    } else {
      // URLパラメータがない場合は defaultValue を使う
      this.showTab(this.defaultValue)
    }
  }

  switch(event) {
    const index = this.tabTargets.indexOf(event.currentTarget)
    this.showTab(index)
  }

  showTab(index) {
    this.tabTargets.forEach((tab, i) => {
      tab.classList.toggle('text-black', i === index)
      tab.classList.toggle('border-b-2', i === index)
      tab.classList.toggle('border-black', i === index)
      tab.classList.toggle('text-gray-500', i !== index)
      tab.classList.toggle('border-transparent', i !== index)
    })
    this.panelTargets.forEach((panel, i) => {
      panel.classList.toggle('hidden', i !== index)
    })
  }
}
