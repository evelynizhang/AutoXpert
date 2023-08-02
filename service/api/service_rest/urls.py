from django.urls import path
from .views import api_list_technicians, api_show_technician, api_list_appointments, api_show_appointment, api_list_automobilesVO, api_status_canceled, api_status_finished, api_list_isFavorite, api_isFavorite_true, api_isFavorite_false


urlpatterns = [
    path("technicians/", api_list_technicians, name="api_list_technicians"),
    path("technicians/<int:pk>/", api_show_technician, name="api_show_technician"),
    path("appointments/", api_list_appointments, name="api_list_appointments"),
    path("appointments/<int:pk>/", api_show_appointment, name="api_show_appointment"),
    path("automobiles/", api_list_automobilesVO, name="api_list_automobilesVO"),
    path("appointments/<int:pk>/cancel/", api_status_canceled, name="api_status_canceled"),
    path("appointments/<int:pk>/finish/", api_status_finished, name="api_status_finished"),
    path("technicians/favorite/", api_list_isFavorite, name="api_list_isFavorite"),
    path("technicians/<int:pk>/favorite/", api_isFavorite_true, name="api_isFavorite_true"),
    path("technicians/<int:pk>/nofavorite/", api_isFavorite_false, name="api_isFavorite_false")

]
