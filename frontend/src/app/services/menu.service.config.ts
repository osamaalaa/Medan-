export const getLeftMenuData: any[] = [
  // {
  //   title: 'Settings',
  //   translateKeys:"SETTINGS",
  //   key: 'settings',
  //   icon: 'icmn icmn-cog utils__spin-delayed--pseudo-selector',
  // },
  // {
  //   title: 'Documentation',
  //   translateKeys:"DOCUMENTATION",
  //   key: 'documentation',
  //   url: 'https://docs.cleanuitemplate.com/angular/getting-started',
  //   target: '_blank',
  //   icon: 'icmn icmn-books',
  // },
  // {
  //   divider: true,
  // },

  // {
  //   title: 'Home',
  //   translateKeys:"HOME",
  //   key: '',
  //   // icon: 'icmn icmn-file-text',
  //   children: [
  //     // {
  //     //   key: 'home',
  //     //   title: 'Home Page',
  //     //   translateKeys:"HOME_PAGE",
  //     //   url: '/medan/home',
  //     //   pro: true,
  //     // },
  //     // {
  //     //   key: 'reports',
  //     //   title: 'Reports',
  //     //   translateKeys:"REPORTS",
  //     //   url: '/medan/home/reports',
  //     //   pro: true
  //     // }


  //     // {
  //     //   key: 'myissues',
  //     //   title: 'My Issues',
  //     //   translateKeys:"MY_ISSUES",
  //     //   url: '/medan/home/myissues',
  //     //   pro: true,
  //     // },
  //     // {
  //     //   key: 'dashbord',
  //     //   title: 'Dashbord',
  //     //   translateKeys:"DASHBORD",
  //     //   url: '/medan/home/dashbord',
  //     //   pro: true,
  //     // }
  //   ],
  // },
  // {
  //   title: 'WorkOrder',
  //   translateKeys:"WORKORDER",
  //   key: '',
  //   // icon: 'icmn icmn-file-text',
  //   children: [
  //     {
  //       key: 'workorder',
  //       title: 'New Incident Report',
  //       translateKeys:"NEW_INCIDENT_REPORT",
  //       url: '/medan/work-order/incident',
  //       pro: true,
  //     }

  //   ],
  // },
  {
    title: 'ReportsList',
    translateKeys: "REPORTSLIST",
    key: '',
    children: [
      {
        key: 'reports',
        title: 'Reports',
        translateKeys: "STATISTICS",
        url: '/medan/home/reports',
        pro: true
      },
      // {
      //   key: 'reports-list',
      //   title: 'No Of Cups',
      //   translateKeys:"NO_OF_CUPS",
      //   url: '/medan/reports-list/no-of-cups',
      //   pro: true,
      // },
      // {
      //   key: 'variance-report',
      //   title: 'Variance Report',
      //   translateKeys:"VARIANCE_REPORT",
      //   url: '/medan/reports-list/variance-report',
      //   pro: true,
      // },
      {
        key: 'reports-list',
        title: 'Month Increment Percentage',
        translateKeys: "MONTH_INCREMENT_PERCENTAGE",
        url: '/medan/reports-list/month-increment-percentage',
        pro: true,
      },
      {
        key: 'reports-list',
        title: 'Zamzam Water Withdraw',
        translateKeys: "Zamzam Water Withdraw",
        url: '/medan/reports-list/zamzam-water',
        pro: true,
      },
      {
        key: 'reports-list',
        title: 'Volume of Waste',
        translateKeys: "Volume of Waste",
        url: '/medan/reports-list/daily-waste',
        pro: true,
      },
      {
        key: 'reports-list',
        title: 'Employees Violations',
        // translateKeys:"EMPLOYEES_ISSUES",
        translateKeys: "Employees Violations",
        url: '/medan/reports-list/employees-issues',
        pro: true,
      },
      {
        key: 'reports-list',
        title: 'Materials used in Contracts',
        translateKeys: "Materials used in Contracts",
        url: '/medan/reports-list/materials',
        pro: true,
      },
      {
        key: 'Work Order Status in Location Or Shift',
        title: 'Work Order Status in Location Or Shift',
        translateKeys: "Work Order Status in Location Or Shift",
        url: '/medan/reports-list/activities',
        pro: true,
      },
      {
        key: 'reports-list',
        title: 'Work Permissions',
        translateKeys: "WORK_PERMISSIONS",
        url: '/medan/reports-list/work-permissions',
        pro: true,
      },
      {
        key: 'reports-list',
        title: 'Incident Data in Location or Shift',
        translateKeys: "Incident Data in Location or Shift",
        url: '/medan/reports-list/incidents',
        pro: true,
      },
      {
        key: 'reports-list',
        title: 'Equipment Data',
        translateKeys: "Equipment Data",
        url: '/medan/reports-list/equipment-data',
        pro: true,
      },
      {
        key: 'reports-list',
        title: 'Equipment Operation Status',
        translateKeys: "Equipment Operation Status",
        url: '/medan/reports-list/equipment-main-status',
        pro: true,
      },
      {
        key: 'reports-list',
        title: 'Equipment Maintenance Status',
        translateKeys: "Equipment Maintenance Status",
        url: '/medan/reports-list/equipment-maintenance',
        pro: true,
      },
      {
        key: 'reports-list',
        title: 'Equipment Work Orders',
        translateKeys: "Equipment Work Orders",
        url: '/medan/reports-list/equipment-order',
        pro: true,
      },
      {
        key: 'reports-list',
        title: 'Work Orders By Maintenance Type',
        translateKeys: "Work Orders By Maintenance Type",
        url: '/medan/reports-list/operation-activities',

        pro: true,
      },
      {
        key: 'reports-list',
        title: 'Work Order',
        translateKeys: "NOT_STARTED_WORK_ORDER",
        url: '/medan/reports-list/work-order',
        pro: true,
      },
      {
        key: 'reports-list',
        title: 'Items Balance in Stores',
        translateKeys: "Items Balance in Stores",
        url: '/medan/reports-list/items-unit',
        pro: true,
      },
      {
        key: 'reports-list',
        title: 'Items reorder limit',
        translateKeys: "Items reorder limit",
        url: '/medan/reports-list/purchasing-order',
        pro: true,
      },
      {
        key: 'reports-list',
        title: 'Employee Work Orders',
        translateKeys: "Employee Work Orders",
        url: '/medan/reports-list/employee-activities',
        pro: true,
      },
      {
        key: 'reports-list',
        title: 'Contractor Evaluation',
        translateKeys: "CONTRACTOR_EVALUATION",
        url: '/medan/reports-list/contractor-evaluation',
        pro: true,
      },



      // {
      //   key: 'reports-list',
      //   title: 'Clean Equipment Count',
      //   translateKeys:"CLEAN_EQUIPMENT_COUNT",
      //   url: '/medan/reports-list/clean-equipment-count',
      //   pro: true,
      // },


      // {
      //   key: 'reports-list',
      //   title: 'Contractor Information',
      //   translateKeys:"CONTRACTOR_INFORMATION",
      //   url: '/medan/reports-list/contractor-information',
      //   pro: true,
      // },

      // {
      //   key: 'reports-list',
      //   title: 'Fines',
      //   translateKeys:"FINES",
      //   url: '/medan/reports-list/fines',
      //   pro: true,
      // },
      // {
      //   key: 'reports-list',
      //   title: 'Work Permissions Desc',
      //   translateKeys:"WORK_PERMISSIONS_DESC",
      //   url: '/medan/reports-list/work-permissions-desc',
      //   pro: true,
      // },




      // {
      //   key: 'reports-list',
      //   title: 'Items',
      //   translateKeys:"ITEMS",
      //   url: '/medan/reports-list/items',
      //   pro: true,
      // },
      // {
      //   key: 'reports-list',
      //   title: 'Clean Bases',
      //   translateKeys: "CLEAN_BASES",
      //   url: '/medan/reports-list/clean-bases',
      //   pro: true,
      // },


      // {
      //   key: 'reports-list',
      //   title: 'Equipment Count',
      //   translateKeys:"Equipment Count",
      //   url: '/medan/reports-list/equipment-count',
      //   pro: true,
      // },



      // {
      //   key: 'reports-list',
      //   title: 'Equipment Status',
      //   translateKeys:"Equipment Status",
      //   url: '/medan/reports-list/equipment-status',
      //   pro: true,
      // },
      // {
      //   key: 'reports-list',
      //   title: 'Activities And Services',
      //   translateKeys:"Activities And Services",
      //   url: '/medan/reports-list/activities-services',
      //   pro: true,
      // },

      // {
      //   key: 'reports-list',
      //   title: 'Shift Status',
      //   translateKeys:"SHIFT_STATUS",
      //   url: '/medan/reports-list/shift-status',
      //   pro: true,
      // },


      // {
      //   key: 'reports-list',
      //   title: 'Clean Equipment Filter',
      //   translateKeys:"Clean Equipment Filter",
      //   url: '/medan/reports-list/clean-equipment-filter',
      //   pro: true,
      // },

    ],
  },

  // {
  //   title: 'General Setup',
  //   translateKeys:"GENERAL_SETUP",
  //   key: 'Setup',
  //   icon: 'icmn icmn-file-text',
  //   children: [
  //     {
  //       key: 'Inventory',
  //       title: 'Inventory',
  //       translateKeys:"INVENTORY",
  //       url: '/inv/setup',
  //       pro: true,
  //     },
  //   ],
  // },

  // {
  //   title: 'Inventory',
  //   translateKeys:"INVENTORY",
  //   key: 'Inventory',
  //   icon: 'icmn icmn-spinner9',
  //   children: [
  //     {
  //       key: 'Operations',
  //       title: 'Operations',
  //       translateKeys:"OPERATIONS",
  //       url: '/inv/operations',
  //       pro: false,
  //     },
  //   ],
  // }
]
export const getTopMenuData: any[] = [
  {
    title: 'Settings',
    translateKeys: "SETTINGS",
    key: 'settings',
    icon: 'icmn icmn-cog utils__spin-delayed--pseudo-selector',
  },
  {
    title: 'Documentation',
    translateKeys: "DOCUMENTATION",
    key: 'documentation',
    url: 'https://docs.cleanuitemplate.com/angular/getting-started',
    target: '_blank',
    icon: 'icmn icmn-books',
  },
  {
    divider: true,
  },
  // {
  //   title: 'Home',
  //   translateKeys:"HOME",
  //   key: 'home',
  //   url: '/medan/home',
  //   icon: 'icmn icmn-home',
  //   pro: false,
  // },

  // {
  //   title: 'Home',
  //   translateKeys:"HOME",
  //   key: '',
  //   //icon: 'icmn icmn-file-text',
  //   children: [
  //     {
  //       key: 'home',
  //       title: 'Home Page',
  //       translateKeys:"HOME_PAGE",
  //       url: '/medan/home',
  //       pro: true,
  //     },
  //   ],
  // },

  {
    title: 'General Setup',
    translateKeys: "GENERAL_SETUP",
    key: 'Setup',
    icon: 'icmn icmn-file-text',
    children: [
      {
        key: 'Inventory',
        title: 'Inventory',
        translateKeys: "INVENTORY",
        url: '/inv/setup',
        pro: true,
      },
    ],
  },

  {
    title: 'Inventory',
    translateKeys: "INVENTORY",
    key: 'Inventory',
    icon: 'icmn icmn-spinner9',
    children: [
      {
        key: 'Operations',
        title: 'Operations',
        translateKeys: "OPERATIONS",
        url: '/inv/operations',
        pro: false,
      },
    ],
  }
]
