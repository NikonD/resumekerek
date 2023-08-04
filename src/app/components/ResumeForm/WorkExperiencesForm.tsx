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

export const WorkExperiencesForm = () => {
  const workExperiences = useAppSelector(selectWorkExperiences);
  const dispatch = useAppDispatch();

  const showDelete = workExperiences.length > 1;
  console.log(workExperiences)
  return (
    <Form form="workExperiences" addButtonText="Добавить запись">
      {workExperiences.map(({ company, jobTitle, date, descriptions }, idx) => {
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
            deleteButtonTooltipText="Удалить запись"
          >
            <Input
              label="Место работы"
              labelClassName="col-span-full max-sm:col-span-full"
              name="company"
              placeholder=""
              value={company}
              onChange={handleWorkExperienceChange}
            />
            <Input
              label="Должность"
              labelClassName="col-span-4 max-sm:col-span-full"
              name="jobTitle"
              placeholder=""
              value={jobTitle}
              onChange={handleWorkExperienceChange}
            />
            
            <InputDate
              label="Дата окончания"
              labelClassName="col-span-2 max-sm:col-span-full"
              name="date"
              placeholder=""
              value={date}
              onChange={handleWorkExperienceChange}
            />
            <BulletListTextarea
              label="Описание"
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
