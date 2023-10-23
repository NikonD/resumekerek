import { Form, FormSection } from "components/ResumeForm/Form";
import {
  Input,
  BulletListTextarea,
  InputDate,
} from "components/ResumeForm/Form/InputGroup";
import type { CreateHandleChangeArgsWithDescriptions } from "components/ResumeForm/types";
import { useAppDispatch, useAppSelector } from "lib/redux/hooks";
import { selectProjects, changeProjects } from "lib/redux/resumeSlice";
import type { ResumeProject } from "lib/redux/types";
import { useTranslation } from "react-i18next";

export const ProjectsForm = () => {
  const projects = useAppSelector(selectProjects);
  const dispatch = useAppDispatch();
  const showDelete = projects.length > 1;

  const { t } = useTranslation()

  return (
    <Form form="projects" addButtonText={t("add-a-note")}>
      {projects.map(({ project, start_date, end_date, descriptions }, idx) => {
        const handleProjectChange = (
          ...[
            field,
            value,
          ]: CreateHandleChangeArgsWithDescriptions<ResumeProject>
        ) => {
          dispatch(changeProjects({ idx, field, value } as any));
        };
        const showMoveUp = idx !== 0;
        const showMoveDown = idx !== projects.length - 1;



        return (
          <FormSection
            key={idx}
            form="projects"
            idx={idx}
            showMoveUp={showMoveUp}
            showMoveDown={showMoveDown}
            showDelete={showDelete}
            deleteButtonTooltipText={t("delete-a-note")}
          >
            <Input
              name="project"
              label={t("project-name-label")}
              placeholder=""
              value={project}
              onChange={handleProjectChange}
              labelClassName="col-span-4 max-sm:col-span-full"
            />

            <div className="col-span-full max-sm:col-span-full flex flex-row justify-between">
              <div className="">
                <InputDate
                  label={t("start-date")}
                  labelClassName="col-span-full max-sm:col-span-full flex-1"
                  name="start_date"
                  placeholder=""
                  value={start_date}
                  onChange={handleProjectChange}
                />
              </div>
              <div className="">
                <InputDate
                  label={t("expiration-date")}
                  labelClassName="col-span-full max-sm:col-span-full flex-1"
                  name="end_date"
                  placeholder=""
                  value={end_date}
                  onChange={handleProjectChange}
                />
              </div>
            </div>
            <BulletListTextarea
              name="descriptions"
              label={t("project-description-label")}
              placeholder=""
              value={descriptions}
              onChange={handleProjectChange}
              labelClassName="col-span-full max-sm:col-span-full"
            />
          </FormSection>
        );
      })}
    </Form>
  );
};
