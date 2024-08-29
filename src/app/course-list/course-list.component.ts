import { Component, ViewChild } from '@angular/core';
import { Course } from '../model/course';
import { CourseService } from '../services/course.service';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatInputModule, MatFormFieldModule, MatSortModule, MatSelectModule, FormsModule],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.scss'
})
export class CourseListComponent {
  displayedColumns: string[] = ["courseCode", "courseName", "points", "subject", "syllabus", "add"];
  courseList: Course[] = [];
  dataSource = new MatTableDataSource<Course>(this.courseList);
  selected: string = "";
  courses: Course[] = [];
  courseAmount: number = 0;
  courseText: string = "";



  constructor(private courseService: CourseService, private _liveAnnouncer: LiveAnnouncer) { }

  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.courseService.getCourses().subscribe(data => {
      this.courseList = data;
      this.dataSource = new MatTableDataSource<Course>(this.courseList)
      this.dataSource.sort = this.sort;
      this.courses = this.courseList;
      this.amountControll();
      this.changeText();
    })
  }

  filter(event: Event): void {
    let filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  sortChange(sortState: Sort): void {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  sortReset(): void {
    this.ngOnInit();
  }

  onSelect($event: any): void {
    (document.getElementById("input") as HTMLInputElement).value = "";
    let filterdData = this.courseList.filter((course: { subject: string; }) => {
      return course.subject.toLowerCase() === $event.value.toLowerCase();
    })
    this.dataSource = new MatTableDataSource(filterdData);
    this.courses = filterdData;
    this.amountControll();
    this.changeText();
  }

  amountControll(): void {
    this.courseAmount = 0;
    for (let i: number = 0; i < this.courses.length; i++) {
      if (this.courseList[i] instanceof Object) {
        this.courseAmount++;
      }
    }
  }
  changeText(): void {
    if (this.courseAmount > 1) {
      this.courseText = "kurser";
    } else {
      this.courseText = "kurs";
    }
  }

  addButton(row: Course): void {
    if (this.courseService.savedCourses.includes(row)) {
      return
    } else {
      this.courseService.savedCourses.push(row);
      localStorage.setItem("savedCourse", JSON.stringify(this.courseService.savedCourses));
    }
  }
}
