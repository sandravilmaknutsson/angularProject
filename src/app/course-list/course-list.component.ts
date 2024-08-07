import { Component } from '@angular/core';
import { Course } from '../model/course';
import { CourseService } from '../services/course.service';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.scss'
})
export class CourseListComponent {
  displayedColumns: string[] = ["name", "points", "subject"];
  courseList: Course[] = [];
  dataSource = new MatTableDataSource<Course>(this.courseList);

  constructor(private courseService: CourseService) { }

  ngOnInit() {
    this.courseService.getCourses().subscribe(data => {
      this.courseList = data;
      this.dataSource = new MatTableDataSource<Course>(this.courseList)
    })
  }
}
