import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = {
    message: String,
    type:    String
  }

  connect() {
    this.showToast()
  }

  showToast() {
    const isAlert = this.typeValue === "alert"

    Toastify({
      text:        this.messageValue,
      duration:    isAlert ? 4000 : 3000,
      gravity:     "top",
      position:    "center",
      stopOnFocus: true,
      style:       isAlert ? this.alertStyle() : this.noticeStyle()
    }).showToast()

    this.element.remove()
  }

  noticeStyle() {
    return {
      background:    "#111",
      color:         "#fff",
      fontSize:      "13px",
      letterSpacing: "0.05em",
      padding:       "12px 20px",
      borderRadius:  "4px",
      boxShadow:     "0 4px 12px rgba(0,0,0,0.15)"
    }
  }

  alertStyle() {
    return {
      background:    "#fff",
      color:         "#c0392b",
      fontSize:      "13px",
      letterSpacing: "0.05em",
      padding:       "12px 20px",
      borderRadius:  "4px",
      border:        "1px solid #fecaca",
      boxShadow:     "0 4px 12px rgba(0,0,0,0.08)"
    }
  }
}
