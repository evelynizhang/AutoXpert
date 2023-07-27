from django.shortcuts import render
from django.views.decorators.http import require_http_methods
import json
from django.http import JsonResponse
from .models import AutomobileVO, Appointment,Technician
from common.json import ModelEncoder



class TechnicianEncoder(ModelEncoder):
   model = Technician
   properties = ["first_name", "last_name", "employee_id","id"]


class TechnicianDetailEncoder(ModelEncoder):
   model = Technician
   properties = ["employee_id"]


class AutomobileVOEncoder(ModelEncoder):
   model = AutomobileVO
   properties = ["vin", "sold"]


class AppointmentEncoder(ModelEncoder):
   model = Appointment
   properties = ["reason", "date","time","status", "vin", "customer", "technician", "id"]
   encoders={
      "technician": TechnicianDetailEncoder(),
   }



@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
       try:
          technicians = Technician.objects.all()
          return JsonResponse({"technicians": technicians}, encoder=TechnicianEncoder, safe=False)
       except Exception:
          return JsonResponse(status = 400)

    else:
       try:
          content = json.loads(request.body)
          technician = Technician.objects.create(**content)
          return JsonResponse(technician, encoder=TechnicianEncoder, safe=False)
       except:
          return JsonResponse({"message": "Invalid input"}, status=400)



@require_http_methods(["DELETE","GET","PUT"])
def api_show_technician(request, pk):
    if request.method == "DELETE":
        count, _ = Technician.objects.filter(id=pk).delete()
        if count > 0:
            return JsonResponse({"delete": count > 0})
        else:
            return JsonResponse({"message": "Invalid techician id"}, status=400)
    elif request.method == "GET":
        try:
            technician = Technician.objects.get(id=pk)
            return JsonResponse({"technicians": technician},encoder=TechnicianDetailEncoder,safe=False)
        except Technician.DoesNotExist:
            return JsonResponse({"message":"invaild technician id"}, status=400)
    else:
        content = json.loads(request.body)
        Technician.objects.filter(id=pk).update(**content)
        try:
            technician=Technician.objects.get(id=pk)
            return JsonResponse({"technicians": technician}, encoder=TechnicianEncoder,safe=False)
        except Technician.DoesNotExist:
            return JsonResponse({"message":"invaild technician id"}, status=400)



@require_http_methods(["GET", "POST"])
def api_list_appointments(request):
    if request.method == "GET":
        try:
            appointments = Appointment.objects.all()
            return JsonResponse({"appointments": appointments}, encoder=AppointmentEncoder, safe=False)
        except Exception:
            return JsonResponse(status = 400)
    else:
        content = json.loads(request.body)
        try:
            if "technician" in content:
                technician_employee_id = content["technician"]
                technician = Technician.objects.get(employee_id=technician_employee_id)
                content["technician"] = technician
            else:
                return JsonResponse({"message": "Need the employee id of the technician"}, status=400)
        except Technician.DoesNotExist:
            return JsonResponse({"message": "Invalid technician employee id"}, status=400)
        appointment = Appointment.objects.create(**content)
        return JsonResponse({"appointment": appointment}, encoder=AppointmentEncoder, safe=False)



@require_http_methods(["DELETE","GET","PUT"])
def api_show_appointment(request, pk):
    if request.method == "DELETE":
        count, _ = Appointment.objects.filter(id=pk).delete()
        if count > 0:
            return JsonResponse({"delete": count > 0})
        else:
            return JsonResponse({"message": "Invalid appointment id"}, status=400)
    elif request.method == "GET":
        try:
            appointment = Appointment.objects.get(id=pk)
            return JsonResponse({"appointments": appointment}, encoder=AppointmentEncoder,safe=False)
        except Appointment.DoesNotExist:
            return JsonResponse({"message": "invaild appointment id"}, status=400)
    else:
        content = json.loads(request.body)
        try:
            if "technician" in content:
                technician = Technician.objects.get(employee_id=content["technician"])
                content["technician"] = technician
            else:
                return JsonResponse({"message": "Need the employee id of the technician"}, status=400)
        except Technician.DoesNotExist:
            return JsonResponse({"message": "invaild technician employee_id"}, status=400)
        Appointment.objects.filter(id=pk).update(**content)
        appointment=Appointment.objects.get(id=pk)
        return JsonResponse({"appointments":appointment}, encoder=AppointmentEncoder, safe=False)




@require_http_methods(["GET"])
def api_list_automobilesVO(request):
    if request.method == "GET":
      automobiles = AutomobileVO.objects.all()
      return JsonResponse({"auto": automobiles}, encoder=AutomobileVOEncoder, safe=False)



@require_http_methods(["PUT"])
def api_status_canceled(request, pk):
    if request.method == "PUT":
      try:
          appointment = Appointment.objects.get(id=pk)
          appointment.status = "Canceled"
          appointment.save()
          return JsonResponse({"appointments": appointment}, encoder=AppointmentEncoder, safe=False)
      except Appointment.DoesNotExist:
          return JsonResponse({"message": "invalid appointment id"}, status=400)



@require_http_methods(["PUT"])
def api_status_finished(request, pk):
   if request.method == "PUT":
       try:
          appointment = Appointment.objects.get(id=pk)
          appointment.status = "Finished"
          appointment.save()
          return JsonResponse({"appointments": appointment}, encoder=AppointmentEncoder, safe=False)
       except Appointment.DoesNotExist:
          return JsonResponse({"message": "invalid appointment id"}, status=400)
