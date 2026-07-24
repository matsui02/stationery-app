class TopController < ApplicationController
  def index
    @pencil_case_ranking = PencilCase
      .order(created_at: :desc)
      .limit(5)
      .includes(:user)
  end
end
