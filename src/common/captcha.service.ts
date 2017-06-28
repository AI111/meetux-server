/**
 * Created by sasha on 6/19/17.
 */
import {post, RequestResponse} from "request";
import {Config} from "../config/environment";
import * as debug from "debug";
import * as Promise from "bluebird";
const API_URL = "https://www.google.com/recaptcha/api/siteverify";
debug("ts-express:server");
export class GoogleCaptchaService{
    public verifyCaptcha(token: string): Promise<any>{
        if(!token || !token.length) return Promise.reject("token is not defined");
        // return Promise.resolve();~
        return new Promise((resolve: () => void, reject: (any) => void) => {
            // if(Config.env === 'test') return resolve();
            post(API_URL,{form: {secret: Config.secrets.reCaptchaSecrer, response: token}} ,
                (error, res: RequestResponse, body) => {
                if (error || !JSON.parse(body).success) return reject(error || body);
                return resolve();
            });
        });
    }
}
export const captureServiceInstance = new GoogleCaptchaService();
