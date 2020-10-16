import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post';

@Injectable()
export class HttpService {

    private url = "/api/posts";

    constructor(private http: HttpClient) { }

    postData(name: string) {
        return this.http.post(this.url, name);
    }
}