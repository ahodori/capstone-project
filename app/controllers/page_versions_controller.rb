class PageVersionsController < ApplicationController
    def create
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
