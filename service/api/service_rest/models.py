from django.db import models


# Create your models here.
class Technician(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    employee_id = models.CharField(max_length=200)
    def full_name(self):
        return self.first_name + self.last_name


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=200)
    sold = models.BooleanField(default=False)


class Appointment(models.Model):
    date_time = models.DateTimeField(auto_now_add=True)
    date = models.DateField(auto_now=True, auto_now_add=False, null=True)
    time = models.TimeField(auto_now=True, auto_now_add=False,null=True)
    reason = models.CharField(max_length=200)
    status = models.CharField(max_length=200, default="Created")
    vin = models.CharField(max_length=200)
    customer = models.CharField(max_length=200)
    technician = models.ForeignKey(
        Technician,
        related_name="technician",
        on_delete=models.CASCADE,
    )
    # def get_date(self):
    #     return self.date_time.date()

    # def get_time(self):
    #     return self.date_time.time()
