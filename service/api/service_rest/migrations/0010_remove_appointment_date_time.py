# Generated by Django 4.0.3 on 2023-07-27 18:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0009_alter_appointment_time'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='appointment',
            name='date_time',
        ),
    ]
