import requests
from pprint import pprint

# Task 1: Get the 200 most recent TODOs
response = requests.get("https://jsonplaceholder.typicode.com/todos?_limit=200")
todos = response.json()
print("200 Most Recent TODOs:")
pprint(todos)

# Task 2: Create a TODO
new_todo_data = {
    "title": "New TODO",
    "completed": False,
    "userId": 1  #  user ID
}
response = requests.post("https://jsonplaceholder.typicode.com/todos", json=new_todo_data)
new_todo = response.json()
print("Created TODO:")
pprint(new_todo)

# Task 3: Delete a TODO on a given ID 1
todo_id_to_delete = 1 
delete_url = f"https://jsonplaceholder.typicode.com/todos/{todo_id_to_delete}"
response = requests.delete(delete_url)
if response.status_code == 200:
    print(f"TODO with ID {todo_id_to_delete} deleted successfully")
else:
    print(f"Failed to delete TODO with ID {todo_id_to_delete}. Status code: {response.status_code}")
