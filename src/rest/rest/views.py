from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import json, logging, os
from pymongo import MongoClient
from .services import TodoRepository

mongo_uri = 'mongodb://' + os.environ["MONGO_HOST"] + ':' + os.environ["MONGO_PORT"]
db = MongoClient(mongo_uri)['test_db']
repository = TodoRepository(db)

class TodoListView(APIView):

    def get(self, request):
        try:
            todos = repository.get_all()
            return Response(todos, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def post(self, request):
        description = request.data.get('description', '').strip()
        
        if not description:
            return Response({'error': 'Description cannot be empty'}, status=status.HTTP_400_BAD_REQUEST)
            
        try:
            repository.create(description)
            return Response({'message': 'Todo created successfully'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

