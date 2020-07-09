import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { Entry } from '../models/Entry'
import {Photo} from '../models/Photo'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntryService {
  BASE_URL = "https://www.reddit.com/r/"
  JSON_STRING = ".json"
  subreddit = "Art+Photografy+ITookAPicture"
  lastLoaded:String = ""
  onReloadCallback:Function;

  constructor(private http:HttpClient) { }

  getEntries(callback) {
    let url = this.BASE_URL + this.subreddit + this.JSON_STRING;
    if(this.lastLoaded !== ""){
      url = url + "?after="+this.lastLoaded;
    }
    this.http.get(url).subscribe((redditJSON:any)=>{
      const entries:Entry[] = [];
      this.lastLoaded = redditJSON.data.after;
      const posts = redditJSON.data.children;
      console.log(posts)
      posts.forEach(post => {
        if(!post.data.is_self){
          let entry = new Entry();
          entry.title = post.data.title;
          entry.image = this.isImage(post.data.url) ?  post.data.url :  post.data.thumbnail;
          entry.link = post.data.url;
          entry.id = post.data.name;
          entries.push(entry)
        }
      });
      callback(entries)
    });
  }

   isImage(url) {
    return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
   }

  changeSub(subreddit){
    this.subreddit = subreddit;
    this.lastLoaded = "";
    this.onReloadCallback();
  }

  registerOnReloadCallback(cb){
    this.onReloadCallback = cb
  }
}
