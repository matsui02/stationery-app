import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["tab", "panel"]

  static values = {
    activeTab: String
  }

  connect() {
    const LOGIN_TAB_INDEX = 1
    const SIGNUP_TAB_INDEX = 0

    const tab = new URLSearchParams(window.location.search).get("tab")

    if (this.activeTabValue === "login" || tab === "login") {
      this.showTab(LOGIN_TAB_INDEX)
    } else {
      this.showTab(SIGNUP_TAB_INDEX)
    }
  }

  switch(event) {
    const index = this.tabTargets.indexOf(event.currentTarget)

    this.showTab(index)

    const tab = index === 0 ? "signup" : "login"

    const url = new URL(window.location)
    url.searchParams.set("tab", tab)

    history.pushState(null, "", url)
  }

  showTab(index) {
    this.tabTargets.forEach((tab, i) => {
      tab.classList.toggle("text-black",         i === index)
      tab.classList.toggle("border-b-2",         i === index)
      tab.classList.toggle("border-black",       i === index)
      tab.classList.toggle("text-gray-500",      i !== index)
      tab.classList.toggle("border-transparent", i !== index)
    })
    this.panelTargets.forEach((panel, i) => {
      panel.classList.toggle("hidden", i !== index)
    })
  }
}
