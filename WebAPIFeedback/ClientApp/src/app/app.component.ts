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
    sum: number;
    sumClient: number;
    firstNum: number;
    secondNum: number;
    errorSum: boolean = false;

    topics: Array<string> = [
        "Техподдержка", 
        "Продажи", 
        "Другое",
    ];
    constructor(private httpService: HttpService) { }

    ngOnInit(): void {
        this.loadCapha();
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
            topic: new FormControl(
                "",
                [
                    Validators.required
                ]),
            textUser: new FormControl(
                null,
                [
                    Validators.required
                ]),
            sumNumber: new FormControl(
                null,
                [
                    Validators.required
                ])
        });
    }

    loadCapha() {
        this.firstNum = Math.random() * 10;
        this.secondNum = Math.random() * 10;
        this.firstNum = Math.round(this.firstNum);
        this.secondNum = Math.round(this.secondNum);
        this.sum = this.firstNum + this.secondNum;
    }

    onChange(topicValue) {
        this.post.topic = topicValue;
    }

    submit(post) {
        if (this.sum == this.sumClient) {
            this.httpService.postData(post)
                .subscribe(
                    (data: PostFromDB) => { this.receivedPost = data; this.done = true; },
                    error => console.log(error)
                );
        } else {
            this.loadCapha();
            this.errorSum = true;
        }
    }

}