export const fieldsDemo = {
  "reduction_targets": {
    "type": "table",
    "rules": [],
    "items": [
      [
        {
          "label": "Targets achieved",
          "name": "targets_achieved",
          "value": "312212",
          "type": "text",
          "error": false,
          "rules": []
        },
        {
          "label": "GHG reduced (t CO<sup>2</sup>e)",
          "name": "ghu",
          "value": "1231",
          "type": "text",
          "error": false,
          "rules": []
        },
        {
          "label": "Target achievement date",
          "value": "25/10/2021",
          "name": "targets_achieved_date",
          "type": "date",
          "rules": [],
          "config": {
            "dateFormat": "d/m/Y"
          }
        }
      ]
    ],
    "error": false
  },
  "reduction_projects": {
    "type": "table",
    "items": [
      [
        {
          "label": "Programme",
          "name": "programme",
          "value": "123112",
          "type": "text",
          "error": false,
          "rules": []
        },
        {
          "label": "Project name",
          "name": "project_name",
          "value": "21321",
          "type": "text",
          "error": false,
          "rules": []
        },
        {
          "label": "Project code",
          "name": "project_code",
          "value": "321312",
          "type": "text",
          "error": false,
          "rules": []
        },
        {
          "label": "Sector",
          "name": "sector",
          "value": "31212",
          "type": "text",
          "error": false,
          "rules": []
        },
        {
          "label": "Purchased credits (t CO<sup>2</sup>e)",
          "name": "credits",
          "value": "12312",
          "type": "text",
          "error": false,
          "rules": []
        }
      ]
    ],
    "rules": [],
    "error": false
  },
  "company_name": {
    "label": "Company name",
    "value": "test",
    "type": "text",
    "rules": [
      "require"
    ],
    "error": false,
    "group": "general",
    "show": [
      "product",
      "organization",
      "neutrality",
      "reduction"
    ]
  },
  "company_contact": {
    "label": "Company contacts",
    "value": "test",
    "type": "text",
    "rules": [
      "require"
    ],
    "error": false,
    "group": "general",
    "show": [
      "product",
      "organization",
      "neutrality",
      "reduction"
    ]
  },
  "company_website": {
    "label": "Company website",
    "value": "test",
    "type": "text",
    "rules": [
      "require"
    ],
    "error": false,
    "group": "general",
    "show": [
      "product",
      "organization",
      "neutrality",
      "reduction"
    ]
  },
  "company_phone": {
    "label": "Company phone",
    "value": "test",
    "type": "text",
    "rules": [],
    "error": false,
    "group": "general",
    "show": [
      "product",
      "organization",
      "neutrality",
      "reduction"
    ]
  },
  "company_headquarters": {
    "label": "Company headquarters",
    "value": "test",
    "type": "text",
    "rules": [],
    "error": false,
    "group": "general",
    "show": [
      "product",
      "organization",
      "neutrality",
      "reduction"
    ]
  },
  "verification_body": {
    "label": "Verification Body",
    "value": "test",
    "type": "text",
    "rules": [],
    "error": false,
    "group": "general",
    "show": [
      "neutrality"
    ]
  },
  "verification_certificate": {
    "label": "Verification Certificate",
    "value": "",
    "type": "text",
    "rules": [],
    "error": false,
    "group": "general",
    "show": [
      "reduction"
    ]
  },
  "cfo_cfp_registration": {
    "label": "CFP/CFO Registration",
    "items": {},
    "type": "text",
    "rules": [],
    "error": false,
    "show": [
      "neutrality"
    ],
    "group": "company",
    "value": "test"
  },
  "company_reg_number": {
    "label": "Registration number",
    "value": "",
    "type": "text",
    "rules": [],
    "error": false,
    "group": "company",
    "show": [
      "organization"
    ],
    "showOnProduct": false,
    "showOnOrganization": true
  },
  "company_activity": {
    "label": "Activity description",
    "value": "test",
    "type": "text",
    "rules": [],
    "error": false,
    "group": "company",
    "show": [
      "organization",
      "neutrality"
    ]
  },
  "company_base_year": {
    "label": "Base year",
    "value": "",
    "type": "text",
    "rules": [],
    "error": false,
    "group": "company",
    "show": [
      "organization"
    ],
    "showOnProduct": false,
    "showOnOrganization": true
  },
  "company_base_total_footprint": {
    "label": "Base year total GHG emissions (t CO<sub>2</sub>e)",
    "value": "",
    "type": "text",
    "rules": [],
    "error": false,
    "group": "company",
    "show": [
      "organization"
    ],
    "showOnProduct": false,
    "showOnOrganization": true
  },
  "company_note": {
    "label": "Notes",
    "value": "",
    "type": "text",
    "rules": [],
    "error": false,
    "group": "company",
    "show": [
      "organization"
    ],
    "showOnProduct": false,
    "showOnOrganization": true
  },
  "product_registration_n": {
    "label": "Registration number",
    "value": "",
    "type": "text",
    "rules": [],
    "error": false,
    "group": "product"
  },
  "product_name": {
    "label": "Product name",
    "value": "",
    "type": "text",
    "rules": [],
    "error": false,
    "group": "product"
  },
  "product_description": {
    "label": "Product description",
    "value": "",
    "type": "text",
    "rules": [],
    "error": false,
    "group": "product"
  },
  "cfpn_registration_date": {
    "label": "Registration date",
    "value": "12/10/2021",
    "type": "date",
    "rules": [],
    "error": false,
    "group": "cfpn",
    "config": {
      "dateFormat": "d/m/Y"
    }
  },
  "cfpn_du": {
    "label": "DU/FU",
    "value": "12",
    "type": "text",
    "rules": [],
    "error": false,
    "group": "cfpn"
  },
  "cfpn_value": {
    "label": "CFP (g CO<sub>2</sub>e/UD-UF; kg CO<sub>2</sub>e/UD-UF, t CO<sub>2</sub>e/UD-UF))",
    "value": "321",
    "type": "number",
    "rules": [],
    "error": false,
    "group": "cfpn"
  },
  "cfon_value": {
    "label": "CFO (t CO<sub>2</sub>e)",
    "value": "132",
    "type": "number",
    "rules": [],
    "error": false,
    "group": "cfpn"
  },
  "ghgn_value": {
    "label": "GHG Quantification Baseline Year",
    "value": "12312",
    "type": "number",
    "rules": [],
    "error": false,
    "group": "cfpn"
  },
  "n_offseting_year": {
    "label": "Offsetting year",
    "value": "2222",
    "type": "number",
    "rules": [],
    "error": false,
    "group": "cfpn"
  },
  "r_detail_info_name": {
    "label": "Organization/Product name",
    "value": "",
    "type": "text",
    "rules": [],
    "error": false,
    "group": "r_detailed"
  },
  "r_detail_info_descr": {
    "label": "Description",
    "value": "",
    "type": "text",
    "rules": [],
    "error": false,
    "group": "r_detailed"
  },
  "r_detail_info_plants": {
    "label": "List of plants/DU/FU",
    "value": "",
    "type": "text",
    "rules": [],
    "error": false,
    "group": "r_detailed"
  },
  "r_ex_year": {
    "label": "Ex-ante year",
    "value": "",
    "type": "number",
    "rules": [],
    "error": false,
    "group": "r_ex_ante_year"
  },
  "r_total_em": {
    "label": "Total emissions",
    "value": "",
    "type": "text",
    "rules": [],
    "error": false,
    "group": "r_ex_ante_year"
  },
  "r_total_em_unit": {
    "label": "Total emissions (unit)",
    "value": "",
    "type": "select",
    "rules": [],
    "error": false,
    "group": "r_ex_ante_year",
    "options": [
      {
        "title": "g CO<sup>2</sup>e/FU"
      },
      {
        "title": "g CO<sup>2</sup>e/DU"
      },
      {
        "title": "kg CO<sup>2</sup>e/FU"
      },
      {
        "title": "kg CO<sup>2</sup>e/DU"
      },
      {
        "title": "t CO<sup>2</sup>e/DU"
      },
      {
        "title": "t CO<sup>2</sup>e/FU"
      },
      {
        "title": "t CO<sup>2</sup>e"
      }
    ]
  },
  "r_verified_by": {
    "label": "Verified by",
    "value": "",
    "type": "text",
    "rules": [],
    "error": false,
    "group": "r_ex_ante_year"
  },
  "r_ex_regnum": {
    "label": "Registration nr./Regulation",
    "value": "",
    "type": "text",
    "rules": [],
    "error": false,
    "group": "r_ex_ante_year"
  },
  "r_post_year": {
    "label": "Ex-ante year",
    "value": "",
    "type": "number",
    "rules": [],
    "error": false,
    "group": "r_ex_post_year"
  },
  "r_post_total_em": {
    "label": "Total emissions",
    "value": "",
    "type": "text",
    "rules": [],
    "error": false,
    "group": "r_ex_post_year"
  },
  "r_post_total_unit": {
    "label": "Total emissions (unit)",
    "value": "",
    "type": "select",
    "rules": [],
    "error": false,
    "group": "r_ex_post_year",
    "options": [
      {
        "title": "g CO2e/FU"
      },
      {
        "title": "g CO2e/DU"
      },
      {
        "title": "kg CO2e/FU"
      },
      {
        "title": "kg CO2e/DU"
      },
      {
        "title": "t CO2e/DU"
      },
      {
        "title": "t CO2e/FU"
      },
      {
        "title": "t CO2e"
      }
    ]
  },
  "r_post_verified_by": {
    "label": "Verified by",
    "value": "",
    "type": "text",
    "rules": [],
    "error": false,
    "group": "r_ex_post_year"
  },
  "r_post_regnum": {
    "label": "Registration nr./Regulation",
    "value": "",
    "type": "text",
    "rules": [],
    "error": false,
    "group": "r_ex_post_year"
  },
  "r_post_description": {
    "label": "Description of the mitigation activities",
    "value": "",
    "type": "text",
    "rules": [],
    "error": false,
    "group": "r_ex_post_year"
  },
  "cfp_registration_date": {
    "label": "Registration date",
    "value": "",
    "type": "date",
    "rules": [],
    "error": false,
    "group": "cfp",
    "config": {
      "dateFormat": "d/m/Y"
    }
  },
  "cfp_du": {
    "label": "DU/FU",
    "value": "",
    "type": "text",
    "rules": [],
    "error": false,
    "group": "cfp"
  },
  "cfp_value": {
    "label": "CFP (kg CO<sub>2</sub>e)",
    "value": "",
    "type": "text",
    "rules": [],
    "error": false,
    "group": "cfp"
  },
  "cfp_reference_year": {
    "label": "Reference year",
    "value": "",
    "type": "text",
    "rules": [],
    "error": false,
    "group": "cfp"
  },
  "cfp_system_boundaries": {
    "label": "System boundaries",
    "value": "",
    "type": "text",
    "group": "cfp",
    "rules": [],
    "error": false
  },
  "cfp_stages_excluded": {
    "label": "Stages excluded",
    "value": "",
    "type": "text",
    "group": "cfp",
    "rules": [],
    "error": false
  },
  "cfp_plants_included": {
    "label": "Production plants included",
    "value": "",
    "type": "text",
    "group": "cfp",
    "rules": [],
    "error": false
  },
  "cfp_reference_pcr": {
    "label": "Reference PCR",
    "value": "",
    "type": "text",
    "group": "cfp",
    "rules": [],
    "error": false
  },
  "cfp_study_report": {
    "label": "Study report",
    "value": "",
    "type": "text",
    "group": "cfp",
    "rules": [],
    "error": false
  },
  "cfp_version": {
    "label": "Version",
    "value": "",
    "type": "text",
    "rules": [],
    "error": false,
    "group": "cfp"
  },
  "cfp_verified_by": {
    "label": "Verified by",
    "value": "",
    "type": "text",
    "rules": [],
    "error": false,
    "group": "cfp"
  },
  "cfp_notes": {
    "label": "Notes",
    "value": "",
    "type": "text",
    "rules": [],
    "error": false,
    "group": "cfp"
  },
  "cfo_registration_date": {
    "label": "Registration of",
    "value": "",
    "type": "date",
    "rules": [],
    "error": false,
    "group": "cfo",
    "config": {
      "dateFormat": "d/m/Y"
    }
  },
  "cfo_reporting_year": {
    "label": "Reporting year",
    "value": "",
    "type": "text",
    "rules": [],
    "error": false,
    "group": "cfo"
  },
  "cfo_total_ghg": {
    "label": "Total GHG emissions (t CO<sub>2</sub>e)",
    "value": "",
    "type": "text",
    "rules": [],
    "error": false,
    "group": "cfo"
  },
  "cfo_ghg_inventory": {
    "label": "GHG inventory report and version",
    "value": "",
    "type": "text",
    "rules": [],
    "error": false,
    "group": "cfo"
  },
  "cfo_verified_by": {
    "label": "Verified by",
    "value": "",
    "type": "text",
    "rules": [],
    "error": false,
    "group": "cfo"
  },
  "cfo_boundaries": {
    "label": "Organizational boundaries",
    "value": "",
    "type": "text",
    "rules": [],
    "error": false,
    "group": "cfo"
  },
  "emission_direct_category_1": {
    "label": "Category 1. Direct GHG emissions and removals",
    "value": "",
    "type": "text",
    "rules": [],
    "error": false,
    "group": "emission"
  },
  "emission_direct_scope_1": {
    "label": "Scope 1",
    "value": "",
    "type": "text",
    "rules": [],
    "error": false,
    "group": "emission"
  },
  "emission_indirect_category_2": {
    "label": "Category 2. Indirect GHG emissions from imported energy",
    "value": "",
    "type": "text",
    "rules": [],
    "error": false,
    "group": "emission"
  },
  "emission_indirect_category_3": {
    "label": "Category 3. Indirect GHG emissions from transportation",
    "value": "",
    "type": "text",
    "rules": [],
    "error": false,
    "group": "emission"
  },
  "emission_indirect_category_4": {
    "label": "Category 4. Indirect GHG emissions from products used by organization",
    "value": "",
    "type": "text",
    "rules": [],
    "error": false,
    "group": "emission"
  },
  "emission_indirect_category_5": {
    "label": "Category 5. Indirect GHG emissions associated with the use of products from the organization",
    "value": "",
    "type": "text",
    "rules": [],
    "error": false,
    "group": "emission"
  },
  "emission_indirect_category_6": {
    "label": "Category 6. Indirect GHG emissions from other sources",
    "value": "",
    "type": "text",
    "rules": [],
    "error": false,
    "group": "emission"
  },
  "emission_indirect_scope_2": {
    "label": "Scope 2",
    "value": "",
    "type": "text",
    "rules": [],
    "error": false,
    "group": "emission"
  },
  "emission_indirect_scope_3": {
    "label": "Scope 3",
    "value": "",
    "type": "text",
    "rules": [],
    "error": false,
    "group": "emission"
  },
  "offset_year": {
    "label": "Year of emissions offset",
    "value": "",
    "type": "text",
    "rules": [],
    "error": false,
    "group": "offset"
  },
  "offset_co2": {
    "label": "t CO<sub>2</sub> offset",
    "value": "",
    "type": "text",
    "rules": [],
    "error": false,
    "group": "offset"
  },
  "offset_registry": {
    "label": "Registry",
    "value": "",
    "type": "text",
    "rules": [],
    "error": false,
    "group": "offset"
  },
  "offset_project": {
    "label": "Project",
    "value": "",
    "type": "text",
    "rules": [],
    "error": false,
    "group": "offset"
  },
  "offset_reference": {
    "label": "Reference Number",
    "value": "",
    "type": "text",
    "rules": [],
    "error": false,
    "group": "offset"
  },
  "ghg_fossil": {
    "label": "Net fossil GHG emissions and removals",
    "value": "",
    "type": "text",
    "rules": [],
    "error": false,
    "group": "ghg"
  },
  "ghg_emissions": {
    "label": "Biogenic GHG emissions",
    "value": "",
    "type": "text",
    "rules": [],
    "error": false,
    "group": "ghg"
  },
  "ghg_removals": {
    "label": "Biogenic GHG removals",
    "value": "",
    "type": "text",
    "rules": [],
    "error": false,
    "group": "ghg"
  },
  "ghg_res": {
    "label": "GHG emissions and removals resulting from dLUC",
    "value": "",
    "type": "text",
    "rules": [],
    "error": false,
    "group": "ghg"
  },
  "ghg_aircraft": {
    "label": "Aircraft GHG emessions",
    "value": "",
    "type": "text",
    "rules": [],
    "error": false,
    "group": "ghg"
  }
};
