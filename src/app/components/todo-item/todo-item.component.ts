import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { TodoService } from "../../services/todo.service";
import { Todo } from 'src/app/models/Todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();

  constructor(private TodoService:TodoService) { }

  ngOnInit(): void {
  }

  //Set Dynamic Classes
  SetClasses() {
    let classes = {
      todo: true,
      'is-complete': this.todo.completed
    }

    return classes;
  }

  onToggle(todo:Todo) {
    // toggle in Ui
    todo.completed = !todo.completed;
    // Toggle on server
    this.TodoService.toggleCompleted(todo).subscribe(todo => console.log(todo));
  }

  onDelete(todo:Todo) {
    this.deleteTodo.emit(todo);
  }
}
