from django.urls import path
from .views import get_token_view, AddView, SubtractView, MultiplyView, DivideView

app_name = 'api_v1'

urlpatterns = [
    path('get-token/', get_token_view, name='get_token_view'),
    path('add/', AddView.as_view(), name='add'),
    path('subtract/', SubtractView.as_view(), name='subtract'),
    path('multiply/', MultiplyView.as_view(), name='multiply'),
    path('divide/', DivideView.as_view(), name='divide'),
]