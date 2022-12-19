import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { useField } from 'formik';

const FormInput = (props) => {
  const { label, name, defaultValue, hiddenErrorMessage, as: Component = Input, ...rest } = props;
  // @ts-ignore
  const [field, meta] = useField(name);
  field.value ??= defaultValue; // set default value on props

  return (
    <FormControl isInvalid={!!meta.error && meta.touched} {...rest}>
      <FormLabel tabIndex={-1}>
        {label}
      </FormLabel>
      <Component placeholder=' ' {...field} {...props} />
      {!hiddenErrorMessage && meta.error && <FormErrorMessage>{meta.error}</FormErrorMessage>}
    </FormControl>
  );
};

FormInput.defaultProps = { autoComplete: 'off' };

export default FormInput;
