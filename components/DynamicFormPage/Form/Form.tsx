import { ButtonBase } from 'components/Buttons';
import { ChartFormData } from 'pages/projects/dynamicform';
import { FormProvider, useForm } from 'react-hook-form';
import style from './Form.module.css';

type Props = {
  formFields?: ChartFormData[]
}

export function Form({ formFields }: Props):JSX.Element {
  const formMethods = useForm();
  const { handleSubmit } = formMethods;

  function onSubmit(data: any) {
    console.log(data);
  }
  return (
    <FormProvider {...formMethods} >
      <form onSubmit={handleSubmit(onSubmit)} className={style.form} >
        <div className={style.button_container} >
          <ButtonBase as='button' type='submit'>Submit</ButtonBase>
        </div>
      </form>
    </FormProvider>
  );
}