import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { Entry } from '../models/Entry'


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
      posts.forEach(post => {
        if(!post.data.is_self){
          console.log(post);
          let entry = new Entry();
          entry.title = post.data.title;
          entry.image = this.isImage(post.data.url) ?  post.data.url :  post.data.thumbnail;
          entry.link = "https://www.reddit.com" + post.data.permalink;
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
