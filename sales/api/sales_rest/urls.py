from .views import api_salespeople, api_salesperson, api_list_customers, api_detail_customer, api_list_sales, api_detail_sale
from django.urls import path


urlpatterns = [
    path("salespeople/", api_salespeople, name="api_salespeople"),
    path("salespeople/<int:id>/", api_salesperson, name="api_delete_salesperson"),
    path("customers/", api_list_customers, name="api_list_customers"),
    path("customers/<int:id>/", api_detail_customer, name="api_detail_customer"),
    path("sales/", api_list_sales, name="api_list_sales"),
    path("sales/<int:id>/", api_detail_sale, name="api_detail_sale"),

]
