from django.db import models

# Create your models here.
class Techinican(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    employee_id = models.CharField(max_length=200)


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=200)
    sold = models.BooleanField(default=False)


class Appointment(models.Model):
    date_time = models.DateTimeField()
    reason = models.CharField(max_length=200)
    status = models.CharField(max_length=200, default="Created")
    vin = models.CharField(max_length=200)
    customer = models.CharField(max_length=200)
    technician = models.ForeignKey(
        Techinican,
        related_name="technician",
        on_delete=models.CASCADE,
    )
