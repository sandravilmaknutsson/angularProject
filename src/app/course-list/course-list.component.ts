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
  displayedColumns: string[] = ["name", "points", "subject"];
  courseList: Course[] = [];
  dataSource = new MatTableDataSource<Course>(this.courseList);
  selected: string = "";


  constructor(private courseService: CourseService, private _liveAnnouncer: LiveAnnouncer) { }

  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.courseService.getCourses().subscribe(data => {
      this.courseList = data;
      this.dataSource = new MatTableDataSource<Course>(this.courseList)
      this.dataSource.sort = this.sort;
    })
  }


  filter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  sortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  onSelect($event: any): void {
    let filterdData = this.courseList.filter((course: { subject: string; }) => {
      return course.subject.toLowerCase() === $event.value.toLowerCase();
    })
    this.dataSource = new MatTableDataSource(filterdData);
  }
}
