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
        wikiblog = Wikiblog.create(wikiblog_params)
        if wikiblog.valid?
            render json: wikiblog
        else
            render json: { errors: wikiblog.errors.full_messages }, status: 422
        end
    end

    def destroy
        wikiblog = Wikiblog.destroy(params[:id])
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
