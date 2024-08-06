import { Routes } from '@angular/router';
import { CourseListComponent } from './course-list/course-list.component';
import { IndividualScheduleComponent } from './individual-schedule/individual-schedule.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
    { path: 'courseList', component: CourseListComponent },
    { path: 'individualSchedule', component: IndividualScheduleComponent },
    { path: '', redirectTo: '/courseList', pathMatch: 'full' },
    { path: '404', component: NotFoundComponent },
    { path: '**', component: NotFoundComponent }
];
