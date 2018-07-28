import {Injectable} from "@angular/core";
@Injectable(
  )
export class Tokens {
    static jwt: string;

         set(jwt: string) {
            Tokens.jwt = jwt;
        }

        get() {
            return Tokens.jwt;
        }}