import { CommonModule, NgFor } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import  QUESTIONS_DATA   from '../../../assets/data/quizz_questions.json'


interface Option {
  id: number;
  name: string;
  alias: string;
}

interface Question {
    id: number;
    question: string;
    options:  Option[]
}


@Component({
  selector: 'app-quiz',
  imports: [CommonModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css',
})

export class QuizComponent implements OnInit {
  title: string = ''
  questions: Question[] = []
  questionSelected: Question = {
    id: 0,
    options: [
      {
        id: 0,
        name: 'Teste',
        alias: 'A',
      }
    ],
    question: ''
  }

  answers: string[] =  []
  questionIndex: number = 0
  questionMaxIndex = 0

  finished: boolean = false
  result: string = ''

  ngOnInit(): void {
    if(QUESTIONS_DATA) {
      this.finished = false
    }

    this.title = QUESTIONS_DATA.title
    this.questions = QUESTIONS_DATA.questions
    this.questionSelected = this.questions[this.questionIndex]
    this.questionMaxIndex = this.questions.length
  }

  playerChoose (value: string) {
    this.answers.push(value)
    this.nextStep()
  }

  async nextStep() {
    this.questionIndex++

    if(this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex]
    } else {
      this.finished = true
      this.checkResult(this.answers)
    }

  }

  async checkResult(answers: string[]) {
    const countOfAnswers = answers.reduce((acc, item) => {
      acc[item] = (acc[item] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    if(countOfAnswers['A'] > countOfAnswers['B'] ) {
      this.result = QUESTIONS_DATA.results['A']
    } else  {
      this.result = QUESTIONS_DATA.results['B']
    }
  }
}
