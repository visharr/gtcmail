import { Component, OnInit, ViewEncapsulation } from '@angular/core';


declare var $: any;

@Component({
    selector: 'app-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.css'],
    // encapsulation: ViewEncapsulation.None
})

export class GalleryComponent implements OnInit {
    constructor() {

    }

    ngOnInit() {

        $(function () {


            $('.igg').each(function () {
                var $cfs = $(this);
                $cfs.carouFredSel({
                    direction: 'up',
                    circular: false,
                    infinite: false,
                    align: false,
                    width: 275,
                    height: 250,
                    items: 1,
                    auto: false,
                    scroll: {
                        queue: 'last'
                    }
                });
                $cfs.hover(
                    function () {
                        $cfs.trigger('next');
                    },
                    function () {
                        $cfs.trigger('prev');
                    }
                );
            });
        });
    }

} 