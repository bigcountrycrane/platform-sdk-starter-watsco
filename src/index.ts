import {
  Message,
  NumberField,
  OptionField,
  Sheet,
  TextField,
  Workbook,
  SpaceConfig,
} from '@flatfile/configure'
import { SmartDateField } from './SmartDateField'

// import { FlatfileRecord, FlatfileRecords } from '@flatfile/hooks'
// import fetch from 'node-fetch'
import crono from 'chrono-node'

const Branch_Supplemental = new Sheet(
  'Branch Supplemental',
  {
    //must be 3 digits, numeric only, padded with leading zeros

    branch_code: NumberField({
      label: 'Branch Code',
      required: true,
      unique: true,
      description: 'Code of the branch',
    }),
    branch_name: TextField({
      label: 'Branch Name',
      required: true,
    }),
    branch_type: OptionField({
      label: 'Branch Type',
      options: {
        cost_center: { label: 'Cost Center' },
        other: { label: 'Other' },
        field_operations: { label: 'Field Operations' },
        sales_center: { label: 'Sales Center' },
        hub: { label: 'Hub' },
        distribution_center: { label: 'Distribution Center' },
      },
    }),
    alt_region_code: TextField({
      label: 'Alt Region Code',
    }),
    alt_region_name: TextField({
      label: 'Alt Region Name',
    }),

    //must be 3 digits, numeric only, padded with leading zeros
    branch_group_code: NumberField({
      label: 'Branch Group Code',
    }),
    branch_group_name: TextField({
      label: 'Branch Group Name',
    }),
    open_date: SmartDateField({
      label: 'Open Date',
      formatString: 'yyyy-MM-dd',
      required: true,
    }),

    //ifempty = 1900-01-01
    close_date: SmartDateField({
      label: 'Close Date',
      formatString: 'yyyy-MM-dd',
      default: new Date('1900-01-01'),
      annotations: {
        default: true,
        defaultMessage: 'Effective date has been formatted and defaulted to:',
      },
    }),

    //ifempty = 1900-01-01
    active_date: SmartDateField({
      label: 'Active Date',
      formatString: 'yyyy-MM-dd',
      default: new Date('1900-01-01'),
      annotations: {
        default: true,
        defaultMessage: 'Effective date has been formatted and defaulted to:',
      },
    }),

    //ifempty = 1900-01-01
    last_relo_date: SmartDateField({
      label: 'Last Relo Date',
      formatString: 'yyyy-MM-dd',
      default: new Date('1900-01-01'),
      annotations: {
        default: true,
        defaultMessage: 'Effective date has been formatted and defaulted to:',
      },
    }),

    branch_status: OptionField({
      label: 'Branch Status',
      options: {
        baker: { label: 'BAKER' },
        tradewinds: { label: 'TRADEWINDS' },
        consolidated: { label: 'Consolidated' },
      },
    }),

    //ifempty = 1900-01-01
    status_effective_date: SmartDateField({
      label: 'Status Effective Date',
      formatString: 'yyyy-MM-dd',
      default: new Date('1900-01-01'),
      annotations: {
        default: true,
        defaultMessage: 'Effective date has been formatted and defaulted to:',
      },
    }),

    //ifempty = 1900-01-01
    status_end_date: SmartDateField({
      label: 'Status End Date',
      formatString: 'yyyy-MM-dd',
      default: new Date('1900-01-01'),
      annotations: {
        default: true,
        defaultMessage: 'Effective date has been formatted and defaulted to:',
      },
    }),
    notes: TextField({
      label: 'Notes',
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

// Portal not needed in this example
// const Supplemental3Portal = new Portal({
//   name: 'Supplemental3Portal',
//   sheet: 'Supplemental3'
// })

//Workbook  - Update to reference your Workbook with Sheet(s)
export default new SpaceConfig({
  name: 'Watsco',
  slug: 'Watscosc',
  workbookConfigs: {
    basic: new Workbook({
      name: 'Watsco',
      slug: 'WatscoWorkbook',
      namespace: 'Watsco',
      sheets: {
        Branch_Supplemental,
      },
    }),
  },
})
