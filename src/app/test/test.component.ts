import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LoginService } from '../login.service';
// import '.../assets/bootstrap.min.js';
// <script src="../assets/js/bootstrap.min.js" type="text/javascript"></script>
// 	<script src="../assets/js/jquery.bootstrap.js" type="text/javascript"></script>	
// 	<script src="../assets/js/material-bootstrap-wizard.js"></script>    
// 	<script src="../assets/js/jquery.validate.min.js"></script>

declare var $: any;
declare var M: any;
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css',],//'../../assets/bootstrap.min.css'],
  encapsulation: ViewEncapsulation.None
})
export class TestComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    $(document).ready(function () {
      $('.fixed-action-btn').floatingActionButton({
        direction: "left"
      });
    });
    $(document).ready(function () {
      $('.tooltipped').tooltip();
    });

  }

}
