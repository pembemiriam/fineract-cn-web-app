/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import * as security from './security.actions';
import {LoginSuccessPayload} from './security.actions';
import {Authentication} from '../../sevices/identity/domain/authentication.model';

export interface State {
  username: string;
  tenant: string;
  authentication: Authentication;
  loading: boolean;
  error: Error;
  passwordError: Error;
}

const initialState: State = {
  username: null,
  tenant: null,
  authentication: null,
  loading: false,
  error: null,
  passwordError: null
};

export function reducer(state = initialState, action: security.Actions): State {
  switch (action.type) {

    case security.LOGIN: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case security.LOGIN_SUCCESS: {
      const payload: LoginSuccessPayload = action.payload;
      return Object.assign({}, state, {
        loading: false,
        authentication: payload.authentication,
        username: payload.username,
        tenant: payload.tenant
      });
    }

    case security.REFRESH_ACCESS_TOKEN_SUCCESS: {
      const authentication = action.payload;
      return Object.assign({}, state, {
        authentication
      });
    }

    case security.CHANGE_PASSWORD_FAIL: {
      const error = action.payload;
      return Object.assign({}, state, {
        passwordError: error
      });
    }

    case security.LOGIN_FAIL: {
      const error = action.payload;
      return Object.assign({}, state, {
        loading: false,
        error
      });
    }

    case security.LOGOUT_SUCCESS: {
      return initialState;
    }

    default:
      return state;
  }
}

export const getAuthentication = (state: State) => state.authentication;

export const getTenant = (state: State) => state.tenant;

export const getUsername = (state: State) => state.username;

export const getError = (state: State) => state.error;

export const getPasswordError = (state: State) => state.passwordError;

export const getLoading = (state: State) => state.loading;
