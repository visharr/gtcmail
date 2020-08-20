import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Http, Headers, Response, ResponseType } from "@angular/http";
import { LoginService } from '../login.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class EditprofileComponent implements OnInit {

  constructor(private http: HttpClient, private loginService: LoginService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  image: any;
  imageURL: string = null;
  fileSelected: File = null;
  preview: File = null;
  testurl: any;

  onFileSelected(event) {
    this.fileSelected = <File>event.target.files[0];
  }
  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  previewSelected(file: FileList) {
    //this.preview=file.item(0);
    this.preview = this.fileSelected;
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageURL = event.target.result;
    }
    reader.readAsDataURL(this.preview)
  }


  //event.target.file as html parameter
  upload() {
    const fd = new FormData();
    fd.append('img', this.fileSelected);

    const header = new HttpHeaders({ 'authorization': localStorage.getItem('imsuser') });
    this.http.post('http://gtcmail-backend.herokuapp.com/users/updatepfp', fd, { headers: header }
      // {
      //   reportProgress: true,
      //   observe: 'events'
      // }
    ).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => console.log(error)
    );
    // (
    // event => {
    //   // if (event.type === HttpEventType.UploadProgress) {
    //   //   console.log("Upload progress : " + event.loaded / event.total * 100 + ' %')
    //   // }
    //   // console.log(event);
    // })
  }

  getpfp() {
    
    const header = new HttpHeaders({ 'authorization': localStorage.getItem('imsuser') });
    this.http.get('http://gtcmail-backend.herokuapp.com/users/getpfp', {
      responseType: "blob",
      headers: header
    }
    ).subscribe(
      (response) => {
        this.image = response;
        var file = new Blob([this.image], {
          type: 'image/jpeg'
        });

        this.testurl = URL.createObjectURL(file);
        console.log(this.testurl)
        //this.testurl=this.sanitizer.bypassSecurityTrustUrl(this.testurl);        
        //window.open(this.testurl);

      },
      (error) => console.log(error)
    );
  }

  deleteProfile() {
    const header = new HttpHeaders({ 'authorization': localStorage.getItem('imsuser') });
    this.http.post('http://gtcmail-backend.herokuapp.com/users/deleteuser', {password:"sexy"},{
      headers: header
    }
    ).subscribe(
      (response) => {
        this.loginService.logout();
      },
      (error) => console.log("error che")
    );
  }
  
  deletepfp() {
    const header = new HttpHeaders({ 'authorization': localStorage.getItem('imsuser') });
    this.http.delete('http://gtcmail-backend.herokuapp.com/users/deletepfp', {
      headers: header
    }
    ).subscribe(
      (response) => {
        console.log(response)
      },
      (error) => console.log(error)
    );

  }
}