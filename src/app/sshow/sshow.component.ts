import { Component, OnInit, ViewEncapsulation } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-sshow',
  templateUrl: './sshow.component.html',
  styleUrls: ['./sshow.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SshowComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(function () {
      $('#carousel').carouFredSel({
        width: '100%',
        items: {
          visible: 3,
          start: -1
        },
        scroll: {
          items: 1,
          duration: 1000,
          timeoutDuration: 3000
        },
        next: '#next',
        prev: '#prev',

        pagination: {
          container: '#pager',
          deviation: 1
        }
      });
    }
    )
  }

}
