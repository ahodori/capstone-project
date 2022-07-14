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

    def destroy
        page = Page.find_by(id: params[:id])
        if page
            other_pages = page.wikiblog.pages.where("id != ?", params[:id])
            return render json: { error: "Cannot delete a page when it is the only remaining page in a Wikiblog"}, status: 422 if other_pages.empty?

            other_pages.first.update(is_index: true)
            page.destroy
            render json: { message: "Successfully deleted page"}, ok: true
        else
            render json: { error: "Page not found" }, status: 404
        end
    end

    def update
        page = Page.find_by(id: params[:id])
        if page
            page.update(title: params[:title])
            if page.valid?
                render json: page
            else
                render json: { errors: page.errors.full_messages }, status: 422
            end
        else
            render json: { error: "Page not found" }, status: 404
        end
    end

    private

    def page_params
        params.permit(:title, :wikiblog_id)
    end
end
