import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
  SelectProps,
  Text,
} from '@chakra-ui/react';
import { useField } from 'formik';

export type SelectData = {
  id: string | number;
};

type CustomSelectProps = {
  data?: SelectData[];
  label?: string;
  hiddenErrorMessage?: boolean;
  valueField?: string;
  labelField?: string;
} & SelectProps;

const CustomSelect = (props: CustomSelectProps) => {
  const {
    data,
    hiddenErrorMessage,
    valueField = 'id',
    labelField = 'name',
    label,
    name,
    isRequired,
    onChange,
    ...rest
  } = props;
  // @ts-ignore
  const [{ onChange: fieldChange, ...restField }, meta] = useField(props.name);
  const customChange = (e) => {
    fieldChange(e);
    onChange && onChange(e);
  };

  return (
    <FormControl isRequired={isRequired} isInvalid={!!meta.error && meta.touched}>
      <FormLabel>{label}</FormLabel>
      <Select onChange={customChange} {...restField} {...rest} name={name}>
        {data?.map((item) => (
          <option key={item[valueField]} value={item[valueField]}>
            <Text>{item[labelField]}</Text>
          </option>
        ))}
      </Select>
      {!hiddenErrorMessage && meta.error && <FormErrorMessage>{meta.error}</FormErrorMessage>}
    </FormControl>
  );
};

export default CustomSelect;
