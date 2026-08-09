require "test_helper"

class PencilCasesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pencil_cases_index_url
    assert_response :success
  end

  test "should get show" do
    get pencil_cases_show_url
    assert_response :success
  end

  test "should get new" do
    get pencil_cases_new_url
    assert_response :success
  end

  test "should get create" do
    get pencil_cases_create_url
    assert_response :success
  end

  test "should get edit" do
    get pencil_cases_edit_url
    assert_response :success
  end

  test "should get update" do
    get pencil_cases_update_url
    assert_response :success
  end

  test "should get destroy" do
    get pencil_cases_destroy_url
    assert_response :success
  end
end
