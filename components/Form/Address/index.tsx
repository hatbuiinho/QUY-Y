import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
  SelectProps,
  Stack,
  StackProps,
  VisuallyHiddenInput,
} from '@chakra-ui/react';
import Select from '../CustomSelect';
import useAxios from '../../../hooks/useAxios';
import _ from 'lodash';
import API from '../../../apis/constants';
import { useField } from 'formik';
import { useState, useEffect } from 'react';

type AddressProps = SelectProps &
  FormControlProps &
  StackProps & {
    setDataPreview: Function;
  };

function Address(props: AddressProps) {
  const { name, label, direction, spacing, setDataPreview, ...rest } = props;
  const provinceName = `${name}Province`;
  const districtName = `${name}District`;
  const wardName = `${name}Ward`;

  //@ts-ignore
  const [field, { error }, { setValue: setAddressValue }] = useField(name);
  const [{ value: provinceId }, { touched: pTouch }] = useField(provinceName);
  const [
    { value: districtId },
    { touched: dTouch },
    { setTouched: setDTouched, setValue: setDistrict },
  ] = useField(districtName);
  const [{ value: wardId }, { touched: vTouch }, { setTouched: setVTouched, setValue: setWard }] =
    useField(wardName);

  const { data: provinces } = useAxios(
    {
      method: 'get',
      url: API.GET_PROVINCE,
      params: {
        Regions: '1,2,3',
      },
      transformResponse: ({ data }) => data,
    },
    [],
  );
  const { data: districts, cancel: cancelDistrict } = useAxios(
    {
      method: 'get',
      url: API.GET_DISTRICT,
      params: { Status: 1, ProvinceId: provinceId },
      transformResponse: ({ data }) => data,
    },
    [provinceId],
  );
  if (cancelDistrict && !provinceId) {
    cancelDistrict.cancel();
  }

  const { data: wards, cancel: cancelWard } = useAxios(
    {
      method: 'get',
      url: API.GET_WARD,
      params: {
        Status: 1,
        DistrictId: districtId,
      },
      transformResponse: ({ data }) => data,
    },
    [districtId],
  );
  if (cancelWard && !districtId) {
    cancelWard.cancel();
  }

  const [address, setAddress] = useState(field.value);
  useEffect(() => {
    setAddressValue(address);
  }, [address]);

  useEffect(() => {
    setAddress({ provinceId, districtId, wardId });
  }, [provinceId, districtId, wardId]);


  const errorMessage = error && Object.values(error)[0];

  return (
    <FormControl isInvalid={!!errorMessage && pTouch && dTouch && vTouch} {...rest}>
      <FormLabel mb={0}>{label}</FormLabel>
      <Stack direction={direction} spacing={spacing}>
        <Select
          placeholder='Tỉnh'
          name={provinceName}
          data={provinces}
          hiddenErrorMessage
          onChange={() => {
            setDTouched(false);
            setDistrict('');
            setWard('');
          }}
        />
        <Select
          placeholder='Huyện'
          name={districtName}
          data={districts}
          isDisabled={!provinceId}
          hiddenErrorMessage
          onChange={(e) => {
            setVTouched(false);
            setWard('');
          }}
        />
        <Select
          placeholder='Xã'
          name={wardName}
          data={wards}
          isDisabled={!districtId}
          hiddenErrorMessage
        />
      </Stack>
      <VisuallyHiddenInput tabIndex={-1} {...field} value={field.value || ''} />
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
}

Address.defaultProps = { direction: 'row' } as AddressProps;

export default Address;
