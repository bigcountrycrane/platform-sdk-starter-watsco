import { Workbook, SpaceConfig, Agent } from '@flatfile/configure'

import Branch_Supplemental from './sheets/branch_supplemental'
import Customer_Allocated_Sales_Commission from './sheets/customer_allocated_sales_commissions'
import Customer_Rebates from './sheets/customer_rebates'

export default new Agent({
  spaceConfigs: {
    BranchSupplemental: new SpaceConfig({
      name: 'Branch Supplemental',
      slug: 'BranchSupplementalsc',
      workbookConfigs: {
        basic: new Workbook({
          name: 'Branch Supplemental',
          slug: 'BranchSupplementalwb',
          namespace: 'Branch Supplemental',
          sheets: {
            Branch_Supplemental,
          },
        }),
      },
    }),

    Contact: new SpaceConfig({
      name: 'Customer Allocated Sales Commission',
      slug: 'CustomerAllocatedSalesCommissionsc',
      workbookConfigs: {
        basic: new Workbook({
          name: 'Customer Allocated Sales Commission',
          slug: 'CustomerAllocatedSalesCommissionwb',
          namespace: 'Customer Allocated Sales Commission',
          sheets: {
            Customer_Allocated_Sales_Commission,
          },
        }),
      },
    }),
    Matter: new SpaceConfig({
      name: 'Customer Rebates',
      slug: 'CustomerRebatessc',
      workbookConfigs: {
        basic: new Workbook({
          name: 'Customer Rebates',
          slug: 'CustomerRebatesworkbook',
          namespace: 'Customer Rebates',
          sheets: {
            Customer_Rebates,
          },
        }),
      },
    }),
  },
})
