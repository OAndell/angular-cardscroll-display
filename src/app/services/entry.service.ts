import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { Entry } from '../models/Entry'
import {Photo} from '../models/Photo'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntryService {
  API_URL = "https://jsonplaceholder.typicode.com/photos"
  API_URL2 = "https://www.reddit.com/r/pics.json"

  lastLoaded:String = ""

  constructor(private http:HttpClient) { }

  getEntries(callback) {
    let url;
    if(this.lastLoaded === ""){
      url = this.API_URL2;
    }else{
      url = this.API_URL2 + "?after="+this.lastLoaded;
    }
    console.log(url)

    this.http.get(url).subscribe((redditJSON)=>{
      const entries:Entry[] = [];
      this.lastLoaded = redditJSON.data.after;
      const posts = redditJSON.data.children;
      console.log(posts)
      posts.forEach(post => {
        if(!post.data.is_self){
          let entry = new Entry();
          entry.title = post.data.title;
          entry.image = post.data.url;
          entry.link = post.data.url;
          entries.push(entry)
        }
      });
  
      callback(entries)
    });
  }
}
