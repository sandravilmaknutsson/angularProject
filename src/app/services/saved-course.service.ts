import { Injectable } from '@angular/core';
import { Course } from '../model/course';

@Injectable({
  providedIn: 'root'
})
export class SavedCourseService {

  savedCourses: Course[] = [];

  constructor() { }
}
