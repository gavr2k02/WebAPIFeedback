import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from './http.service';
import { Post } from './post';
import { PostFromDB } from './postFromDb';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [HttpService]
})

export class AppComponent implements OnInit {

    myForm: FormGroup;
    post: Post = new Post();
    receivedPost: PostFromDB;
    done: boolean = false;
    public telMask = ['(', /[0-9]/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    errorSum: boolean = false;

    topics: Array<string> = [
        "Техподдержка", 
        "Продажи", 
        "Другое",
    ];
    constructor(private httpService: HttpService) { }

    ngOnInit(): void {
        this.post.topic = this.topics[0];
        this.myForm = new FormGroup({
            nameUser: new FormControl(
                null,
                [
                Validators.required
                ]),
            emailUser: new FormControl(
                null,
                [
                Validators.email,
                Validators.required
                ]),
            telUser: new FormControl(
                null,
                [
                    Validators.required
                ]),
            textUser: new FormControl(
                null,
                [
                    Validators.required
                ]),
        });
    }

    onChange(topicValue) {
        this.post.topic = topicValue;
    }

    submit(post) {
            this.httpService.postData(post)
                .subscribe(
                    (data: PostFromDB) => { this.receivedPost = data; this.done = true; },
                    error => console.log(error)
                );
    }

}