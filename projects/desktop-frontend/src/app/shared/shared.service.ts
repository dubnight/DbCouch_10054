import { Injectable } from '@angular/core';

@Injectable()
export class SharedService {
    public baseUrl: string = "http://52.175.215.67/dbcouch-web-10054";
    public browser_language: string;
}