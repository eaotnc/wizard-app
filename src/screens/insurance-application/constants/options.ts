import {relationshipValues} from '../schemas/beneficiary.schema';
import {yesNoValues} from '../schemas/health.schema';
import {durationValues, planValues} from '../schemas/insurance.schema';
import {genderValues, titleValues} from '../schemas/personal.schema';

export type LabeledOption<T extends string> = {
  label: string;
  value: T;
};

export const titleOptions: readonly LabeledOption<(typeof titleValues)[number]>[] =
  [
    {label: 'Mr.', value: titleValues[0]},
    {label: 'Mrs.', value: titleValues[1]},
    {label: 'Ms.', value: titleValues[2]},
  ];

export const genderOptions: readonly LabeledOption<
  (typeof genderValues)[number]
>[] = [
  {label: 'Male', value: genderValues[0]},
  {label: 'Female', value: genderValues[1]},
  {label: 'Other', value: genderValues[2]},
];

export const planOptions: readonly LabeledOption<(typeof planValues)[number]>[] =
  [
    {label: 'Basic', value: planValues[0]},
    {label: 'Standard', value: planValues[1]},
    {label: 'Premium', value: planValues[2]},
  ];

export const durationOptions: readonly LabeledOption<
  (typeof durationValues)[number]
>[] = [
  {label: '1 year', value: durationValues[0]},
  {label: '5 years', value: durationValues[1]},
  {label: '10 years', value: durationValues[2]},
];

export const relationshipOptions: readonly LabeledOption<
  (typeof relationshipValues)[number]
>[] = [
  {label: 'Parent', value: relationshipValues[0]},
  {label: 'Spouse', value: relationshipValues[1]},
  {label: 'Child', value: relationshipValues[2]},
  {label: 'Other', value: relationshipValues[3]},
];

export const yesNoOptions: readonly LabeledOption<(typeof yesNoValues)[number]>[] =
  [
    {label: 'Yes', value: yesNoValues[0]},
    {label: 'No', value: yesNoValues[1]},
  ];

const provinceNames = [
  'Amnat Charoen',
  'Ang Thong',
  'Bangkok',
  'Bueng Kan',
  'Buri Ram',
  'Chachoengsao',
  'Chai Nat',
  'Chaiyaphum',
  'Chanthaburi',
  'Chiang Mai',
  'Chiang Rai',
  'Chon Buri',
  'Chumphon',
  'Kalasin',
  'Kamphaeng Phet',
  'Kanchanaburi',
  'Khon Kaen',
  'Krabi',
  'Lampang',
  'Lamphun',
  'Loei',
  'Lop Buri',
  'Mae Hong Son',
  'Maha Sarakham',
  'Mukdahan',
  'Nakhon Nayok',
  'Nakhon Pathom',
  'Nakhon Phanom',
  'Nakhon Ratchasima',
  'Nakhon Sawan',
  'Nakhon Si Thammarat',
  'Nan',
  'Narathiwat',
  'Nong Bua Lam Phu',
  'Nong Khai',
  'Nonthaburi',
  'Pathum Thani',
  'Pattani',
  'Phang Nga',
  'Phatthalung',
  'Phayao',
  'Phetchabun',
  'Phetchaburi',
  'Phichit',
  'Phitsanulok',
  'Phra Nakhon Si Ayutthaya',
  'Phrae',
  'Phuket',
  'Prachin Buri',
  'Prachuap Khiri Khan',
  'Ranong',
  'Ratchaburi',
  'Rayong',
  'Roi Et',
  'Sa Kaeo',
  'Sakon Nakhon',
  'Samut Prakan',
  'Samut Sakhon',
  'Samut Songkhram',
  'Saraburi',
  'Satun',
  'Si Sa Ket',
  'Sing Buri',
  'Songkhla',
  'Sukhothai',
  'Suphan Buri',
  'Surat Thani',
  'Surin',
  'Tak',
  'Trang',
  'Trat',
  'Ubon Ratchathani',
  'Udon Thani',
  'Uthai Thani',
  'Uttaradit',
  'Yala',
  'Yasothon',
] as const;

export const provinceOptions: readonly LabeledOption<string>[] =
  provinceNames.map(name => ({label: name, value: name}));

export function optionLabel(
  options: readonly {label: string; value: string}[],
  value: string,
) {
  if (!value) {
    return '—';
  }

  return options.find(option => option.value === value)?.label ?? value;
}
