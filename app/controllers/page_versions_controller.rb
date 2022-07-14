class PageVersionsController < ApplicationController
    def create
        return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id

        page = Page.find_by(id: params[:page_id])
        return render json: { error: "Page not found" }, status: 404 unless page
        return render json: { error: "Not authorized" }, status: :unauthorized unless page.wikiblog.editorships.find_by("user_id = ?", session[:user_id])

        page_version = PageVersion.create(page_version_params)
        if page_version.valid?
            render json: page_version
        else
            render json: { errors: page_version.errors.full_messages }, status: 422
        end
    end

    private

    def page_version_params
        params.permit(:user_id, :page_id, :text)
    end
end
