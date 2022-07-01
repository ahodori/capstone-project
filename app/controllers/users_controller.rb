class UsersController < ApplicationController
    def show
        user = User.find_by(id: params[:id])
        if user
            render json: user, status: :ok
        else
            render json: { error: "User not found" }, status: 404
        end
    end

    def show_session
        render json: { error: "Not logged in" }, status: 401 unless session.include? :user_id
        
        user = User.find_by(id: session[:user_id])
        if user
            render json: user, status: :ok
        else
            render json: { error: "User not found" }, status: 404
        end
    end

    def create
        user = User.create(user_params)
        if user.valid?
            render json: user, status: :created
        else
            render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
    end

    private

    def user_params
        params.permit(:username, :password, :password_confirmation)
    end
end
