// Album art, served from Apple's public artwork CDN.
// Singles that never made it to streaming (Push Ups, Duppy Freestyle,
// Two Birds, One Stone) fall back to the owl.
const COVERS = {
  byAlbum: {
    "So Far Gone": "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/50/7f/3b/507f3b71-c606-5a59-06ee-22be3e1e6ca5/00602577542602.rgb.jpg/300x300bb.jpg",
    "Thank Me Later": "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/65/d3/f6/65d3f6e2-25d5-5890-afe5-526e7cb993ff/00602527458038.rgb.jpg/300x300bb.jpg",
    "Take Care": "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/d2/53/62/d2536245-b94c-b3fd-7168-9512f655f6d4/00602527899091.rgb.jpg/300x300bb.jpg",
    "Nothing Was the Same": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/60/e8/d1/60e8d144-2b8e-cbdc-9ff8-beaf9f4868b1/00602537542345.rgb.jpg/300x300bb.jpg",
    "If You're Reading This It's Too Late": "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/f7/7d/bb/f77dbbb4-e8a2-855d-cc5c-79804a297599/00602547261908.rgb.jpg/300x300bb.jpg",
    "Views": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/95/f5/87/95f587f7-21c3-d5f9-d81a-4350f9caa020/16UMGIM27643.rgb.jpg/300x300bb.jpg",
    "More Life": "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/18/9d/b8/189db80b-bfa8-89d1-1514-5fcb7e5cf8f4/00602557611526.rgb.jpg/300x300bb.jpg",
    "Scorpion": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/bb/6d/8f/bb6d8f67-6d04-10b5-dd62-eb5809ac54fc/00602567879152.rgb.jpg/300x300bb.jpg",
    "Dark Lane Demo Tapes": "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/00/70/0b/00700b6f-2b06-c986-c7ec-445d95b28e74/20UMGIM34467.rgb.jpg/300x300bb.jpg",
    "Certified Lover Boy": "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/cb/6b/5f/cb6b5fc3-8d35-908a-18e6-6f8eda46ce11/21UM1IM07521.rgb.jpg/300x300bb.jpg",
    "Honestly, Nevermind": "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/6d/31/ab/6d31abaf-7a07-05f1-13ad-72ec520b6bfb/22UMGIM67374.rgb.jpg/300x300bb.jpg",
    "Her Loss": "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/e1/6e/6a/e16e6a89-3e6d-1936-1a9c-b51680bcd4c1/22UM1IM29132.rgb.jpg/300x300bb.jpg",
    "For All the Dogs": "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/68/8b/a9/688ba9aa-4c90-c630-63c3-b6a7a0d945c2/23UM1IM56239.rgb.jpg/300x300bb.jpg",
    "$ome $exy $ongs 4 U": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/23/7c/a2/237ca270-9926-4b78-be81-410b6fc85f47/50291.jpg/300x300bb.jpg",
    "Young Money: Rise of an Empire": "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/be/cc/60/becc60ec-25a1-8a88-1320-6c5ab8c42131/14UMGIM06972.rgb.jpg/300x300bb.jpg",
    "The Best in the World Pack": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/95/ed/ec/95edecd9-ae39-f81c-5c96-9f20957104ec/19UMGIM54645.rgb.jpg/300x300bb.jpg"
  },
  byTitle: {
    "0 to 100 / The Catch Up": "https://is1-ssl.mzstatic.com/image/thumb/Music123/v4/df/0c/b9/df0cb92b-11be-4800-f1d3-23248e40a38a/20UMGIM02913.rgb.jpg/300x300bb.jpg",
    "Back to Back": "https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/b0/f5/74/b0f57436-0224-b075-7555-5e65517eea31/00602547534903.rgb.jpg/300x300bb.jpg",
    "Laugh Now Cry Later": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/46/05/c9/4605c970-fb01-689f-893f-5c35209d00ed/20UMGIM71042.rgb.jpg/300x300bb.jpg",
    "Search & Rescue": "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/73/35/8b/73358b42-c950-099f-6b21-6527d1ca4f85/23UMGIM39824.rgb.jpg/300x300bb.jpg",
    "Family Matters": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/3f/c5/9c/3fc59cb5-c6a5-e992-f391-86f2fbb37ce8/24UMGIM51916.rgb.jpg/300x300bb.jpg",
    "The Motion": "https://is1-ssl.mzstatic.com/image/thumb/Music123/v4/34/e5/46/34e546b6-94c9-960e-cd35-4f35ffcd6860/19UMGIM71794.rgb.jpg/300x300bb.jpg",
    "5AM in Toronto": "https://is1-ssl.mzstatic.com/image/thumb/Music123/v4/34/e5/46/34e546b6-94c9-960e-cd35-4f35ffcd6860/19UMGIM71794.rgb.jpg/300x300bb.jpg"
  }
};
