import { Component, OnInit, ViewEncapsulation } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NewsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(function() {
      var _scroll = {
        delay: 1000,
        easing: 'linear',
        items: 1,
        duration: 0.07,
        timeoutDuration: 0,
        pauseOnHover: 'immediate'
      };
      
     
      $('#ticker-2').carouFredSel({
        width: 1000,
        align: false,
        circular: false,
        items: {
          width: 'variable',
          height: 35,
          visible: 2
        },
        scroll: _scroll
      });
     
      //	set carousels to be 100% wide
      $('.caroufredsel_wrapper').css('width', '100%');
     
      //	set a large width on the last DD so the ticker won't show the first item at the end
      $('#ticker-2 dd:last').width(2000);
    });
  }

}
