import { NumberField, Sheet, TextField } from '@flatfile/configure'

const Customer_Rebates = new Sheet(
  'Customer Rebates',
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

    equipment_rebate: NumberField({
      label: 'Equipment Rebate',
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
    part_supply_rebate: NumberField({
      label: 'Part Supply Rebate',
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

    ecommerce_rebate: NumberField({
      label: 'ECommerce Rebate',
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
    total_rebate: NumberField({
      label: 'Total Rebate',
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
    icp_equipment_subsidy: NumberField({
      label: 'ICP Equipment Subsidy',
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
    icp_part_supply_subsidy: NumberField({
      label: 'ICP Part Supply Subsidy',
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
    net_rebate_amount: NumberField({
      label: 'Net Rebate Amount',
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

export default Customer_Rebates
