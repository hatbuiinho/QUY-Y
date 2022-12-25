import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
  InputProps,
  StackProps,
} from '@chakra-ui/react';
import CustomSelect from '@/components/Form/CustomSelect';
import { useField } from 'formik';
import API from '../../../apis/constants';
import useAxios from '../../../hooks/useAxios';

type CultivationPlaceProps = InputProps &
  FormControlProps &
  StackProps & {
    setDataPreview: Function;
  };

function CultivationPlace(props: CultivationPlaceProps) {
  const { name, label, isRequired, setDataPreview } = props;

  //@ts-ignore
  const [field, { value: id }, { error, touched }] = useField(name);

  const { data: groups, loaded } = useAxios(
    {
      method: 'get',
      url: API.GET_CTN,
      params: {
        CTNGroupId: 0,
      },
      transformResponse: ({ data }) => data,
    },
    []
  );

  return (
    <FormControl isRequired={isRequired} isInvalid={!!error && touched}>
      <FormLabel mb={0}>{label}</FormLabel>
      <CustomSelect
        {...field}
        valueField="id"
        labelField="name"
        data={groups}
        placeholder="Nơi sinh hoạt"
        hiddenErrorMessage
      />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
}

export default CultivationPlace;
