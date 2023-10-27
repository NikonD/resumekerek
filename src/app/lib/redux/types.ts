export interface ResumeProfile {
  name: string| undefined;
  email: string| undefined;
  phone: string| undefined;
  url: string| undefined;
  summary: string| undefined;
  location: string| undefined;
  photo?: string| undefined;
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

export interface AdditionalBlockExtended  {
  title: string,
  descriptions: string[];
  summary: string;
  start_date: string;
  end_date: string;
}

export interface Additional {
  heading: string;
  blocks: AdditionalBlockExtended[]
}

export interface Resume {
  profile: ResumeProfile;
  workExperiences: ResumeWorkExperience[];
  educations: ResumeEducation[];
  projects: ResumeProject[];
  skills: ResumeSkills;
  custom: ResumeCustom;
  additional: [Additional];
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