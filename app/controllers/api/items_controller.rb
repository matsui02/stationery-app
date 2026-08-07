class Api::ItemsController < ApplicationController
  def search
    query = params[:q].to_s.strip
    return render json: [] if query.blank?

    items = Item.includes(:brand, :category)
                .where("items.name ILIKE ?", "%#{query}%")
                .limit(10)
                .map do |item|
                  {
                    id:            item.id,
                    name:          item.name,
                    brand_name:    item.brand&.name,
                    category_id:   item.category_id,
                    category_name: item.category&.name,
                  }
                end

    render json: items
  end

  def create
    brand = Brand.find_or_create_by!(
      name: params[:brand_name].presence || "その他"
    )

    category = if params[:category_id].present?
      Category.find(params[:category_id])
    else
      Category.find_or_create_by!(name: "その他")
    end

    item = Item.find_or_create_by!(
      name:     params[:name],
      brand:    brand,
      category: category
    )

    render json: {
      id:            item.id,
      name:          item.name,
      brand_name:    item.brand&.name,
      category_id:   item.category_id,
      category_name: item.category&.name,
    }

  rescue ActiveRecord::RecordInvalid => e
    render json: { error: e.message }, status: :unprocessable_entity
  end

  def destroy
    item = Item.find(params[:id])

    if item.pencil_case_items.exists?
      render json: { error: "他の投稿で使用中のため削除できません" },
             status: :unprocessable_entity
      return
    end

    item.destroy
    render json: { success: true }
  rescue ActiveRecord::RecordNotFound
    render json: { error: "アイテムが見つかりませんでした" },
           status: :not_found
  end
end
