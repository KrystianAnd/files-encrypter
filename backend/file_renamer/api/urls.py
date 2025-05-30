from django.urls import path

from .views import RenameFilesView

urlpatterns = [
    path("rename/", RenameFilesView.as_view(), name="rename-files"),
]
