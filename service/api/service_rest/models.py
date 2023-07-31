from django.db import models


class Technician(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    employee_id = models.CharField(max_length=200)
    picture_url = models.URLField(max_length=20000, null=True)
    def full_name(self):
        return self.first_name + self.last_name


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=200)
    sold = models.BooleanField(default=False)


class Appointment(models.Model):
    date = models.DateField(auto_now=False, auto_now_add=False, null=True)
    time = models.CharField(max_length=200, null=True)
    reason = models.CharField(max_length=200)
    status = models.CharField(max_length=200, default="Created")
    vin = models.CharField(max_length=200)
    customer = models.CharField(max_length=200)
    technician = models.ForeignKey(
        Technician,
        related_name="technician",
        on_delete=models.CASCADE,
    )
