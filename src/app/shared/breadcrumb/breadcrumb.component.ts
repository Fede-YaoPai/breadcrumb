import { Component, OnInit } from '@angular/core';
import { AngularBreadcrumbFypService } from 'angular-breadcrumb-fyp';


@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  constructor(public bcs: AngularBreadcrumbFypService) {}

  ngOnInit(): void {
  }

}
