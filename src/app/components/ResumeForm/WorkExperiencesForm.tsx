import { Form, FormSection } from "components/ResumeForm/Form";
import {
  Input,
  BulletListTextarea,
  InputDate,
} from "components/ResumeForm/Form/InputGroup";
import type { CreateHandleChangeArgsWithDescriptions } from "components/ResumeForm/types";
import { useAppDispatch, useAppSelector } from "lib/redux/hooks";
import {
  changeWorkExperiences,
  selectWorkExperiences,
} from "lib/redux/resumeSlice";
import type { ResumeWorkExperience } from "lib/redux/types";
import { useTranslation } from "react-i18next";

export const WorkExperiencesForm = () => {
  const workExperiences = useAppSelector(selectWorkExperiences);
  const dispatch = useAppDispatch();

  const showDelete = workExperiences.length > 1;
  console.log(workExperiences)

  const { t } = useTranslation()

  return (
    <Form form="workExperiences" addButtonText={t("add-a-note")}>
      {workExperiences.map(({ company, jobTitle, end_date, start_date, descriptions }, idx) => {
        const handleWorkExperienceChange = (
          ...[
            field,
            value,
          ]: CreateHandleChangeArgsWithDescriptions<ResumeWorkExperience>
        ) => {
          // TS doesn't support passing union type to single call signature
          // https://github.com/microsoft/TypeScript/issues/54027
          // any is used here as a workaround
          dispatch(changeWorkExperiences({ idx, field, value } as any));
        };
        const showMoveUp = idx !== 0;
        const showMoveDown = idx !== workExperiences.length - 1;

        return (
          <FormSection
            key={idx}
            form="workExperiences"
            idx={idx}
            showMoveUp={showMoveUp}
            showMoveDown={showMoveDown}
            showDelete={showDelete}
            deleteButtonTooltipText={t("delete-a-note")}
          >
            <Input
              label={t("company-name-label")}
              labelClassName="col-span-full max-sm:col-span-full"
              name="company"
              placeholder=""
              value={company}
              onChange={handleWorkExperienceChange}
            />
            <Input
              label={t("position-label")}
              labelClassName="col-span-full max-sm:col-span-full"
              name="jobTitle"
              placeholder=""
              value={jobTitle}
              onChange={handleWorkExperienceChange}
            />
            <div className="col-span-full max-sm:col-span-full flex flex-row justify-between">
              <div className="">
                <InputDate
                  label={t("start-date")}
                  labelClassName="col-span-full max-sm:col-span-full"
                  name="start_date"
                  placeholder=""
                  value={start_date}
                  onChange={handleWorkExperienceChange}
                />
              </div>
              <div className="">
                <InputDate
                  label={t("expiration-date")}
                  labelClassName="col-span-full max-sm:col-span-full flex-1"
                  name="end_date"
                  placeholder=""
                  value={end_date}
                  onChange={handleWorkExperienceChange}
                />
              </div>
            </div>
            <BulletListTextarea
              label={t("work-description-label")}
              labelClassName="col-span-full max-sm:col-span-full"
              name="descriptions"
              placeholder=""
              value={descriptions}
              onChange={handleWorkExperienceChange}
            />
          </FormSection>
        );
      })}
    </Form>
  );
};
