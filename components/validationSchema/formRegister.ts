import * as Yup from 'yup';

export const REGEX_PHONE = new RegExp(/^0*(9|3|8|7|5)+([0-9]{8})$/);
export const REGEX_YEAR = new RegExp(/^(19|20)+([0-9]{2})$/);
export const REGEX_YEAR_MONTH_DAY = new RegExp(
  /^(0*[1-9]|[12][0-9]|3[01])[- /.](0*[1-9]|1[012])[- /.](19|20)\d\d$/ // ex: 1997-03-19
);

const validateCalenderDate = ({ year, month, date }) => {
  if (date == 31 && (month == 4 || month == 6 || month == 9 || month == 11)) {
    return false; // 31st of a month with 30 days
  } else if (date >= 30 && month == 2) {
    return false; // February 30th or 31st
  } else
    return !(
      month == 2 &&
      date == 29 &&
      !(year % 4 == 0 && (year % 100 != 0 || year % 400 == 0))
    );
};

const formRegister = Yup.object({
  fullName: Yup.string().required('Xin hãy nhập họ và tên'),
  phoneNumber: Yup.string()
    // .required('Xin hãy nhập số điện thoại')
    .matches(REGEX_PHONE, 'Số điện thoại không hợp lệ')
    .notRequired(),
  identityCard: Yup.string().notRequired(),
  // dob: Yup.object()
  //   .shape({
  //     date: Yup.string(),
  //     month: Yup.string(),
  //     year: Yup.string(),
  //   })
  //   .test({
  //     name: 'validDOB',
  //     test: (value, context) => {
  //       const { year, month, date } = value;
  //       if (!(year || month || date)) {
  //         return context.createError({ message: 'Bạn ơi, nhập ngày sinh nha' });
  //       }
  //       const isValidDateFormat = REGEX_YEAR_MONTH_DAY.test([date, month, year].join('-'));
  //       const isValidDateFollowCalender = validateCalenderDate(value);
  //       return (
  //         (isValidDateFormat && isValidDateFollowCalender) ||
  //         context.createError({ message: 'Bạn ơi, Ngày không hợp lệ rồi' })
  //       );
  //     },
  //   }),
  // dobDate: Yup.string().required(),
  // dobMonth: Yup.string().required(),
  // dobYear: Yup.string().required(),
  email: Yup.string().email('Email không hợp lệ').notRequired(),
  // // email: Yup.string().email('Email không hợp lệ'),
  // permanentAddress: Yup.object().shape({
  //   provinceId: Yup.number(),
  //   districtId: Yup.number(),
  //   wardId: Yup.number().required('Bạn ơi, nhập đủ địa chỉ nha'),
  // }),
  // permanentAddressProvince: Yup.string().required(),
  // permanentAddressDistrict: Yup.string().required(),
  // permanentAddressWard: Yup.string().required(),
  // temporaryAddress: Yup.object().shape({
  //   provinceId: Yup.number(),
  //   districtId: Yup.number(),
  //   wardId: Yup.number().required('Bạn ơi, nhập đủ địa chỉ nha'),
  // }),
  // temporaryAddressProvince: Yup.string().required(),
  // temporaryAddressDistrict: Yup.string().required(),
  // temporaryAddressWard: Yup.string().required(),
  // organizationStructureId: Yup.number().required('Xin hãy chọn nơi sinh hoạt'),
});

export default formRegister;
