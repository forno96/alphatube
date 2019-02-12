import { Component, OnInit, ViewEncapsulation, HostListener} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// ~ import { of } from 'rxjs';

import { AlphalistService } from '../../../services/alphalist/alphalist.service';
import { YoutubeService } from '../../../services/youtube/youtube.service';
// file json con playlist
//import * as data from '../../../page/videopage/recommender/playlist.json';


@Component({
  selector: 'app-recommender',
  templateUrl: './recommender.component.html',
  styleUrls: ['./recommender.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RecommenderComponent implements OnInit {

  nVideo = 12;
  r10s: any;
    //~ [x]   random: any[],
    //~ [x]   search: any[],
    //~ [x]   related: any[],
    //~ [x]    recent: any[],
    //~ [x]   fvitali: any[],
    //~ []    popularity: any[],
    //~ []    similarity: any[]

  constructor(
    private alphalistService: AlphalistService,
    private route: ActivatedRoute,
    private ytService: YoutubeService
  ) { }

  ngOnInit() {
    this.r10s = {};
    this.route.params.subscribe( params => {

      //random
      let idPlay = { //playlist possibili
        playlists:[
          {"playlistId":"PLUg_BxrbJNY5gHrKsCsyon6vgJhxs72AH"},
          {"playlistId":"PLVXq77mXV53-Np39jM456si2PeTrEm9Mj"},
          {"playlistId":"PLTAOP-hZyrHtWfeOJVAvoN5OnuzNNQ0Yw"},
          {"playlistId":"PLTDluH66q5mpm-Bsq3GlwjMOHITt2bwXE"},
          {"playlistId":"PLS_oEMUyvA728OZPmF9WPKjsGtfC75LiN"},
          {"playlistId":"PLLMA7Sh3JsOQQFAtj1no-_keicrqjEZDm"},
          {"playlistId":"PLq-ZRVZ1W4Fesh7aKXj8np40uUZJTGBmR"},
          {"playlistId":"PLA-94DyrXTGigxYXPXnRXDDSZ-K0sJxMn"},
          {"playlistId":"PLC0w3lEHx2SF3NsbnqnLbWBWyF_3g0cjZ"},
          {"playlistId":"PLmuBNwnyyiySB56boer3K2a5B83CqUjA4"},
          {"playlistId":"PLGdZ-INw7mfA3VjyfA0I24xhEuh8UuZWa"}
        ]
      }

      //id playlist casuale da playlists
      let idPlaytmp= idPlay.playlists[Math.floor(Math.random()*idPlay.playlists.length)].playlistId;
      this.ytService.getPlaylist(idPlaytmp).subscribe(
        //data sono i 30 video presi dalla playlist, tramite getPlaylist da youtube.service
        (data:any)=>{
            let randomListVideoId = [];
            let i=0;
            //finche non sono stati inseriti 12 video
            while(i< 20 && data.items.length !=0 ){
              //metto dentro all'array degli id dei video, id di video casuali tramite data.items
              randomListVideoId[i]=data.items.splice(Math.floor(Math.random()*data.items.length), 1)[0].snippet.resourceId.videoId;
              i=i+1;
            }
            this.ytService.getVideo(randomListVideoId.join()).subscribe( // joins all the elements of an array into a string
              (obj: any) => {
                this.r10s['random'] = this.fromYT(obj);
              },
              error => console.log(error)
            );
        }
      )

      // search
      if (localStorage.q) {
        this.ytService.getRecommenders({q: localStorage.q}).subscribe(
          (data: any) => this.r10s['search'] = this.fromYT(data).filter(
            obj => obj.videoID !== params.videoId
          ),
          error => console.log(error)
        );
      }

      // related
      this.ytService.getRecommenders({relatedToVideoId: params.videoId, maxResults: this.nVideo}).subscribe(
        (data: any) => this.r10s['YT related'] = this.fromYT(data),
        error => console.log(error)
      );

      // recent
      //salvo in lastWatched le stringhe parsate in JSON di localStorage
      let lastWatched = JSON.parse(localStorage.getItem('lastWatched'));
      //se lastWatched contiene qualcosa
      if (lastWatched.length !=0){
      //Passo l'array lastWatched trasformato in un unica stringa di videoId concatenati
      //a getVideo,  che fa la richiesta a YT che ritorna tutto l'oggetto
        this.ytService.getVideo(lastWatched.join()).subscribe(
        //subscribe permette di dare tempo al programma di rispondere, in modo asincrono
          (data:any) => {
          //mette dentro all array r10s i video filtrati per non mettere il video corrente prendendo i valori con froYT
            this.r10s['recent']= this.fromYT(data).filter(
              obj => obj.videoID != params.videoId
            );
          },
          error => console.log(error)
        );
      }

      // fvitali
      this.alphalistService.getGlobpop(params.videoId).subscribe(
        (data: any) => {
          let idList = [];
          data.recommended.forEach(
            function (value, index) {idList[index]=data.recommended[index].videoID;}
          );
          this.ytService.getVideo(idList.join()).subscribe(
            (obj: any) => {
              let tmpList = this.fromYT(obj);
              for (let i in tmpList){
                tmpList[i].reason =
                data.recommended.filter(
                  function (element){
                    return element.videoID == tmpList[i].videoID;
                  }
                )[0].prevalentReason;
              }
              this.r10s['fvitali'] = tmpList;
            },
            error => console.log(error)
          );
        },
        error => console.log(error)
      );
    });
  }

  fromYT(data: any) {
    let results: {artist: string, title: string, videoID: string, img: string, reason: string}[] = [];
    for (let i in data.items) {
      if ((!data.items.status) || (!data.items[i].status.publicStatsViewable && !data.items[i].status.embeddable)){
        results.push(
          {
            artist: data.items[i].snippet.channelTitle,
            title: data.items[i].snippet.title,
            videoID: (data.items[i].id.videoId) ? data.items[i].id.videoId : data.items[i].id,
            img: data.items[i].snippet.thumbnails.medium.url,
            reason: ''
          }
        );
      }
    }
    return results;
  }
}
