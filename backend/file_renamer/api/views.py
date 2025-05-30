from pathlib import Path

from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import RenameRequestSerializer
from .utils import rename_files


class RenameFilesView(APIView):
    def post(self, request: Request) -> Response:
        serializer = RenameRequestSerializer(data=request.data)
        if serializer.is_valid():
            folder_path = Path(serializer.validated_data["folder_path"]).expanduser()
            selected_files = serializer.validated_data["selected_files"]

            if not folder_path.is_dir():
                return Response({"error": "Invalid folder path."}, status=status.HTTP_400_BAD_REQUEST)

            result = rename_files(folder_path, selected_files)
            return Response({"renamed": result}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
