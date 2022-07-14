class PagesController < ApplicationController
    def show
        page = Page.find_by(id: params[:id])
        if page
            render json: page
        else
            render json: { error: "Page not found" }, status: 404
        end
    end

    def create
        page = Page.create(page_params)
        if page.valid?
            pageversion = PageVersion.create(text: "Your page here", page_id: page.id, user_id: current_user.id)
            render json: page
        else
            render json: { errors: page.errors.full_messages }, status: 422
        end
    end

    private

    def page_params
        params.permit(:title, :wikiblog_id)
    end
end
