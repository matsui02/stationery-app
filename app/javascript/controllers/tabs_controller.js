import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['tab', 'panel']

  connect() {
    const params = new URLSearchParams(window.location.search)
    const tab = params.get('tab')

    if (tab === 'login') {
      this.showTab(1)
    } else {
      this.showTab(0)
    }
  }

  switch(event) {
    this.showTab(Number(event.currentTarget.dataset.index))
  }

  showTab(index) {
    this.tabTargets.forEach((tab, i) => {
      if (i === index) {
        tab.classList.add('border-black', 'text-black')
        tab.classList.remove('border-transparent', 'text-gray-500')
      } else {
        tab.classList.remove('border-black', 'text-black')
        tab.classList.add('border-transparent', 'text-gray-500')
      }
    })

    this.panelTargets.forEach((panel, i) => {
      panel.classList.toggle('hidden', i !== index)
    })
  }
}
