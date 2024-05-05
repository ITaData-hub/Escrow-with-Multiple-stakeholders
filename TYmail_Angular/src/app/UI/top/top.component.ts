import { CommonModule} from '@angular/common';
import { Component, OnInit } from '@angular/core';


export interface TopData{
  place: number;
  name: string;
  bet: number
}


@Component({
  selector: 'app-top',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top.component.html',
  styleUrl: './top.component.css'
})
export class TopComponent implements OnInit {
  topData:TopData[] = []

  ngOnInit(): void {
      this.topData =[{
        place:2,
        name:'CatFroge',
        bet: 98
      },{
        place:1,
        name:'CatFrogee',
        bet: 100
      },{
        place:3,
        name:'CatFroge',
        bet: 97
      },{
        place:4,
        name:'CatFroge',
        bet: 96
      },{
        place:5,
        name:'CatFroge',
        bet: 80
      },{
        place:6,
        name:'CatFroge',
        bet: 70
      },{
        place:7,
        name:'CatFroge',
        bet: 80
      }
    ].sort((a:TopData, b:TopData) => a.place - b.place);
  }
  }

