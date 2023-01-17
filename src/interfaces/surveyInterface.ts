import { DaySurveyInterface } from "./daySurveyInterface";

export interface SurveyInterface {
  before: DaySurveyInterface;
  day: number;
  after: number;
}

export interface BeforeSurveyInfoInterface {
  state: {
    isBeforeSurveyInfo : boolean
  }
}