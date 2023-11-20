import { Form, FormSection } from "components/ResumeForm/Form";
import {
  BulletListTextarea,
  Input,
  InputDate,
} from "components/ResumeForm/Form/InputGroup";
import { BulletListIconButton } from "components/ResumeForm/Form/IconButton";
import type { CreateHandleChangeArgsWithDescriptions } from "components/ResumeForm/types";
import { useAppDispatch, useAppSelector } from "lib/redux/hooks";
import { changeAdditional, changeEducations, selectAdditional } from "lib/redux/resumeSlice";
import type { Additional, AdditionalBlockExtended, ResumeEducation } from "lib/redux/types";
import {
  changeShowBulletPoints,
  selectShowBulletPoints,
} from "lib/redux/settingsSlice";
import { useTranslation } from "react-i18next";
import { Button } from "components/Button";

interface InputProps<K extends string, V extends string | string[]> {
  name: K;
  value?: V;
  onChange: (name: K, value: V) => void;
  blocks: AdditionalBlockExtended[];
  index: any ;
}


const AdditionalBlockForm = <K extends string>({ 
  blocks, 
  index,
  name,
  value,
  onChange 
} :InputProps<K, string>) => {

  // здесь можно рендерить и управлять каждым блоком
  const showMoveUp = index !== 0;
  const showMoveDown = index !== blocks.length - 1;
  const showDelete = blocks.length > 1;
  const { t } = useTranslation()
  return (
    <FormSection
      key={index}
      form="additional"
      idx={index}
      showMoveUp={showMoveUp}
      showMoveDown={showMoveDown}
      showDelete={showDelete}
      deleteButtonTooltipText={t("delete-a-not")}>

      {blocks.map((block, idx) => {
        return (
          <div key={idx}>
            <input onChange={(e) => {onChange(name, e.target.value)}} type="text" name={name} value={value} />
          </div>
        )
      })}

    </FormSection>
  );
};

export const AdditionalForm = () => {
  const additional = useAppSelector(selectAdditional);
  const dispatch = useAppDispatch();
  const showDelete = additional.length > 1;
  const form = "additional";
  const showBulletPoints = useAppSelector(selectShowBulletPoints(form));

  const { t } = useTranslation()
  const additionalBlocks = useAppSelector(selectAdditional);



  return (

    <Form form={form}>
      <div>
        <h2>Additional Information</h2>
        {additionalBlocks.map(({heading, blocks}, idx) => {
          const chengeHeading = (...[
            field,
            value,
          ]: CreateHandleChangeArgsWithDescriptions<Additional>) => {
            dispatch(changeAdditional({idx, field, value} as any))
          }
          return (

            <AdditionalBlockForm 
              onChange={chengeHeading}
              name={"heading"} 
              value={heading} 
              blocks={blocks} 
              index={idx} 
              key={idx} />
          )
        })}
      </div>

    </Form>
  );
};
