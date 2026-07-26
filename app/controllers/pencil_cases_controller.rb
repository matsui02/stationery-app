class PencilCasesController < ApplicationController
  before_action :authenticate_user!

  def index
  end

  def show
  end

  def new
    @pencil_case = PencilCase.new
    @pencil_case.pencil_case_items.build

    @brands     = Brand.order(:name).pluck(:name)
    @categories = Category.order(:name).all
    @item_names = Item.order(:name).pluck(:name)
  end

  def create
    @pencil_case = current_user.pencil_cases.build(pencil_case_params)

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
        :_destroy
      ]
    )
  end

  def load_form_data
    @brands     = Brand.order(:name).pluck(:name)
    @categories = Category.order(:name).all
    @item_names = Item.order(:name).pluck(:name)
  end

  def edit
  end

  def update
  end

  def destroy
  end
end
