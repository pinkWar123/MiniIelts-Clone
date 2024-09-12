import { QuestionTypeEnum } from "../../contants/questionType";

export interface TotalStatistics {
  totalUsers: number;
  totalTests: number;
  totalTestTakenTimes: number;
}

export interface TopTest {
  title: string;
  viewCount: number;
  createdOn: string;
}

export interface TopUser {
  userName: string;
  email: string;
  totalTestTakenTimes: number;
}

export interface TopStatistics {
  topTests: TopTest[];
  topUsers: TopUser[];
}

export interface QuestionAccuracy {
  questionType: QuestionTypeEnum;
  accuracy: number;
}

export interface Accuracy {
  questionAccuracies: QuestionAccuracy[];
}

export interface QuestionDistributionDetail {
  questionType: QuestionTypeEnum;
  distribution: number;
}
export interface QuestionDistribution {
  questionDistributionDetails: QuestionDistributionDetail[];
}

export interface ScoreDistributionDetail {
  floorScore: number;
  number: number;
}
export interface ScoreDistribution {
  scoreDistributionDetails: ScoreDistributionDetail[];
}
