import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DbpediaService {

  private dbe = 'http://dbpedia.org/sparql';
  params: string;

  constructor(private http: HttpClient) { }

  getSingerInfo(singer: string) {
		return this.http.get(this.dbe, {
			params: {
				query: `
					SELECT DISTINCT ?abstract
					(GROUP_CONCAT(?genre;separator="#") AS ?genres)
					WHERE{
						VALUES ?type {"group_or_band" "solo_singer"}
						?artist foaf:name "` + singer + `"@en.
						OPTIONAL{ ?artist dbo:genre ?genre. }
						?artist dbo:abstract ?abstract.
						OPTIONAL{ ?artist dbo:background ?type. }
						FILTER langMatches(lang(?abstract),"en")
					}`,
				format: 'json'
			}
		});
  }
	
  getSongInfo(song: string, singer: string) {
		return this.http.get(this.dbe, {
			params: {
				query: `
					PREFIX purl: <http://purl.org/linguistics/gold/>
					SELECT DISTINCT ?abstract ?album
					WHERE{
						?song foaf:name "` + song + `"@en.
						?song purl:hypernym dbr:Song.
						?song dbo:abstract ?abstract.
						?song dbo:album ?album.
						FILTER langMatches(lang(?abstract),"en")
						FILTER contains(?abstract, "` + singer + `")
					}`,
				format: 'json'
			}
		});
  }
  
  getAlbumInfo(album: string) {
		return this.http.get(this.dbe, {
			params: {
				query: `
					PREFIX purl: <http://purl.org/linguistics/gold/>
					SELECT ?abstract ?year ?name
					WHERE{
						<` + album + `> dbo:abstract ?abstract.
						<` + album + `> dbo:releaseDate ?year.
						<` + album + `> foaf:name ?name
						FILTER langMatches(lang(?abstract),"en")
					}`,
				format: 'json'
			}
		});
  }
  
  getGenreInfo(genre: any) {
		genre = genre.split("#");
		for(var i = 0; i < genre.length; i++)	genre[i] = "<" + genre[i] + ">";
		genre = genre.toString().replace(/,/g,' ');
		return this.http.get(this.dbe, {
			params: {
				query: `
				SELECT DISTINCT ?abstract ?name
				WHERE{
					VALUES ?genres {` + genre + `}
					?genres foaf:name ?name.
					?genres dbo:abstract ?abstract.
					FILTER langMatches(lang(?abstract),"en")
				}`,
				format: 'json'
			}
		});
  }
  
}
