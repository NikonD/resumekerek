export interface ResumeProfile {
  name: string;
  email: string;
  phone: string;
  url: string;
  summary: string;
  location: string;
  photo?: string;
}

export interface ResumeWorkExperience {
  company: string;
  jobTitle: string;
  start_date: string;
  end_date: string;
  descriptions: string[];
}

export interface ResumeEducation {
  school: string;
  degree: string;
  start_date: string;
  end_date: string;
  gpa: string;
  descriptions: string[];
}

export interface ResumeProject {
  project: string;
  start_date: string;
  end_date: string;
  descriptions: string[];
}

export interface FeaturedSkill {
  skill: string;
  rating: number;
}

export interface ResumeSkills {
  featuredSkills: FeaturedSkill[];
  descriptions: string[];
}

export interface ResumeCustom {
  descriptions: string[];
}

export interface Resume {
  profile: ResumeProfile;
  workExperiences: ResumeWorkExperience[];
  educations: ResumeEducation[];
  projects: ResumeProject[];
  skills: ResumeSkills;
  custom: ResumeCustom;
}

export type ResumeKey = keyof Resume;


export interface IUserData {
  id?: number,
  islogin: boolean,
  photo: string,
  fullname: string,
  language: string,
  address: string,
  phone: string,
  email: string,
  plan: string,
  active_until?: Date
}