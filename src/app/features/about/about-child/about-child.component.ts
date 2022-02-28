import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-about-child',
  templateUrl: './about-child.component.html',
  styleUrls: ['./about-child.component.scss']
})
export class AboutChildComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {

  }

}
