export default {
  IPFS_CONFIG: {
    repo: 'ipfs/robonomics-status/2',
    relay: {
      enabled: true,
      hop: {
        enabled: true
      }
    },
    EXPERIMENTAL: {
      pubsub: true
    },
    config: {
      Addresses: {
        Swarm: [
          '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star',
          '/dns4/1.wsstar.aira.life/tcp/443/wss/p2p-websocket-star/',
          '/dns4/2.wsstar.aira.life/tcp/443/wss/p2p-websocket-star/',
          '/dns4/3.wsstar.aira.life/tcp/443/wss/p2p-websocket-star/'
        ]
      },
      Bootstrap: [
        '/dns4/ams-1.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLer265NRgSp2LA3dPaeykiS1J6DifTC88f5uVQKNAd',
        '/dns4/lon-1.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLMeWqB7YGVLJN3pNLQpmmEk35v6wYtsMGLzSr5QBU3',
        '/dns4/nyc-1.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLueR4xBeUbY9WZ9xGUUxunbKWcrNFTDAadQJmocnWm',
        '/dns4/nyc-2.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLV4Bbm51jM9C4gDYZQ9Cy3U6aXMJDAbzgu2fzaDs64',
        '/dns4/node0.preload.ipfs.io/tcp/443/wss/ipfs/QmZMxNdpMkewiVZLMRxaNxUeZpDUb34pWjZ1kZvsd16Zic',
        '/dns4/node1.preload.ipfs.io/tcp/443/wss/ipfs/Qmbut9Ywz9YEDrz8ySBSgWyJk41Uvm2QJPhwDJzJyGFsD6',
        '/dns4/1.pubsub.aira.life/tcp/443/wss/ipfs/QmdfQmbmXt6sqjZyowxPUsmvBsgSGQjm4VXrV7WGy62dv8',
        '/dns4/2.pubsub.aira.life/tcp/443/wss/ipfs/QmPTFt7GJ2MfDuVYwJJTULr6EnsQtGVp8ahYn9NSyoxmd9',
        '/dns4/3.pubsub.aira.life/tcp/443/wss/ipfs/QmWZSKTEQQ985mnNzMqhGCrwQ1aTA6sxVsorsycQz9cQrw'
      ]
    }
  },
  CHAINS: [4451],
  GATEWAY: 'https://ipfs.ipci.io/ipfs/',
  ROBONOMICS: {
    version: 5,
    emitter: '0x4b255d6E57409232F7C29759D5699dabE66f8Cd5',
    model: {
      issuing: 'QmfK3LyEPLoYJCKXate1PceGLBNBaodwqcV9XirwHZFbsc',
      offsetting: 'QmW3dTa1QZxnZzpF9TDuHKN7GDKaJDVoQys4u38xmdAGHF',
      mauritius: 'QmQBLYH8T5vmaDQedrV6meKFHniX7jUdAu1GFufBDVJ7YN',
      khimprom: 'QmXzHDbfJG5ygAQbQZGAEpCcGa3Sc7c6Lvx9FxhVMvCR7M',
      swissKrono: 'QmRC1Sg4kGwbgUSDWbKc41HGHVP49W4vfG4GQLwgac1QV8'
    },
    token: {
      offsetting: '0x7cfd3337F9e423751C9314f9C80cbA57CA2844FE',
      mauritius: '0x7cfd3337F9e423751C9314f9C80cbA57CA2844FE',
      khimprom: '0x7cfd3337F9e423751C9314f9C80cbA57CA2844FE',
      swissKrono: '0x7cfd3337F9e423751C9314f9C80cbA57CA2844FE'
    },
    validator: {
      issuing: '0x0000000000000000000000000000000000000000',
      offsetting: '0x0000000000000000000000000000000000000000',
      mauritius: '0x0000000000000000000000000000000000000000',
      khimprom: '0x0000000000000000000000000000000000000000',
      swissKrono: '0x0000000000000000000000000000000000000000'
    }
  }
};
