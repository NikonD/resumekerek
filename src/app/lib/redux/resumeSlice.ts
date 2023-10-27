import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "lib/redux/store";
import type {
  Additional,
  AdditionalBlockExtended,
  FeaturedSkill,
  Resume,
  ResumeEducation,
  ResumeProfile,
  ResumeProject,
  ResumeSkills,
  ResumeWorkExperience,
} from "lib/redux/types";
import type { ShowForm } from "lib/redux/settingsSlice";

export const initialBlock: AdditionalBlockExtended = {
  title: "",
  summary: "",
  descriptions: [],
  start_date: "",
  end_date: "",
}

export const initialAdditional: Additional = {
  heading: "",
  blocks: [initialBlock]
}

export const initialProfile: ResumeProfile = {
  name: "",
  summary: "",
  email: "",
  phone: "",
  location: "",
  url: "",
};

export const initialWorkExperience: ResumeWorkExperience = {
  company: "",
  jobTitle: "",
  end_date: "",
  start_date: "",
  descriptions: [],
};

export const initialEducation: ResumeEducation = {
  school: "",
  degree: "",
  gpa: "",
  end_date: "",
  start_date: "",
  descriptions: [],
};

export const initialProject: ResumeProject = {
  project: "",
  end_date: "",
  start_date: "",
  descriptions: [],
};

export const initialFeaturedSkill: FeaturedSkill = { skill: "", rating: 4 };
export const initialFeaturedSkills: FeaturedSkill[] = Array(6).fill({
  ...initialFeaturedSkill,
});
export const initialSkills: ResumeSkills = {
  featuredSkills: initialFeaturedSkills,
  descriptions: [],
};

export const initialCustom = {
  descriptions: [],
};

export const initialResumeState: Resume = {
  profile: initialProfile,
  workExperiences: [initialWorkExperience],
  educations: [initialEducation],
  projects: [initialProject],
  skills: initialSkills,
  custom: initialCustom,
  additional: [initialAdditional]
};

// Keep the field & value type in sync with CreateHandleChangeArgsWithDescriptions (components\ResumeForm\types.ts)
export type CreateChangeActionWithDescriptions<T> = {
  idx: number;
} & (
    | {
      field: Exclude<keyof T, "descriptions">;
      value: string;
    }
    | { field: "descriptions"; value: string[] }
  );

export const resumeSlice = createSlice({
  name: "resume",
  initialState: initialResumeState,
  reducers: {
    changeProfile: (
      draft,
      action: PayloadAction<{ field: keyof ResumeProfile; value: string | undefined }>
    ) => {
      const { field, value } = action.payload;
      draft.profile[field] = value;
    },
    changeWorkExperiences: (
      draft,
      action: PayloadAction<
        CreateChangeActionWithDescriptions<ResumeWorkExperience>
      >
    ) => {
      const { idx, field, value } = action.payload;
      const workExperience = draft.workExperiences[idx];
      workExperience[field] = value as any;
    },
    changeEducations: (
      draft,
      action: PayloadAction<CreateChangeActionWithDescriptions<ResumeEducation>>
    ) => {
      const { idx, field, value } = action.payload;
      const education = draft.educations[idx];
      education[field] = value as any;
    },
    changeProjects: (
      draft,
      action: PayloadAction<CreateChangeActionWithDescriptions<ResumeProject>>
    ) => {
      const { idx, field, value } = action.payload;
      const project = draft.projects[idx];
      project[field] = value as any;
    },
    changeSkills: (
      draft,
      action: PayloadAction<
        | { field: "descriptions"; value: string[] }
        | {
          field: "featuredSkills";
          idx: number;
          skill: string;
          rating: number;
        }
      >
    ) => {
      const { field } = action.payload;
      if (field === "descriptions") {
        const { value } = action.payload;
        draft.skills.descriptions = value;
      } else {
        const { idx, skill, rating } = action.payload;
        const featuredSkill = draft.skills.featuredSkills[idx];
        featuredSkill.skill = skill;
        featuredSkill.rating = rating;
      }
    },
    changeCustom: (
      draft,
      action: PayloadAction<{ field: "descriptions"; value: string[] }>
    ) => {
      const { value } = action.payload;
      draft.custom.descriptions = value;
    },
    changeAdditional: (
      draft,
      action: PayloadAction<CreateChangeActionWithDescriptions<Additional>>
    ) => {
      const { idx, field, value } = action.payload;
      const additionalBlock = draft.additional[idx];

      // В зависимости от типа поля выполнить соответствующие действия
      if (field === "descriptions") {
        additionalBlock.blocks[0].descriptions = value as string[];
      } else {
        additionalBlock[field] = value as any;
      }
    },
    addSectionInForm: (draft, action: PayloadAction<{ form: ShowForm }>) => {
      const { form } = action.payload;
      switch (form) {
        case "workExperiences": {
          draft.workExperiences.push(structuredClone(initialWorkExperience));
          return draft;
        }
        case "educations": {
          draft.educations.push(structuredClone(initialEducation));
          return draft;
        }
        case "projects": {
          draft.projects.push(structuredClone(initialProject));
          return draft;
        }
      }
    },
    moveSectionInForm: (
      draft,
      action: PayloadAction<{
        form: ShowForm;
        idx: number;
        direction: "up" | "down";
      }>
    ) => {
      const { form, idx, direction } = action.payload;
      if (form !== "skills" && form !== "custom") {
        if (
          (idx === 0 && direction === "up") ||
          (idx === draft[form].length - 1 && direction === "down")
        ) {
          return draft;
        }

        const section = draft[form][idx];
        console.log(draft[form][idx])
        console.log(draft[form][idx - 1])
        if (direction === "up") {
          draft[form][idx] = draft[form][idx - 1];
          draft[form][idx - 1] = section;
          console.log(draft[form][idx])
          console.log(draft[form][idx - 1])
        } else {
          draft[form][idx] = draft[form][idx + 1];
          draft[form][idx + 1] = section;
          console.log(draft[form][idx])
          console.log(draft[form][idx + 1])
        }
      }
    },
    deleteSectionInFormByIdx: (
      draft,
      action: PayloadAction<{ form: ShowForm; idx: number }>
    ) => {
      const { form, idx } = action.payload;
      if (form !== "skills" && form !== "custom") {
        draft[form].splice(idx, 1);
      }
    },
    setResume: (draft, action: PayloadAction<Resume>) => {
      return action.payload;
    },
    clearResume: (state) => {
      state.custom = initialCustom
      state.educations = [initialEducation]
      state.projects = [initialProject]
      state.skills = initialSkills
      state.workExperiences = [initialWorkExperience]
    }
  },
});

export const {
  changeProfile,
  changeWorkExperiences,
  changeEducations,
  changeProjects,
  changeSkills,
  changeCustom,
  changeAdditional,
  addSectionInForm,
  moveSectionInForm,
  deleteSectionInFormByIdx,
  setResume,
  clearResume
} = resumeSlice.actions;

export const selectResume = (state: RootState) => state.resume;
export const selectProfile = (state: RootState) => state.resume.profile;
export const selectWorkExperiences = (state: RootState) => state.resume.workExperiences;
export const selectEducations = (state: RootState) => state.resume.educations;
export const selectProjects = (state: RootState) => state.resume.projects;
export const selectSkills = (state: RootState) => state.resume.skills;
export const selectCustom = (state: RootState) => state.resume.custom;
export const selectAdditional = (state: RootState) => state.resume.additional;

export default resumeSlice.reducer;
