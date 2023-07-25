from django.shortcuts import render

# Create your views here.
from django.views.decorators.http import require_http_methods
import json
from django.http import JsonResponse
from .models import AutomobileVO, Appointment,Technician
from common.json import ModelEncoder
import datetime
from datetime import time


class TechnicianEncoder(ModelEncoder):
   model = Technician
   properties = [
      "first_name", "last_name", "employee_id","id",
   ]



class TechnicianDetailEncoder(ModelEncoder):
   model = Technician
   properties = ["employee_id"]


class AutomobileVOEncoder(ModelEncoder):
   model = AutomobileVO
   properties = ["vin", "sold"]

class AppointmentEncoder(ModelEncoder):
   model = Appointment
   properties = ["date_time", "reason", "date", "status", "vin", "customer", "technician", "id"]
   encoders={
      "technician": TechnicianDetailEncoder(),
   }
   def get_extra_data(self, o):
        return {"time": o.date_time.date()}

@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
      technicians = Technician.objects.all()
      return JsonResponse({"technicians": technicians}, encoder=TechnicianEncoder, safe=False)
    else:
       try:
          content = json.loads(request.body)
          technician = Technician.objects.create(**content)
          return JsonResponse(technician, encoder=TechnicianEncoder, safe=False)
       except:
          return JsonResponse({"message": "Invalid input"}, status=400)

@require_http_methods(["DELETE"])
def api_show_technician(request, pk):
   if request.method == "DELETE":
      count, _ = Technician.objects.filter(id=pk).delete()
      if count > 0:
        return JsonResponse({"delete": count > 0})
      else:
        return JsonResponse({"message": "Invalid techician id"}, status=400)


@require_http_methods(["GET", "POST"])
def api_list_appointments(request):
    if request.method == "GET":
      appointments = Appointment.objects.all()
      return JsonResponse({"appointments": appointments}, encoder=AppointmentEncoder, safe=False)
    else:
      content = json.loads(request.body)
      try:
          technician_employee_id = content["technician"]
          technician = Technician.objects.get(employee_id=technician_employee_id)
          content["technician"] = technician
      except Technician.DoesNotExist:
          return JsonResponse({"message": "Invalid technician employee id"}, status=400)
      appointment = Appointment.objects.create(**content)
      return JsonResponse(appointment, encoder=AppointmentEncoder, safe=False)


@require_http_methods(["DELETE"])
def api_show_appointment(request, pk):
   if request.method == "DELETE":
      count, _ = Appointment.objects.filter(id=pk).delete()
      if count > 0:
        return JsonResponse({"delete": count > 0})
      else:
        return JsonResponse({"message": "Invalid appointment id"}, status=400)

@require_http_methods(["GET"])
def api_list_automobilesVO(request):
    if request.method == "GET":
      automobiles = AutomobileVO.objects.all()
      return JsonResponse({"auto": automobiles}, encoder=AutomobileVOEncoder, safe=False)


@require_http_methods(["PUT"])
def api_status_canceled(request, pk):
    if request.method == "PUT":
       appointment = Appointment.objects.get(id=pk)
       appointment.status = "canceled"
       appointment.save()
       return JsonResponse(appointment, encoder=AppointmentEncoder, safe=False)

@require_http_methods(["PUT"])
def api_status_finished(request, pk):
   if request.method == "PUT":
       appointment = Appointment.objects.get(id=pk)
       appointment.status = "finished"
       appointment.save()
       return JsonResponse(appointment, encoder=AppointmentEncoder, safe=False)
