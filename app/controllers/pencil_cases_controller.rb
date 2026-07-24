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
  end

  def edit
  end

  def update
  end

  def destroy
  end
end
