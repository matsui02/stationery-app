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
      this.hideMessage(event)
    })
  }

  async search() {
    const query = this.inputTarget.value.trim();

    if (query === "") {
      this.resultsTarget.classList.add("hidden");
      return;
    }

    const response = await fetch(`/api/items/search?q=${encodeURIComponent(query)}`);
    const data = await response.json();
    this.showMessage(data, query);
    this.hideMessage;
  }

  showMessage(data, query) {
    if (query === "") {
      return
    }

    this.resultsTarget.classList.remove('hidden');

    const existingItems = data.map((item) => {
      return `
        <div data-action="click->item-search#select" data-name="${item.name}" data-brand="${item.brand_name}" data-category="${item.category_name}" class="flex items-center justify-between px-2 py-2 border-b cursor-pointer">
          <div>
            <p data-name="${item.name}" class="text-[14px] text-gray-500">${item.name}</p>
            <p class="text-[12px] text-gray-500">${item.brand_name}・${item.category_name}</p>
          </div>
          <span data-item-id="${item.id}" data-action="click->item-search#deleteItem" class="text-[20px] text-gray-500 hover:text-red-500 transition-colors duration-150 cursor-pointer">×</span>
        </div>
      `;
    }).join("");

    const emptyMessage = query !== "" && data.length === 0 ? `
    <div class="text-sm text-gray-500">
      「${query}」に一致する商品がありませんでした。
    </div>`
    : "";

    const createOption = () => {
      if (query === "") {
        return "";
      }

      return `<div data-action="click->item-search#showCreateForm" class="px-3 py-2 cursor-pointer hover:bg-gray-50 flex items-center gap-2 border-t border-gray-100"
        data-query="${query}">
        <span class="text-xs text-gray-400">+</span>
        <p class="text-xs text-gray-600">"<span class="font-medium text-black">${query}</span>"を新規追加</p>
      </div> `
    }

   this.resultsTarget.innerHTML = emptyMessage + existingItems + createOption()
  }

  hideMessage(event) {
    if (!this.resultsTarget.contains(event.target)) {
      this.resultsTarget.classList.add('hidden');
    }
  }

  hideResults() {
    this.resultsTarget.classList.add("hidden");
  }

  select(event) {
    this.inputTarget.value = event.currentTarget.dataset.name
    this.brandTarget.value = event.currentTarget.dataset.brand
    this.categoryTarget.value = event.currentTarget.dataset.category

    this.hideResults()
  }

  showCreateForm(event) {
    event.stopPropagation()
    const query = event.currentTarget.dataset.query

    this.resultsTarget.innerHTML = `
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
                data-action="click->item-search#hideResults"
                class="w-full h-8 border border-gray-200 text-gray-500
                       text-xs rounded hover:border-gray-400
                       transition-colors duration-150">
          キャンセル
        </button>
      </div>
    `
  }

  async saveNewItem() {
    const name = document.getElementById("new-item-name").value;
    const brandName = document.getElementById("new-item-brand").value;
    const categoryId = document.getElementById("new-item-category").value;
    const csrfToken = document.querySelector(
    'meta[name="csrf-token"]'
    ).content;

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
      this.showFlash(data.message, "success");
    }

    this.hideResults();
  }

  showFlash(message, type = "success") {
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

    const csrfToken = document.querySelector(
    'meta[name="csrf-token"]'
    ).content;

    const response = await fetch(`/api/items/${itemId}`, {
      method: "DELETE",
      headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": csrfToken
      }
    });

    const data = await response.json();

    if (response.ok) {
      this.inputTarget.value = "";
      this.brandTarget.value = "";
      this.categoryTarget.value = "";
      this.showFlash(data.message, "message");
    } else {
      this.showFlash(data.error, "error")
    }

    this.hideResults();
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
}
