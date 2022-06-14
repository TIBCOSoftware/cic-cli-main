/**
 * Copyright 2022. TIBCO Software Inc.
 * This file is subject to the license terms contained
 * in the license file that is distributed with this file.
 */

import * as http from 'http';
import * as query from 'querystring';
import { createHash } from 'crypto';
import { AxiosRequestConfig, CLIBaseError, HTTPError, HTTPRequest, region } from '@tibco-software/cic-cli-core';
import { EventEmitter } from 'events';
import { GenerateTokenResponse, RegisterClientResponse, UserInfo } from '../models';
import * as CONFIG from '../configs-for-config/config.json';

const BASE_URL = CONFIG.BASE_URL;
let server: http.Server;

export class CLIAuth {
  req: HTTPRequest;
  defaultScope: string[];
  codeVerifier: string;
  codeChallenge: string;
  codeChallengeMethod: string;

  constructor(cmdName?: string, pluginName?: string) {
    this.req = new HTTPRequest(cmdName, pluginName);
    this.defaultScope = ['securitycontext', 'internal.refresh-session', 'offline', 'offline_access', 'TSC'];
    this.codeVerifier = this.genRandomTxt();
    this.codeChallenge = this.encyrptS256(this.codeVerifier);
    this.codeChallengeMethod = 'S256';
  }

  async startLocalServer(event: EventEmitter) {
    return new Promise<string>((resolve, reject) => {
      server = http.createServer(this.requestListener(event));
      server.listen(0, '127.0.0.1', () => {
        let addr = server.address();
        if (typeof addr === 'object') resolve(`http://${addr?.address}:${addr?.port}/`);
      });
    });
  }

  requestListener(event: EventEmitter) {
    return function (req: any, res: any) {
      let url = req.url;

      if (url.includes('favicon.ico')) {
        res.statusCode = 204;
        return res.end();
      }

      let str = url.slice(url.indexOf('?') + 1, req.url.length);
      let queryParams = query.parse(str);

      if (queryParams.code) {
        res.writeHead(200);
        res.end('Authenticated Sucessfully, please close the browser and switch back to command line');
        event.emit('onBrowserResponse', { code: queryParams.code });
      } else if (queryParams.error) {
        res.writeHead(200);
        res.end(`Error: ${queryParams.error}; ${queryParams.error_description}`);
        event.emit('onBrowserResponse', { error: queryParams.error, description: queryParams.error_description });
      } else {
        res.writeHead(200);
        res.end('Error: Something went wrong');
        event.emit('onBrowserResponse', { error: 'Unidentified error, could not fetch code' });
      }
    };
  }

  async registerClient(redirect_uri: string) {
    let data = {
      software_statement: CONFIG.SOFTWARE_STATEMENT,
      redirect_uris: [redirect_uri],
    };
    let response;
    try {
      response = await this.req.doRequest(
        CONFIG.PATHS.REGISTER_CLIENT,
        { baseURL: BASE_URL, headers: { 'Content-Type': 'application/json' }, method: 'POST' },
        data
      );
    } catch (err) {
      if (err instanceof HTTPError)
        throw new CLIBaseError(
          'Error occured while registering client\n' + JSON.stringify(err.httpResponse) + ' ' + err.httpCode
        );
    }

    return response?.body as RegisterClientResponse;
  }

  getBrowserURL(scope: string[], region: region, serverAddrs: string, clientId: string) {
    let url = new URL(BASE_URL + '/idm/v1/oauth2/auth');

    if (region != 'us') {
      url.hostname = region + '.' + url.hostname;
    }

    scope = [...this.defaultScope, ...scope];
    url.searchParams.append('scope', scope.join('+'));
    url.searchParams.append('response_type', 'code');
    url.searchParams.append('redirect_uri', serverAddrs);
    url.searchParams.append('client_id', clientId);
    url.searchParams.append('code_challenge', this.codeChallenge);
    url.searchParams.append('code_challenge_method', this.codeChallengeMethod);
    url.searchParams.append('prompt', 'login');

    return decodeURIComponent(url.href);
  }

  async generateToken(clientId: string, clientSecret: string, serverAddrs: string, code: string, region: region) {
    const code_verifier = this.codeVerifier;
    const grant_type = 'authorization_code';

    let url = new URL(BASE_URL);

    if (region != 'us') {
      url.hostname = region + '.' + url.hostname;
    }

    let temp: string[] = [];
    temp.push(`client_id=${clientId}`);
    temp.push(`redirect_uri=${serverAddrs}`);
    temp.push(`code=${code}`);
    temp.push(`code_verifier=${code_verifier}`);
    temp.push(`grant_type=${grant_type}`);

    let body = temp.join('&');

    let options: AxiosRequestConfig = {
      baseURL: url.href,
      auth: { username: clientId, password: clientSecret },
      method: 'POST',
      headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    };

    let response;
    try {
      response = await this.req.doRequest(CONFIG.PATHS.GEN_TOKEN, options, body);
    } catch (err) {
      if (err instanceof HTTPError) {
        throw new CLIBaseError(
          'Error occured while generating token\n' + JSON.stringify(err.httpResponse) + ' ' + err.httpCode
        );
      }
      throw err;
    }

    return response?.body as GenerateTokenResponse;
  }

  async getOrg(token: string, region: region) {
    let options = {
      baseURL: this.addRegionToURL(BASE_URL, region),
      headers: { Authorization: 'Bearer ' + token },
    };

    let body: UserInfo;
    try {
      let resp = await this.req.doRequest(CONFIG.PATHS.GET_ORG, options);
      body = resp.body;
      return body.organization_name;
    } catch (err) {
      if (err instanceof HTTPError) {
        throw new CLIBaseError(
          'Error occured while fetching Org \n' + JSON.stringify(err.httpResponse) + ' ' + err.httpCode
        );
      }

      throw err;
    }
  }

  async stopLocalServer() {
    if (server) {
      server.close();
    }
  }

  addRegionToURL(url: string, region: region) {
    let u = new URL(url);

    if (region != 'us') {
      u.hostname = region + '.' + u.hostname;
    }
    return u.href;
  }

  private genRandomTxt(length = 16) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  private encyrptS256(str: string) {
    return createHash('sha256').update(str).digest('hex');
  }
}
