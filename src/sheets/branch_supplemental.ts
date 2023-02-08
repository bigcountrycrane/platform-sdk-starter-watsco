import {
  NumberField,
  OptionField,
  Sheet,
  TextField,
  Action,
} from '@flatfile/configure'
import { SmartDateField } from '../SmartDateField'
import { validateRegex } from '../common/common'
import { branchCode } from '../common/regex'

const axios = require('axios')
const FormData = require('form-data')

async function generateJSON(event: any, sheetName: string, data: any) {
  const formData = new FormData()
  formData.append('spaceId', event.context.spaceId)

  formData.append('environmentId', event.context.environmentId)
  formData.append('file', JSON.stringify(data), {
    filename: `Sheet ${sheetName}.json`,
  })

  try {
    await axios.post(`v1/files`, formData, {
      headers: formData.getHeaders(),
      transformRequest: () => formData,
    })
  } catch (error) {
    console.log(`upload error: ${JSON.stringify(error, null, 2)}`)
  }
}

const GenerateJSONAction = new Action(
  {
    slug: 'generateJSON',
    label: 'Generate JSON',
    description: 'Generate a JSON file based off of the Data in this Sheet',
  },
  async (e) => {
    const sheetName = e.context.actionName.split(':')[0]
    try {
      const data = (await e.data).records
      await generateJSON(e, sheetName, data)
    } catch (error) {
      console.log(
        `GenerateJSONAction[error]: ${JSON.stringify(error, null, 2)}`
      )
    }
  }
)

async function executeValidation(event: any) {
  const workbookId = event.context.workbookId
  const sheetId = event.context.sheetId

  try {
    await axios.post(
      `v1/workbooks/${workbookId}/sheets/${sheetId}/validate`,
      {}
    )
  } catch (error) {
    console.log(`validation error: ${JSON.stringify(error, null, 2)}`)
  }
}

const executeValidationAction = new Action(
  {
    slug: 'executeValidation',
    label: 'Execute Validation',
    description: 'Executes Validations on the Data in this Sheet',
  },
  async (e) => {
    try {
      await executeValidation(e)
    } catch (error) {
      console.log(
        `executeValidationAction[error]: ${JSON.stringify(error, null, 2)}`
      )
    }
  }
)

const Branch_Supplemental = new Sheet(
  'Branch Supplemental',
  {
    //must be 3 digits, numeric only, padded with leading zeros

    branch_code: TextField({
      label: 'Branch Code',
      required: true,
      unique: true,
      description: 'Code of the branch',
      annotations: {
        compute: true,
        computeMessage:
          'This value was automatically padded with 0s to meet the requirement of 3 digits. Original value was: ',
      },
      compute: (value) => {
        return value.padStart(3, '0')
      },
      validate: (v: string) => {
        return validateRegex(
          v,
          branchCode,
          'Invalid Branch Code: must be 3 digits, numeric only, padded with leading zeros'
        )
      },
    }),
    branch_name: TextField({
      label: 'Branch Name',
      required: true,
    }),

    // must be one of the following values:
    // Sales Center, Hub, Distribution Center, Field Operations, Cost Center, Customer Consignment, Other

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

    branch_group_code: TextField({
      label: 'Branch Group Code',
      annotations: {
        compute: true,
        computeMessage:
          'This value was automatically padded with 0s to meet the requirement of 3 digits. Original value was: ',
      },
      compute: (value) => {
        return value.padStart(3, '0')
      },
      validate: (v: string) => {
        return validateRegex(
          v,
          branchCode,
          'Invalid Branch Code: must be 3 digits, numeric only, padded with leading zeros'
        )
      },
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
    actions: {
      GenerateJSONAction,
      executeValidationAction,
    },
  }
)

export default Branch_Supplemental
