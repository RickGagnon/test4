import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Link } from "../_models";
@Injectable({ providedIn: 'root' })
export class LinkConvertService {
    constructor(private http: HttpClient) { }

    convertLink(value: string) {
        var d = new Link();
        d.newLink = value;
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        let options = { headers: headers };
        return this.http.post<Link>("api/linkconvert", d,options);
    }

}
