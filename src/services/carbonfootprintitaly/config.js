export default {
  model: "QmRHLgQVJK9r9ioQHzNXgSFBvYwceWMm5EQeKUJrvR8jUW",
  token: "0x668B3a6F9b6C4a2759Fa3912D0a59f39d1F0f0B0",
  substrate: {
    endpoint: "wss://ipci.rpc.robonomics.network",
    types: {
      Record: "Vec<u8>",
      Parameter: "Bool",
      Address: "MultiAddress",
      LookupSource: "MultiAddress",
      EverUSDBalance: "u64",
      BondPeriod: "u64"
    }
  }
  // substrate: {
  //   endpoint: "ws://localhost:9944",
  //   types: {
  //     Record: "Vec<u8>",
  //     Parameter: "Bool",
  //     Address: "AccountId",
  //     LookupSource: "AccountId"
  //   }
  // }

  // стоимость datalog одного паспорта
  // 154000000
};
