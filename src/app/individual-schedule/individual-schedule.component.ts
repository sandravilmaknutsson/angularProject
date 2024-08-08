import { Component } from '@angular/core';
import { Course } from '../model/course';
import { CourseService } from '../services/course.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-individual-schedule',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './individual-schedule.component.html',
  styleUrl: './individual-schedule.component.scss'
})
export class IndividualScheduleComponent {
  displayedColumns: string[] = ["name", "points", "subject", "delete"];
  getCourse: string = "";
  savedCourse: Course[] = [];
  dataSource = new MatTableDataSource<Course>(this.savedCourse);

  constructor(private courseService: CourseService) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Course>(this.savedCourse);
    this.loadSavedCourses();
  }

  loadSavedCourses(): Course[] {
    this.getCourse = localStorage.getItem("savedCourse") || "";
    this.savedCourse = JSON.parse(this.getCourse);
    this.courseService.savedCourses = this.savedCourse;
    return this.courseService.savedCourses;
  }
}
