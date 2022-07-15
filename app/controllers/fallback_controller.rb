class FallbackController < ApplicationController
    def index
        redirect_back
      end
end
