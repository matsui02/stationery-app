import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [
    "input",
    "suggestions",
    "brandInput",
    "categorySelect",
    "itemIdInput"
  ]

  static values = {
    categories: String
  }

  async search() {
    const query = this.inputTarget.value.trim()
    if (query.length < 1) {
      this.hideSuggestions()
      return
    }
    const response = await fetch(`/api/items/search?q=${encodeURIComponent(query)}`)
    const items    = await response.json()
    this.showSuggestions(items, query)
  }

  showSuggestions(items, query) {
    const existingItems = items.map(item => `
      <div class="suggestion-row px-3 py-2 hover:bg-gray-50
                  border-b border-gray-100 last:border-none
                  flex items-center justify-between gap-2">
        <div class="flex-1 cursor-pointer"
             data-item-id="${item.id}"
             data-item-name="${item.name}"
             data-brand-name="${item.brand_name || ''}"
             data-category-id="${item.category_id || ''}"
             data-category-name="${item.category_name || ''}"
             data-action="click->item-search#select">
          <p class="text-xs font-medium text-gray-800">${item.name}</p>
          <p class="text-xs text-gray-400 mt-0.5">
            ${item.brand_name || ''}
            ${item.category_name ? '· ' + item.category_name : ''}
          </p>
        </div>
        <button type="button"
                data-item-id="${item.id}"
                data-action="click->item-search#deleteItem"
                class="flex-shrink-0 text-gray-300 hover:text-red-400
                       transition-colors duration-150 text-sm px-1">
          ✕
        </button>
      </div>
    `).join('')

    const emptyMessage = items.length === 0 ? `
      <div class="px-3 py-2 text-xs text-gray-400 border-b border-gray-100">
        「${query}」に一致するアイテムが見つかりませんでした
      </div>
    ` : ''

    const createOption = `
      <div class="px-3 py-2 cursor-pointer hover:bg-gray-50
                  flex items-center gap-2 border-t border-gray-100"
           data-query="${query}"
           data-action="click->item-search#showCreateForm">
        <span class="text-xs text-gray-400">+</span>
        <p class="text-xs text-gray-600">
          "<span class="font-medium text-black">${query}</span>"
          を新規追加
        </p>
      </div>
    `

    this.suggestionsTarget.innerHTML = emptyMessage + existingItems + createOption
    this.suggestionsTarget.classList.remove('hidden')
  }

  select(event) {
    const el = event.currentTarget
    this.inputTarget.value = el.dataset.itemName
    if (this.hasBrandInputTarget) {
      this.brandInputTarget.value = el.dataset.brandName
    }
    if (this.hasCategorySelectTarget && el.dataset.categoryId) {
      this.categorySelectTarget.value = el.dataset.categoryId
    }
    if (this.hasItemIdInputTarget) {
      this.itemIdInputTarget.value = el.dataset.itemId
    }
    this.hideSuggestions()
    this.dispatch("selected")
      this.brandInputTarget.dispatchEvent(
      new Event("input", { bubbles: true })
    )

    this.categorySelectTarget.dispatchEvent(
      new Event("change", { bubbles: true })
    )
  }

  showCreateForm(event) {
    event.stopPropagation()
    const query = event.currentTarget.dataset.query

    this.suggestionsTarget.innerHTML = `
      <div class="p-3 space-y-2"
           data-action="click->item-search#stopPropagation">
        <p class="text-xs font-medium text-gray-600 mb-2">
          新しいアイテムを登録
        </p>
        <input type="text"
               id="new-item-name"
               value="${query}"
               placeholder="商品名"
               class="w-full h-8 border border-gray-200 rounded px-3
                      text-xs text-gray-900 focus:border-gray-400
                      focus:outline-none">
        <input type="text"
               id="new-item-brand"
               placeholder="ブランド名"
               class="w-full h-8 border border-gray-200 rounded px-3
                      text-xs text-gray-900 focus:border-gray-400
                      focus:outline-none">
        <select id="new-item-category"
                class="w-full h-8 border border-gray-200 rounded px-2
                       text-xs text-gray-900 bg-white
                       focus:border-gray-400 focus:outline-none">
          <option value="">カテゴリを選択</option>
          ${this.categoriesValue}
        </select>
        <button type="button"
                data-action="click->item-search#saveNewItem"
                class="w-full h-8 bg-black text-white text-xs
                       rounded tracking-wide hover:bg-gray-800
                       transition-colors duration-150">
          保存して追加
        </button>
        <button type="button"
                data-action="click->item-search#hideSuggestions"
                class="w-full h-8 border border-gray-200 text-gray-500
                       text-xs rounded hover:border-gray-400
                       transition-colors duration-150">
          キャンセル
        </button>
      </div>
    `
    this.suggestionsTarget.classList.remove('hidden')
  }

  stopPropagation(event) {
    event.stopPropagation()
  }

  async saveNewItem() {
    const name       = document.getElementById('new-item-name')?.value.trim()
    const brandName  = document.getElementById('new-item-brand')?.value.trim()
    const categoryId = document.getElementById('new-item-category')?.value

    if (!name) {
      alert('商品名を入力してください')
      return
    }

    const response = await fetch('/api/items', {
      method:  'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
      },
      body: JSON.stringify({ name, brand_name: brandName, category_id: categoryId })
    })

    const item = await response.json()

    if (item.error) {
      alert(item.error)
      return
    }

    this.inputTarget.value = item.name
    if (this.hasBrandInputTarget)  this.brandInputTarget.value  = item.brand_name || ''
    if (this.hasCategorySelectTarget && item.category_id) {
      this.categorySelectTarget.value = item.category_id
    }
    if (this.hasItemIdInputTarget) this.itemIdInputTarget.value = item.id

    this.hideSuggestions()
  }

  async deleteItem(event) {
    event.stopPropagation()

    const itemId = event.currentTarget.dataset.itemId
    if (!confirm('このアイテムをリストから削除しますか？')) return

    const response = await fetch(`/api/items/${itemId}`, {
      method:  'DELETE',
      headers: {
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
      }
    })

    const result = await response.json()

    if (!response.ok) {
      alert(result.error || '削除できませんでした')
      return
    }

      event.currentTarget.closest('.suggestion-row')?.remove()
  }

  hideSuggestions() {
    this.suggestionsTarget.classList.add('hidden')
    this.suggestionsTarget.innerHTML = ''
  }

  connect() {
    this._clickOutside = (e) => {
      if (!this.element.contains(e.target)) this.hideSuggestions()
    }
    document.addEventListener('click', this._clickOutside)
  }

  disconnect() {
    document.removeEventListener('click', this._clickOutside)
  }
}
