import {parse, evaluate} from 'groq-js'
const q = `*[_id=="homePage"][0]{ logoCarousel{
    // comment
    "logos": logos[defined(@->logo.asset)]->{_id, name, "src": logo.asset->url} } }`
parse(q)
const dataset = [
 {_id:'homePage',_type:'homePage',logoCarousel:{logos:[{_ref:'a'},{_ref:'missing'},{_ref:'drafts-only'},{_ref:'noimg'}]}},
 {_id:'a',_type:'clientLogo',name:'A',logo:{asset:{_ref:'img1'}}},
 {_id:'noimg',_type:'clientLogo',name:'NoImg'},
 {_id:'img1',_type:'sanity.imageAsset',url:'https://cdn/x.png'},
]
console.log(JSON.stringify(await (await evaluate(parse(q),{dataset})).get()))
