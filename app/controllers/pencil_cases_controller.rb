class PencilCasesController < ApplicationController
  before_action :authenticate_user!

  def index
    @q = PencilCase.ransack(params[:q])
    @pencil_cases = @q.result
      .order(created_at: :desc)
      .includes(:user, image_attachment: :blob,
                pencil_case_items: { item: [ :brand, :category ] })

    @brands     = Brand.order(:name).pluck(:name)
    @categories = Category.order(:name).pluck(:name)
  end

  def show
  end

  def new
    @pencil_case = current_user.pencil_cases.build
    @pencil_case.pencil_case_items.build
    @categories = Category.all
  end

  def create
    @pencil_case = current_user.pencil_cases.build(pencil_case_params)

    create_items

    if @pencil_case.save
      flash[:notice] = "筆箱を投稿しました。"
      redirect_to pencil_cases_path
    else
      flash.now[:alert] = "投稿に失敗しました。入力内容を確認してください。"
      load_form_data
      render :new, status: :unprocessable_entity
    end
  end

  private

  def pencil_case_params
    params.require(:pencil_case).permit(
      :title,
      :concept,
      :image,
      pencil_case_items_attributes: [
        :id,
        :item_id,
        :new_item_name,
        :new_brand_name,
        :new_category_id,
        :_destroy
      ]
    )
  end

  def load_form_data
    @brands     = Brand.order(:name).pluck(:name)
    @categories = Category.order(:name).all
    @item_names = Item.order(:name).pluck(:name)
  end

  def create_items
    @pencil_case.pencil_case_items.each do |pencil_case_item|
      next if pencil_case_item.item_id.present?

      brand = Brand.find_or_create_by!(
        name: pencil_case_item.new_brand_name.presence || "その他"
      )

      category =
        if pencil_case_item.new_category_id.present?
          Category.find(pencil_case_item.new_category_id)
        else
          Category.find_or_create_by!(name: "その他")
        end

      item = Item.find_or_create_by!(
        name: pencil_case_item.new_item_name,
        brand: brand,
        category: category
      )
      pencil_case_item.item = item
    end
  end
end
