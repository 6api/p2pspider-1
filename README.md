## Description
A daemon(s) that scrapes p2p dht and an express bootstrapped front-end connected to the same mongodb.
That is a mouth full.

## Dependencies
Node.js > 6
MongoDB

## Start
    npm install -g pm2
    npm install
    pm2 start ecosystem.json

## Protocols
[bep_0005](http://www.bittorrent.org/beps/bep_0005.html), [bep_0003](http://www.bittorrent.org/beps/bep_0003.html), [bep_0010](http://www.bittorrent.org/beps/bep_0010.html), [bep_0009](http://www.bittorrent.org/beps/bep_0009.html)

## Notice
Please don't share the data p2pspider crawled to the internet. Because sometimes it crawls sensitive/copyrighted/porn data.

## License
MIT
