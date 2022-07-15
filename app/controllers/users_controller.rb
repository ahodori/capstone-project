class UsersController < ApplicationController
    def show
        user = User.find_by(id: params[:id])
        if user
            render json: user, status: :ok, serializer: UserPageSerializer
        else
            render json: { error: "User not found" }, status: 404
        end
    end

    def show_session
        return render json: { error: "Not logged in" }, status: 401 unless session.include? :user_id
        
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
            render json: { error: "Signup error. Please try again" }, status: :unprocessable_entity
        end
    end

    def index
        search = params[:search]
        puts search
        if search
            users = User.all.where("username LIKE :prefix", prefix: "#{search}%").limit(3)
            render json: users
        else
            render json: { error: "No filtering string 'search' provided"}, status: 422
        end
    end

    private

    def user_params
        params.permit(:username, :password, :password_confirmation)
    end

    def search_params
        params.permit(:search)
    end
end
