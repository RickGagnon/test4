import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LinkConvertService } from '../_services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { URL } from 'url';
@Component({
  selector: 'link-convert',
  templateUrl: './link-convert.component.html',
  styleUrls: ['./link-convert.component.css']
})
export class LinkConvertComponent implements OnInit {

    urlConvertForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';
    //resultURL = "";
    
    constructor(


        private formBuilder: FormBuilder, private linkConvertService: LinkConvertService, private _snackBar: MatSnackBar) {
        this.urlConvertForm = this.formBuilder.group({
            urlLink: ['', Validators.required],
            resultUrl: ['']
        });

    }
        // redirect to home if already logged in

    
    clearValue() {
        this.urlConvertForm.controls['urlLink'].setValue('');
    }

 


    //test1() {
    //    if (this.urlConvertForm.controls['urlLink'].value == '' || this.urlConvertForm.controls['urlLink'].value == null) {
    //        this.urlConvertForm.controls['resultUrl'].value == '';
    //        return;
    //    }
    //    else {
    //        this.urlConvertForm.controls['resultUrl'].setValue(this.urlConvertForm.controls['urlLink'].value);
    //    }
        
       
        
    //}
    urlstring: string;
    open() {
        this.urlstring = this.urlConvertForm.controls['resultUrl'].value;
        if (this.urlstring.substring(0,4) != "http" && this.urlstring.substr(0, 4) != "HTTP") {
            console.log(this.urlstring.substring(0, 4));
            this.urlstring = "http://" + this.urlstring;
            console.log(this.urlstring);
        }
        else console.log(this.urlstring);
        window.open(this.urlstring,'_blank'); //
    }
    convert(val: string) 
    {

        this.linkConvertService.convertLink(val).subscribe(p => this.urlConvertForm.controls['resultUrl'].setValue(p.newLink), error => error, () => {
            this.copy(document.getElementById("result"));
            if (val != "") {
                this._snackBar.open('Results pasted to the clipboard', '', { duration: 3000 });
            };
            document.getElementById("mainlink").focus();
        });
        //return val.substring(3, 4);

    }

    copy(inputElement) {
       
            inputElement.select();
            document.execCommand('copy');
            inputElement.setSelectionRange(0, 0);
        

        //const str = 'Copy me';
        //const el = document.createElement("input");
        //// Does not work:
        //// dummy.style.display = "none";
        //el.style.height = '0px';
        //// Does not work:
        //// el.style.width = '0px';
        //el.style.width = '1px';
        //document.body.appendChild(el);
        //el.value = this.urlConvertForm.controls['resultUrl'].value;
        //el.select();
        //console.log(el.value);
        //document.execCommand("copy");
        //document.body.removeChild(el);

    }
    ngOnInit() {

        this.urlConvertForm.get("urlLink").valueChanges.subscribe(x => {
            this.urlConvertForm.controls['resultUrl'].setValue(this.convert(this.urlConvertForm.controls['urlLink'].value));
            

        });
    }

    // convenience getter for easy access to form fields
    //get f() { return this.loginForm.controls; }

    //onSubmit() {
    //    this.submitted = true;

    //    // stop here if form is invalid
    //    if (this.loginForm.invalid) {
    //        return;
    //    }

    //    this.loading = true;
    //    this.authenticationService.login(this.f.username.value, this.f.password.value)
    //        .pipe(first())
    //        .subscribe(
    //            data => {
    //                this.router.navigate([this.returnUrl]);
    //            },
    //            error => {
    //                this.error = error;
    //                this.loading = false;
    //            });
    //}
}
