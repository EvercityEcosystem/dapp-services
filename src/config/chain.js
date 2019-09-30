const chains = {
  1: {
    ROBONOMICS: {
      ens: '',
      ensSuffix: 'eth',
      lighthouse: 'stable.lighthouse.5.robonomics.eth'
    },
    emitter: '0x1Ee7a0aCbA1AE78F5E51c7338BB983A091da3A8E',
    token: {
      issuing: '0x7dE91B204C1C737bcEe6F000AAA6569Cf7061cb7', // Robonomics (XRT)
      offsetting: '0x7dE91B204C1C737bcEe6F000AAA6569Cf7061cb7', // Robonomics (XRT)
      mauritius: '0x7dE91B204C1C737bcEe6F000AAA6569Cf7061cb7', // Robonomics (XRT)
      khimprom: '0x7dE91B204C1C737bcEe6F000AAA6569Cf7061cb7', // Robonomics (XRT)
      swissKrono: '0x7dE91B204C1C737bcEe6F000AAA6569Cf7061cb7', // Robonomics (XRT)
      nudao: '0x1F383e0d9aEC434a3E5571136AbB8152e4b4cf00', // NU DAO (KZT)
      agrix: '0x7dE91B204C1C737bcEe6F000AAA6569Cf7061cb7' // Robonomics (XRT)
    },
    validator: {
      issuing: '0xaB47917719b01D102b434a7ca68335bB117e42e1',
      offsetting: '0x0000000000000000000000000000000000000000',
      mauritius: '0x0000000000000000000000000000000000000000',
      khimprom: '0x0000000000000000000000000000000000000000',
      swissKrono: '0x0000000000000000000000000000000000000000',
      nudao: '0x0000000000000000000000000000000000000000',
      agrix: '0x0000000000000000000000000000000000000000'
    }
  },
  4451: {
    ROBONOMICS: {
      ens: '0xaC4Ac4801b50b74aa3222B5Ba282FF54407B3941',
      ensSuffix: 'sid',
      lighthouse: 'airalab.lighthouse.5.robonomics.sid'
    },
    emitter: '0x1e4cBF8fce988129cDF9384f356fD03846FAe391',
    token: {
      issuing: '0x966EbbFD7ECbCF44b1e05341976e0652CFA01360', // Bridged Robonomics token (XRT)
      offsetting: '0x7cfd3337F9e423751C9314f9C80cbA57CA2844FE', // DAI (DAI)
      mauritius: '0x7cfd3337F9e423751C9314f9C80cbA57CA2844FE', // DAI (DAI)
      khimprom: '0x7cfd3337F9e423751C9314f9C80cbA57CA2844FE', // DAI (DAI)
      swissKrono: '0x7cfd3337F9e423751C9314f9C80cbA57CA2844FE', // DAI (DAI)
      nudao: '0x7cfd3337F9e423751C9314f9C80cbA57CA2844FE', // DAI (DAI)
      agrix: '0x7cfd3337F9e423751C9314f9C80cbA57CA2844FE' // DAI (DAI)
    },
    validator: {
      issuing: '0xf7DaBE630BA2d06E24dCF24e3aCE8802eC2f84fc',
      offsetting: '0x0000000000000000000000000000000000000000',
      mauritius: '0x0000000000000000000000000000000000000000',
      khimprom: '0x0000000000000000000000000000000000000000',
      swissKrono: '0x0000000000000000000000000000000000000000',
      nudao: '0x0000000000000000000000000000000000000000',
      agrix: '0x0000000000000000000000000000000000000000'
    }
  }
};

export default networkId => {
  return chains[networkId];
};
