import { Component, DoCheck, ElementRef, OnChanges, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { TopComponent } from '../../UI/top/top.component';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface UserData{
  name:string
  balance: number
}

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [TopComponent, CommonModule, FormsModule],
  templateUrl: './room.component.html',
  styleUrl: './room.component.css'
})
export class RoomComponent implements DoCheck{

  @ViewChild('sliderLabel', {static:true}) sliderLabel?: ElementRef;
  
  constructor(
    private render:Renderer2
  ) {}

  userData:UserData = {name:"Cat_Monster", balance: 100}
  value = 0
  presValue = 0
  img:string ="/assets/img/0-8.png"
  ngDoCheck(): void {
    console.log(this.sliderLabel)
    this.render.setStyle(this.sliderLabel?.nativeElement, "transform", `translateX(${(+this.value-50) * 2.28}px)`)
    this.presValue = Math.floor(+this.value/100 * this.userData.balance)

    if (+this.value<=8 && +this.value>=0){
      this.img= "/assets/img/0-8.png"
    }
    if (+this.value<=16 && +this.value>=9){
      this.img= "/assets/img/9-16.png"
    }
    if (+this.value<=24 && +this.value>=17){
      this.img= "/assets/img/17-24.png"
    }
    if (+this.value<=32 && +this.value>=25){
      this.img= "/assets/img/0-8.png"
    }
    if (+this.value<=40 && +this.value>=33){
      this.img= "/assets/img/33-40.png"
    }
    if (+this.value<=48 && +this.value>=41){
      this.img= "/assets/img/41-48.png"
    }
    if (+this.value<=56 && +this.value>=49){
      this.img= "/assets/img/49-56.png"
    }
    if (+this.value<=64 && +this.value>=57){
      this.img= "/assets/img/57-64.png"
    }
    if (+this.value<=72 && +this.value>=65){
      this.img= "/assets/img/65-72.png"
    }
    if (+this.value<=80 && +this.value>=73){
      this.img= "/assets/img/73-80.png"
    }
    if (+this.value<=85 && +this.value>=81){
      this.img= "/assets/img/81-85.png"
    }
    if (+this.value<=90 && +this.value>=86){
      this.img= "/assets/img/86-87.png"
    }
    if (+this.value<=100 && +this.value>=91){
      this.img= "/assets/img/88-100.png"
    }
  }
}
