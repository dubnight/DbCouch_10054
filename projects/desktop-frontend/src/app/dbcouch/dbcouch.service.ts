import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { ConfigService } from '../config/config.service';
import { ApiService } from '../config/api.service';
import { IDbCouch } from './dbcouch';

@Injectable()
export class DbCouchService {
    constructor(private _http : Http,private config: ConfigService, private apiService: ApiService){}

    create_DbCouch(dbcouch: IDbCouch): Observable<IDbCouch>{
        return this.apiService.post(this.config.api_url+`/DbCouch_Default_Activity/DbCouch/`,dbcouch);

    }
    update_DbCouch(dbcouch: IDbCouch): Observable<IDbCouch>{
        return this.apiService.put(this.config.api_url+`/DbCouch_Default_Activity/DbCouch/`,dbcouch);

    }
    search_for_update_DbCouch(dbcouch_id: number): Observable<IDbCouch>{
        return this.apiService.get(this.config.api_url+`/DbCouch_Default_Activity/DbCouch/${dbcouch_id}`);

    }
    delete_DbCouch(dbcouch: IDbCouch): Observable<IDbCouch>{
        return this.apiService.delete(this.config.api_url+`/DbCouch_Default_Activity/DbCouch/${dbcouch.id}`);

    }
    get_all_DbCouch(): Observable<IDbCouch[]>{
        return this.apiService.get(this.config.api_url+`/DbCouch_Default_Activity/DbCouch/`);

    }
}