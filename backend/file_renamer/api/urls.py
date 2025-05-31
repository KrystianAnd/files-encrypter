from django.urls import path

from .views import RenameFilesView, listfiles

urlpatterns = [
    path("rename/", RenameFilesView.as_view(), name="rename-files"),
    path("listfiles/", listfiles, name="list-files"),
]
