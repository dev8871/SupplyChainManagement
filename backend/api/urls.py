from django.urls import path
from . import views

urlpatterns = [
    # path("hello/", views.hello_world),
    path("register/", views.register),
    # path("login/", views.login),
    path("authenticated/", views.is_authenticated),
    path('login/', views.CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', views.CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', views.logout, name='logout')
]