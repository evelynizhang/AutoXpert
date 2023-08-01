from django.shortcuts import render
from django.views.decorators.http import require_http_methods
import json
from django.http import JsonResponse
from common.json import ModelEncoder

from django.contrib.auth import get_user_model


class SignupEncoder(ModelEncoder):
    model = get_user_model()
    properties = ['username', 'first_name', "last_name", "email", "is_technician"]

# Create your views here.
@require_http_methods(["POST"])
def api_user_signup(request):
    if request.method == "POST":
        try:
            content = json.loads(request.body)
            user = get_user_model().objects.create(**content)
            return JsonResponse(
                user,
                encoder=SignupEncoder,
                safe=False,
            )
        except TypeError:
            return JsonResponse(
                {"message": "Input Error"},
                status=400
            )
