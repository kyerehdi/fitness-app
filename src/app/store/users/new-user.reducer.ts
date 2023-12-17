import { createReducer, on } from '@ngrx/store';
import * as newUserActions from './new-user.actions';
import cloneDeep from 'lodash.clonedeep';

export interface newUser {
  email: string;
  password: string;
}

export interface newPerson {
  fullName: string;
  age: number;
  email: string;
  number: string;
  goal: string;
  height: number;
  weight: number;
  gender: string;
  userID: number | null;
}

export interface UserStateI {
  user: newUser | null;
  person: newPerson;
}

export const UserState: UserStateI = {
  user: null,
  person: {
    fullName: '',
    age: 0,
    email: '',
    number: '',
    goal: '',
    height: 0,
    weight: 0,
    gender: '',
    userID: 0,
  },
};

export const newUserReducer = createReducer(
  UserState,
  on(newUserActions.SetUser, (state, action) => {
    return {
      ...state,
      user: action.user,
    };
  }),

  on(newUserActions.SetGender, (state, action) => {
    const person = cloneDeep(state.person);
    person.gender = action.gender;
    return {
      ...state,
      person: person,
    };
  }),

  on(newUserActions.SetWeightAndHeight, (state, action) => {
    const person = cloneDeep(state.person);
    person.weight = action.weight;
    person.height = action.height;

    return {
      ...state,
      person: person,
    };
  }),

  on(newUserActions.SetGoal, (state, action) => {
    const person = cloneDeep(state.person);
    person.goal = action.goal;

    return {
      ...state,
      person: person,
    };
  }),

  on(newUserActions.SetUserProfile, (state, action) => {
    const person = cloneDeep(state.person);
    person.age = action.age;
    person.fullName = action.fullName;
    person.number = action.phoneNumber;

    return {
      ...state,
      person: person,
    };
  }),

  on(newUserActions.SubmitUser, (state) => {
    return {
      ...state,
    };
  })
);
