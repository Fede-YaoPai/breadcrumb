import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from 'src/app/core/services/navigation.service';

@Component({
  selector: 'app-about-child',
  templateUrl: './about-child.component.html',
  styleUrls: ['./about-child.component.scss']
})
export class AboutChildComponent implements OnInit {

  constructor(public navigation: NavigationService) { }

  ngOnInit(): void {

  }

}
