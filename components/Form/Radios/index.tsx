import {
  RadioGroup,
  Stack,
  RadioGroupProps,
  StackProps,
  FormControl,
  FormLabel,
  FormControlProps,
} from '@chakra-ui/react';
import { useField } from 'formik';

type RadiosProps = { label: string } & RadioGroupProps & StackProps & FormControlProps;
const Radios = (props: RadiosProps) => {
  const { spacing, direction, name, children, label, defaultValue, color } = props;
  // @ts-ignore
  const [field, , helpers] = useField(name); //[field, meta, helpers]
  field.value ??= defaultValue; // set default value on props
  const { setValue } = helpers;

  return (
    <FormControl {...props}>
      <FormLabel color={color}>{label}</FormLabel>
      <RadioGroup
        {...field}
        {...props}
        onChange={(value) => {
          setValue(value);
        }}
      >
        <Stack spacing={spacing} direction={direction} p={2}>
          {children}
        </Stack>
      </RadioGroup>
    </FormControl>
  );
};

Radios.defaultProps = {
  spacing: '4',
  direction: 'row',
} as RadiosProps;

export default Radios;
