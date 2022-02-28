import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'src/app/core/services/breadcrumb.service';
import { Breadcrumb } from 'src/app/models/breadcrumb.model';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {


  constructor(public service: BreadcrumbService) {

  }

  ngOnInit(): void {

  }

  public navigate(crumb: Breadcrumb): void {
    this.service.navigateBreadCrumb(crumb);
  }


}
