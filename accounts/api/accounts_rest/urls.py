from .views import api_user_signup
from django.urls import path


urlpatterns = [
    path("signup/", api_user_signup, name="api_user_signup"),
]
