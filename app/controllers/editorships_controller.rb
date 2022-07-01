class EditorshipsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :not_found

    def create
        editorship = Editorship.create(editorship_params)
        if editorship.valid?
            render json: editorship
        else
            render json: { errors: editorship.errors.full_messages }, status: 422
        end
    end

    def destroy
        editorship = Editorship.destroy(params[:id])
        head :no_content
    end

    private

    def editorship_params
        params.permit(:user_id, :wikiblog_id)
    end

    def not_found
        render json: { error: "Editorship not found" }, status: 404
    end
end
