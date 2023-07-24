from django.shortcuts import render

# Create your views here.
from django.views.decorators.http import require_http_methods
import json
from django.http import JsonResponse
from .models import AutomobileVO, Appointment,Techinican
from common.json import ModelEncoder


class TechnicianEncoder(ModelEncoder):
   model = Techinican
   properties = [
      "first_name", "last_name", "employee_id","id",
   ]

@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
      technicians = Techinican.objects.all()
      return JsonResponse({"technicians": technicians}, encoder=TechnicianEncoder, safe=False)
    else:
       try:
          content = json.loads(request.body)
          technician = Techinican.objects.create(**content)
          return JsonResponse(technician, encoder=TechnicianEncoder, safe=False)
       except:
          return JsonResponse({"message": "Invalid input"}, status=400)

@require_http_methods(["DELETE"])
def api_show_technician(request, pk):
   if request.method == "DELETE":
      count, _ = Techinican.objects.filter(id=pk).delete()
      if count > 0:
        return JsonResponse({"delete": count > 0})
      else:
        return JsonResponse({"message": "Invalid techician id"}, status=400)
