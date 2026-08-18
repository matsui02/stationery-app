import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [
    "input",
    "brand",
    "category",
    "results",
    "flash",
    "template",
  ]

  static values = {
    categories: Array
  }

  connect() {
    document.addEventListener('click', (event) => {
      this.#hideResultsWhenClickOutside(event)
    })
  }

  #hideResultsWhenClickOutside(event) {
    this.resultsTargets.forEach((results) => {
      if (!results.contains(event.target)) {
        results.classList.add("hidden")
      }
    })
  }

  #getResults(element) {
    const row = element.closest(".item-row")
    return row.querySelector('[data-item-search-target="results"]')
  }

  #hideResults(results) {
    results.classList.add("hidden")
  }

  cancelCreate(event) {
    const results = this.#getResults(event.currentTarget)
    this.#hideResults(results)
  }

  async search(event) {
    const input = event.currentTarget
    const query = input.value.trim()
    const results = this.#getResults(input)

    if (query === "") {
      results.classList.add("hidden");
      return;
    }

    const response = await fetch(`/api/items/search?q=${encodeURIComponent(query)}`);
    const data = await response.json();
    this.#showMessage(data, query, results);
  }

  #showMessage(data, query, results) {
  if (query === "") {
    return
  }

  results.classList.remove("hidden")

  const existingItems = data.map((item) => {
    return `
      <div
        data-action="click->item-search#select"
        data-name="${item.name}"
        data-brand="${item.brand_name}"
        data-category="${item.category_id}"
        class="group flex items-center justify-between
               px-3 py-2.5
               border-b border-gray-100
               cursor-pointer
               transition-colors duration-150
               hover:bg-gray-50"
      >
        <div class="min-w-0">
          <p class="text-[13px] text-gray-800 font-medium truncate">
            ${item.name}
          </p>

          <p class="mt-0.5 text-[11px] text-gray-400 truncate">
            ${item.brand_name}・${item.category_name}
          </p>
        </div>

        <span
          data-item-id="${item.id}"
          data-action="click->item-search#deleteItem"
          class="ml-3 flex-shrink-0
                 text-[18px] leading-none
                 text-gray-300
                 transition-colors duration-150
                 hover:text-black
                 cursor-pointer"
        >
          ×
        </span>
      </div>
    `
  }).join("")

  const emptyMessage = query !== "" && data.length === 0
    ? `
      <div class="px-3 py-4 text-center">
        <p class="text-xs text-gray-400">
          「${query}」に一致する商品がありませんでした。
        </p>
      </div>
    `
    : ""

  const createOption = () => {
    if (query === "") {
      return ""
    }

    return `
      <div
        data-action="click->item-search#showCreateForm"
        data-query="${query}"
        class="flex items-center gap-2
               px-3 py-2.5
               border-t border-gray-100
               cursor-pointer
               transition-colors duration-150
               hover:bg-gray-50"
      >
        <span class="text-sm text-gray-400">
          +
        </span>

        <p class="text-xs text-gray-500">
          「<span class="font-medium text-gray-900">${query}</span>」を新規追加
        </p>
      </div>
    `
  }

  results.innerHTML =
    emptyMessage +
    existingItems +
    createOption()
}

  select(event) {
    const row = event.currentTarget.closest(".item-row")

    const input = row.querySelector(
    '[data-item-search-target="input"]'
    )
    const brand = row.querySelector(
      '[data-item-search-target="brand"]'
    )
    const category = row.querySelector(
      '[data-item-search-target="category"]'
    )
    const results = row.querySelector(
      '[data-item-search-target="results"]'
    )

    input.value = event.currentTarget.dataset.name
    brand.value = event.currentTarget.dataset.brand
    category.value = event.currentTarget.dataset.category

    this.#hideResults(results)

    row.dispatchEvent(new Event("item-status:check"))
  }

  showCreateForm(event) {
    event.stopPropagation();

    const query = event.currentTarget.dataset.query
    const row = event.currentTarget.closest(".item-row")
    const results = row.querySelector(
      '[data-item-search-target="results"]'
    )

    results.innerHTML = `
      <div class="p-3 space-y-2">
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
          ${this.categoriesValue.map(category => `
            <option value="${category.id}">
              ${category.name}
            </option>
          `).join("")}
        </select>
        <button type="button"
                data-action="click->item-search#saveNewItem"
                class="w-full h-8 bg-black text-white text-xs
                       rounded tracking-wide hover:bg-gray-800
                       transition-colors duration-150">
          保存して追加
        </button>
        <button type="button"
                data-action="click->item-search#cancelCreate"
                class="w-full h-8 border border-gray-200 text-gray-500
                       text-xs rounded hover:border-gray-400
                       transition-colors duration-150">
          キャンセル
        </button>
      </div>
    `
  }

  async saveNewItem(event) {
    const row = event.currentTarget.closest(".item-row")
    const name = row.querySelector("#new-item-name").value
    const brandName = row.querySelector("#new-item-brand").value
    const categoryId = row.querySelector("#new-item-category").value
    const csrfToken = document.querySelector('meta[name="csrf-token"]').content;

    const response = await fetch("/api/items", {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": csrfToken
      },
      body: JSON.stringify({
        name: name,
        brand_name: brandName,
        category_id: categoryId
      })
    });

    const data = await response.json();

    if (response.ok) {
      this.#showFlash(data.message, "success");
    }

    const results = row.querySelector('[data-item-search-target="results"]')
    this.#hideResults(results)
  }

  #showFlash(message, type = "success") {
    this.flashTarget.textContent = message;

    this.flashTarget.classList.remove(
      "bg-black",
      "bg-red-600",
      "hidden"
    );

    if (type === "error") {
      this.flashTarget.classList.add("bg-red-500");
    } else {
      this.flashTarget.classList.add("bg-black");
    }

    setTimeout(() => {
      this.flashTarget.classList.add("hidden");
    }, 3000);
  }

  async deleteItem(event) {
    event.stopPropagation();
    const itemId = event.currentTarget.dataset.itemId
    const row = event.currentTarget.closest(".item-row")
    const input = row.querySelector('[data-item-search-target="input"]')
    const brand = row.querySelector('[data-item-search-target="brand"]')
    const category = row.querySelector('[data-item-search-target="category"]')
    const results = this.#getResults(event.currentTarget)
    const csrfToken = document.querySelector('meta[name="csrf-token"]').content;

    const response = await fetch(`/api/items/${itemId}`, {
      method: "DELETE",
      headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": csrfToken
      }
    });

    const data = await response.json();

    if (response.ok) {
      input.value = "";
      brand.value = "";
      category.value = "";
      this.#showFlash(data.message, "success");
    } else {
      this.#showFlash(data.error, "error");
    }

    this.#hideResults(results);
  }

  addItem() {
    const index = Date.now();
    const container = document.getElementById('container');
    const template = this.templateTarget.content.firstElementChild
    const newElement = template.cloneNode(true);
    newElement.querySelectorAll("[name]").forEach((element) => {
      element.name = element.name.replace(/NEW_RECORD/g, index);
    });
    container.appendChild(newElement);
  }

  removeItem(event) {
  const row = event.currentTarget.closest(".item-row")

    if (!row) {
      return
    }

    row.remove()
  }
}
