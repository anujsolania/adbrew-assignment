import logging

logger = logging.getLogger(__name__)

class TodoRepository:
    def __init__(self, db_client):
        self.collection = db_client['todos']

    def get_all(self):
        """Fetch all todos, converting ObjectIds to strings."""
        try:
            todos = list(self.collection.find())
            for todo in todos:
                todo['_id'] = str(todo['_id'])
            return todos
        except Exception as e:
            logger.error(f"Database error while fetching todos: {e}")
            raise RuntimeError("Could not retrieve todos from database")

    def create(self, description):
        """Insert a todo item into the database."""
        try:
            result = self.collection.insert_one({'description': description})
            return str(result.inserted_id)
        except Exception as e:
            logger.error(f"Database error while inserting todo: {e}")
            raise RuntimeError("Could not create todo in database")
