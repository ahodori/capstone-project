class PagesController < ApplicationController
    def show
        page = Page.find_by(id: params[:id])
        if page
            render json: page
        else
            render json: { error: "Page not found" }, status: 404
        end
    end
end
