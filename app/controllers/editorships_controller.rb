class EditorshipsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :not_found

    def create
        if session.include? :user_id
            wikiblog = Wikiblog.find_by(id: params[:wikiblog_id])

            return render json: { error: "Wikiblog not found" }, status: 404 unless wikiblog

            if wikiblog.user_id == session[:user_id]
                editorship = Editorship.create(editorship_params)
                if editorship.valid?
                    return render json: editorship
                else
                    return render json: { errors: editorship.errors.full_messages }, status: 422
                end   
            end         
        end

        return render json: { error: "Not authorized" }, status: :unauthorized 
    end

    def destroy
        editorship = Editorship.find_by(id: params[:id])
        return render json: { error: "Editorship not found" }, status: 404 unless editorship
        
        return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
        return render json: { error: "Not authorized" }, status: :unauthorized unless editorship.wikiblog.user_id = session[:user_id]

        editorship.destroy
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
