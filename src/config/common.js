export default {
  GATEWAY: "https://ipfs.io/ipfs/",
  INFURA_KEY: process.env.VUE_APP_INFURA_KEY || "",
  PINATA_JWT: process.env.VUE_APP_PINATA_JWT || "",
  PINATA_KEY: process.env.VUE_APP_PINATA_KEY || "",
  PINATA_SECRET: process.env.VUE_APP_PINATA_SECRET || "",
  ROBONOMICS: {
    version: 5,
    model: {
      issuing: "QmfK3LyEPLoYJCKXate1PceGLBNBaodwqcV9XirwHZFbsc",
      offsetting: "QmW3dTa1QZxnZzpF9TDuHKN7GDKaJDVoQys4u38xmdAGHF",
      mauritius: "QmQBLYH8T5vmaDQedrV6meKFHniX7jUdAu1GFufBDVJ7YN",
      khimprom: "QmXzHDbfJG5ygAQbQZGAEpCcGa3Sc7c6Lvx9FxhVMvCR7M",
      swissKrono: "QmRC1Sg4kGwbgUSDWbKc41HGHVP49W4vfG4GQLwgac1QV8",
      nudao: "QmQnJdBcMZLcixvSzDrsXzZNNp4vLnAY2u4Fc3pTwXJj4d",
      agrix: "QmfGz7MzHg4dsbrZktcNEsMm936D4bZMD2TuqgQpgmv4TC"
    }
  }
};
