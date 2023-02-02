import { NumberField, Sheet, TextField } from '@flatfile/configure'
import { validateRegex } from '../common/common'
import { threeCharacterAlphanumeric } from '../common/regex'

const Customer_Allocated_Sales_Commission = new Sheet(
  'Customer Allocated Sales Commission',
  {
    customer_number: NumberField({
      label: 'Customer Number',
      required: true,
      unique: true,
      description: 'Code of the branch',
    }),
    customer_name: TextField({
      label: 'Customer Name',
      required: true,
    }),
    salesperson_id: TextField({
      label: 'Salesperson ID',
      required: true,
      validate: (v: string) => {
        return validateRegex(
          v,
          threeCharacterAlphanumeric,
          'Invalid Salesperson ID: must be 3-character alpha-numeric'
        )
      },
    }),

    salesperson_name: TextField({
      label: 'Salesperson name',
      required: true,
    }),

    earned_commission: NumberField({
      label: 'Earned Commission',
      required: false,
      annotations: {
        compute: true,
        computeMessage:
          'This value was automatically reformatted to two decimal places. Original value was: ',
      },
      compute: (v: number) => {
        return Number(v.toFixed(2))
      },
    }),
    unearned_commission: NumberField({
      label: 'Unearned Commission',
      required: false,
      annotations: {
        compute: true,
        computeMessage:
          'This value was automatically reformatted to two decimal places. Original value was: ',
      },
      compute: (v: number) => {
        return Number(v.toFixed(2))
      },
    }),

    base_pay_allocation: NumberField({
      label: 'Base Pay Allocation',
      required: false,
      annotations: {
        compute: true,
        computeMessage:
          'This value was automatically reformatted to two decimal places. Original value was: ',
      },
      compute: (v: number) => {
        return Number(v.toFixed(2))
      },
    }),
    total_commission: NumberField({
      label: 'Total Commission',
      required: false,
      annotations: {
        compute: true,
        computeMessage:
          'This value was automatically reformatted to two decimal places. Original value was: ',
      },
      compute: (v: number) => {
        return Number(v.toFixed(2))
      },
    }),
    additional_incentives_paid: NumberField({
      label: 'Additional Incentives Paid',
      required: false,
      annotations: {
        compute: true,
        computeMessage:
          'This value was automatically reformatted to two decimal places. Original value was: ',
      },
      compute: (v: number) => {
        return Number(v.toFixed(2))
      },
    }),
  },

  {
    allowCustomFields: false,
    readOnly: false,
    // example of a record hook (not needed because of date typecasting)
    // recordCompute: (record) => {
    //   const openDate = crono.parse(`{record.get('open_date')}`)
    //   record.set('open_date', openDate[0].start.date())
    //   return record
    // }
  }
)

export default Customer_Allocated_Sales_Commission
