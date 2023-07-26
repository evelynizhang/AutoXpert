from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from common.json import ModelEncoder
import json

from .models import AutomobileVO, Salesperson, Customer, Sale


class SalesPersonEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "id", "first_name", "last_name", "employee_id"
    ]


class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = ["id", "first_name", "last_name", "address", "phone_number"]

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["vin", "sold"]

class SaleEncoder(ModelEncoder):
    model = Sale
    properties = ["id", "automobile", "salesperson", "customer"]
    encoders = {
        "automobile" : AutomobileVOEncoder(),
        "salesperson" : SalesPersonEncoder(),
        "customer" : CustomerEncoder(),
    }
    def get_extra_data(self, o):
        return {"price": float(o.price)}


# Create your views here.
@require_http_methods(["GET", "POST"])
def api_salespeople(request):
    if request.method == "GET":
        try:
            salespeople = Salesperson.objects.all()

            return JsonResponse(
                {"salespeople": salespeople},
                encoder=SalesPersonEncoder,
                safe=False,
            )
        except Exception:
            return JsonResponse(status = 400)
    else:
        try:
            content = json.loads(request.body)
            saleperson = Salesperson.objects.create(**content)
            return JsonResponse(
                saleperson,
                encoder=SalesPersonEncoder,
                safe=False,
            )
        except TypeError:
            return JsonResponse(
                {"message": "Input Error"},
                status=400
            )

@require_http_methods(["DELETE", "GET", "PUT"])
def api_salesperson(request, id):
    if request.method == "DELETE":
        try:
            count, _ = Salesperson.objects.get(id = id).delete()
            return JsonResponse(
            {"deleted": count > 0}
            )
        except Salesperson.DoesNotExist:
            return JsonResponse(
                    {"message": "Salesperson does not exist"},
                    status=404,
            )
    elif request.method == "GET":
        try:
            salesperson = Salesperson.objects.get(id=id)
            return JsonResponse(
            salesperson,
            encoder=SalesPersonEncoder,
            safe=False,
        )
        except Salesperson.DoesNotExist:
            return JsonResponse(
                    {"message": "Salesperson does not exist"},
                    status=404,
            )
    else:
        content = json.loads(request.body)
        try:
            salesperson = Salesperson.objects.filter(id=id)
            if salesperson.exists():
                salesperson.update(**content)
                return JsonResponse(
                    salesperson,
                    encoder=SalesPersonEncoder,
                    safe=False,
                )
            raise Salesperson.DoesNotExist
        except Salesperson.DoesNotExist:
            return JsonResponse(
                    {"message": "Salesperson does not exist"},
                    status=404,
            )


@require_http_methods(["GET", "POST"])
def api_list_customers(request):
    if request.method == "GET":
        try:
            customers = Customer.objects.all()

            return JsonResponse(
                {"customers" : customers},
                encoder=CustomerEncoder,
                safe=False,
            )
        except Exception:
            return JsonResponse(status = 400)

    else:
        try:
            content = json.loads(request.body)
            customer = Customer.objects.create(**content)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except TypeError:
            return JsonResponse(
                {"message": "Input Error"},
                status=400
            )

@require_http_methods(["DELETE", "GET", "POST"])
def api_detail_customer(request,id):
    if request.method == "DELETE":
        try:
            count, _ = Customer.objects.get(id = id).delete()
            return JsonResponse(
            {"deleted": count > 0}
            )
        except Customer.DoesNotExist:
            return JsonResponse(
                    {"message": "Customer does not exist"},
                    status=404,
            )
    elif request.method == "GET":
        try:
            customer = Customer.objects.get(id=id)
            return JsonResponse(
            customer,
            encoder=CustomerEncoder,
            safe=False,
        )
        except Customer.DoesNotExist:
            return JsonResponse(
                    {"message": "Customer does not exist"},
                    status=404,
            )
    else:
        content = json.loads(request.body)
        try:
            customer = Customer.objects.filter(id=id)
            if customer.exists():
                customer.update(**content)
                return JsonResponse(
                    customer,
                    encoder=CustomerEncoder,
                    safe=False,
                )
            raise Customer.DoesNotExist
        except Customer.DoesNotExist:
            return JsonResponse(
                    {"message": "Customer does not exist"},
                    status=404,
            )

@require_http_methods(["GET", "POST"])
def api_list_sales(request):
    if request.method == "GET":
        try:
            sales = Sale.objects.all()

            return JsonResponse(
                {"sales": sales},
                encoder= SaleEncoder,
                safe=False,
            )
        except Exception:
            return JsonResponse(
                status=400
            )
    else:
        try:
            content = json.loads(request.body)
            try:
                automobile = AutomobileVO.objects.get(vin = content["automobile"])
                content['automobile'] = automobile
            except AutomobileVO.DoesNotExist:
                return JsonResponse(
                    {"message": "Invalid Automobile vin"},
                    status=400,
                )
            try:
                salesperson = Salesperson.objects.get(id = content["salesperson"])
                content['salesperson'] = salesperson
            except Salesperson.DoesNotExist:
                return JsonResponse(
                    {"message": "Invalid Salesperson id"},
                    status=400,
                )
            try:
                customer = Customer.objects.get(id = content["customer"])
                content['customer'] = customer
            except Customer.DoesNotExist:
                return JsonResponse(
                    {"message": "Invalid Customer id"},
                    status=400,
                )

            sale = Sale.objects.create(**content)
            return JsonResponse(
                sale,
                encoder = SaleEncoder,
                safe=False,
            )
        except KeyError:
            return JsonResponse(
                {"message": "Key Input Error"},
                status=400
            )

@require_http_methods(["DELETE", "GET", "PUT"])
def api_detail_sale(request, id):
    if request.method == "DELETE":
        try:
            count, _ = Sale.objects.get(id = id).delete()
            return JsonResponse(
            {"deleted": count > 0}
            )
        except Sale.DoesNotExist:
            return JsonResponse(
                    {"message": "Sale does not exist"},
                    status=404,
            )
    elif request.method == "GET":
        try:
            sale = Sale.objects.get(id=id)
            return JsonResponse(
            sale,
            encoder=SaleEncoder,
            safe=False,
        )
        except Sale.DoesNotExist:
            return JsonResponse(
                    {"message": "Sale does not exist"},
                    status=404,
            )
    else:
        content = json.loads(request.body)
        try:
            if "automobile" in content:
                try:
                    automobile = AutomobileVO.objects.get(vin=content["automobile"])
                    content["automobile"] = automobile
                except AutomobileVO.DoesNotExist:
                    return JsonResponse(
                            {"message": "Automobile VIN does not exist"},
                            status=404,
                    )
            if "salesperson" in content:
                try:
                    saleperson = Salesperson.objects.get(id=content["salesperson"])
                    content["salesperson"] = saleperson
                except Salesperson.DoesNotExist:
                    return JsonResponse(
                            {"message": "Salesperson ID does not exist"},
                            status=404,
                    )
            if "customer" in content:
                try:
                    customer = Customer.objects.get(id=content["customer"])
                    content["customer"] = customer
                except Customer.DoesNotExist:
                    return JsonResponse(
                            {"message": "Customer ID does not exist"},
                            status=404,
                    )
            sale = Sale.objects.filter(id=id)
            if sale.exists():
                sale.update(**content)
                return JsonResponse(
                    sale,
                    encoder=SaleEncoder,
                    safe=False,
                )
            raise Sale.DoesNotExist
        except Sale.DoesNotExist:
            return JsonResponse(
                    {"message": "Sale ID does not exist"},
                    status=404,
            )
