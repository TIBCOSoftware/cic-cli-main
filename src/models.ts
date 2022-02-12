/**
 * Copyright 2022. TIBCO Software Inc.
 * This file is subject to the license terms contained
 * in the license file that is distributed with this file.
 */

export interface GenerateTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  refresh_token_expires_in: number;
}

export interface RegisterClientResponse {
  grant_types: string[];
  redirect_uris: string[];
  token_endpoint_auth_method: string;
  client_id: string;
  software_id: string;
  software_statement: string;
  client_secret_expires_at: number;
  scope: string;
  software_version: string;
  client_id_issued_at: number;
  client_secret: string;
  client_name: string;
  response_types: string[];
}

export interface UserInfo {
  sub: string;
  email_verified: boolean;
  name: string;
  organization_name: string;
  given_name: string;
  family_name: string;
  email: string;
}
