from rest_framework import serializers


class RenameRequestSerializer(serializers.Serializer):
    folder_path = serializers.CharField()
    selected_files = serializers.ListField(child=serializers.CharField())
