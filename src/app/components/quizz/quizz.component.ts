import { Component, OnInit } from '@angular/core';
import quizz_questions from '../../../assets/data/quizz_questions.json';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css'],
})
export class QuizzComponent implements OnInit {
  title: string = '';
  questions: any;
  questionSelected: any;
  answers: number = 0;
  answerSelected: { mob: string; description: string } | any;
  questionIndex: number = 0;
  questionMaxIndex: number = 0;
  finished: boolean = false;
  image: string = '';

  constructor() {}

  ngOnInit(): void {
    if (quizz_questions) {
      this.finished = false;
      this.title = quizz_questions.title;
      this.questions = quizz_questions.questions;
      this.questionSelected = this.questions[this.questionIndex];
      this.questionMaxIndex = this.questions.length;
    }
  }

  playerChoose(value: string) {
    this.answers += Number(value);
    this.nextStep();
  }

  async nextStep() {
    this.questionIndex += 1;

    if (this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex];
    } else {
      this.answerSelected = await this.checkResult(this.answers);
      this.finished = true;
    }
  }

  async checkResult(result: number) {
    if (result < 3) return quizz_questions.results[0];
    if (result >= 3 && result < 5) return quizz_questions.results[1];
    if (result >= 5 && result < 8) return quizz_questions.results[2];
    if (result >= 8 && result < 10) return quizz_questions.results[3];
    if (result >= 10 && result < 12) return quizz_questions.results[4];
    else return quizz_questions.results[5];
  }

  redo(){
    this.finished = false;
    this.questionIndex = 0
    this.questionSelected = this.questions[this.questionIndex];
  }
}
