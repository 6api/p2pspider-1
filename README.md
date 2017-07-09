## Description

A daemon(s) that scrapes p2p dht and an express bootstrapped front-end connected to the same mongodb.
That is a mouth full.

## Screenshot

![Screenshot][logo]

[logo]: https://i.imgur.com/MdqTA6d.png "pm2 monit"

## Dependencies

Node.js > 4

MongoDB

## Start

    npm install -g pm2
    npm install
    pm2 start ecosystem.json
    pm2 monit

## Protocols

[bep_0005](http://www.bittorrent.org/beps/bep_0005.html), [bep_0003](http://www.bittorrent.org/beps/bep_0003.html), [bep_0010](http://www.bittorrent.org/beps/bep_0010.html), [bep_0009](http://www.bittorrent.org/beps/bep_0009.html)

## Notes

Cluster mode will not and will never work on Windows... With other OSs we can get multiple instances listening on the same UDP port.

You will need to have a port open on the outside and defined.

## Notice

Please don't share the data p2pspider crawled to the internet. Because sometimes it crawls sensitive/copyrighted/porn data.

## License

MIT
