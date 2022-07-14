class WikiblogsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :not_found

    def index
        wikiblogs = Wikiblog.all
        render json: wikiblogs
    end

    def show
        wikiblog = Wikiblog.find_by(id: params[:id])
        if wikiblog
            render json: wikiblog, serializer: SingleWikiblogSerializer
        else
            render json: { error: "Wikiblog not found" }, status: 404
        end
    end

    def create
        return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id

        wikiblog = Wikiblog.create(wikiblog_params)
        if wikiblog.valid?
            page = Page.create(title: "My first page", wikiblog_id: wikiblog.id)
            pageversion = PageVersion.create(text: "Example text!", page_id: page.id, user_id: params[:user_id])
            render json: wikiblog
        else
            render json: { errors: wikiblog.errors.full_messages }, status: 422
        end
    end

    def destroy
        return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id

        wikiblog = Wikiblog.find_by(id: params[:id])
        return render json: { error: "Wikiblog not found" }, status: 404 unless wikiblog
        return render json: { error: "Not authorized" }, status: :unauthorized unless wikiblog.user_id == session[:user_id]

        wikiblog.destroy
        head :no_content
    end

    private

    def wikiblog_params
        params.permit(:name, :user_id)
    end

    def not_found
        render json: { error: "Wikiblog not found" }, status: 404
    end
end
