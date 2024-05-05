import { NgFor } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

export interface CatResponse{
  current_page: number
  data: []
  first_page_url: string
  from: number
  last_page: number
  links: []
  next_page_url: string
  path: string
  per_page: number
  prev_page_url: null
  to: number
  total: number
}

export interface CatData{
  fact: string
  length: number
}


@Component({
  selector: 'app-cotolenta',
  standalone: true,
  imports: [HttpClientModule, NgFor],
  templateUrl: './cotolenta.component.html',
  styleUrl: './cotolenta.component.css'
})
export class CotolentaComponent implements OnInit{

  catDatas:CatData[] = []


  constructor (private http: HttpClient) {}


  ngOnInit(){

    
    this.http.get<CatResponse>('https://catfact.ninja/facts')
    .subscribe(resp=>{
      this.catDatas = resp.data;
    }, error => {
      this.catDatas = [{fact:"Couldn't get the facts about the seals. We are already working on it. Don't know, cats are the best creatures in the world!!!", length:0}]
    })
  }
}
