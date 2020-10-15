import json
from decimal import Decimal

from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse, HttpResponseBadRequest
from django.shortcuts import render
from django.views.generic import View
from django.views.decorators.csrf import ensure_csrf_cookie


@ensure_csrf_cookie
def get_token_view(request, *args, **kwargs):
    if request.method == 'GET':
        return HttpResponse()
    return HttpResponseNotAllowed('Only GET request are allowed')


def get_data(request):
    data = json.loads(request.body)
    try:
        data['A'] = int(data['A'])
        data['B'] = int(data['B'])
    except:
        raise TypeError
    return data


class AddView(View):
    def post(self, request, *args, **kwargs):
        try:
            data = get_data(request)
            result = data['A'] + data['B']
            return JsonResponse({
                "answer": result
            })
        except Exception as e:
            response_data = {
                "error": e.__class__.__name__
            }
            return HttpResponseBadRequest(json.dumps(response_data), content_type="application/json")


class SubtractView(View):
    def post(self, request, *args, **kwargs):
        try:
            data = get_data(request)
            result = data['A'] - data['B']
            return JsonResponse({
                "answer": result
            })
        except Exception as e:
            response_data = {
                "error": e.__class__.__name__
            }
            return HttpResponseBadRequest(json.dumps(response_data), content_type="application/json")


class MultiplyView(View):
    def post(self, request, *args, **kwargs):
        try:
            data = get_data(request)
            result = data['A'] * data['B']
            return JsonResponse({
                "answer": result
            })
        except Exception as e:
            response_data = {
                "error": e.__class__.__name__
            }
            return HttpResponseBadRequest(json.dumps(response_data), content_type="application/json")


class DivideView(View):
    def post(self, request, *args, **kwargs):
        try:
            data = get_data(request)
            if (data['A'] % data['B'] == 0):
                result = int(data['A'] / data['B'])
            else:
                result = (data['A'] / data['B'])
                result = "{:.2f}".format(result)
            return JsonResponse({
                "answer": result
            })
        except Exception as e:
            response = JsonResponse({'error': e.__class__.__name__})
            response.status_code = 400
            return response