import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  taskObj: Task = new Task();
  taskArray: Task[] = [];

  addTaskValue: string = '';
  editTaskValue: string = '';

  constructor(private crudService: CrudService) {}

  ngOnInit(): void {
    this.editTaskValue = '';
    this.taskObj = new Task();
    this.taskArray = [];
    this.getAllTask();
  }

  getAllTask() {
    this.crudService.getAllTask().subscribe(
      (res: any) => {
        this.taskArray = res;
      },
      (err) => {
        alert('Unable to get list of tasks');
      }
    );
  }

  addTask() {
    this.taskObj.taskName = this.addTaskValue;
    this.crudService.addTask(this.taskObj).subscribe(
      (res) => {
        this.ngOnInit();
        this.addTaskValue = '';
      },
      (err) => {
        alert(err);
      }
    );
  }

  editTask() {
    this.taskObj.taskName = this.editTaskValue;
    this.crudService.editTask(this.taskObj).subscribe(
      (res) => {
        this.ngOnInit();
        this.addTaskValue = '';
      },
      (err) => {
        alert('Failed to update task');
      }
    );
  }

  deleteTask(etask: Task) {
    this.crudService.deleteTask(etask).subscribe(
      (res) => {
        this.ngOnInit();
      },
      (err) => {
        alert('Failed to delete task');
      }
    );
  }

  call(etask: Task) {
    this.taskObj = etask;
    this.editTaskValue = etask.taskName;
  }
}
