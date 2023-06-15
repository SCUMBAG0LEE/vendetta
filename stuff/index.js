(function(c,p,w,d,u,a,y,v){"use strict";const{ScrollView:_}=u.General,{FormSection:h,FormRadioRow:b,FormSwitchRow:S,FormIcon:M}=u.Forms;function $(){return y.useProxy(a.storage),React.createElement(_,null,React.createElement(h,{title:"Misc Settings",titleStyleType:"no_border"}),React.createElement(S,{label:"NSFW Warning",subLabel:"Warn when sending an NSFW image in a non NSFW channel.",leading:React.createElement(M,{source:v.getAssetIDByName("ic_warning_24px")}),value:a.storage.nsfwwarn,onValueChange:function(n){return a.storage.nsfwwarn=n}}),React.createElement(h,{title:"Defalt Sort",titleStyleType:"no_border"},Object.entries({Best:"best",Hot:"hot",New:"new",Rising:"rising",Top:"top",Controversial:"controversial"}).map(function(n){let[t,r]=n;return React.createElement(b,{label:t,selected:a.storage.sortdefs===r,onPress:function(){a.storage.sortdefs=r}})})))}const g=d.findByProps("sendMessage","receiveMessage"),R=d.findByProps("getLastSelectedChannelId"),T=d.findByProps("createBotMessage"),A=d.findByProps("BOT_AVATARS");function l(n,t,r){const o=n??R?.getChannelId?.(),s=T.createBotMessage({channelId:o,content:"",embeds:r});s.author.username="homie",s.author.avatar="ASV",A.BOT_AVATARS.ASV="https://pbs.twimg.com/media/Eys2THcXMAYPius.jpg",typeof t=="string"?s.content=t:Object.assign(s,t),g.receiveMessage(o,s)}let f=[];f.push(p.registerCommand({name:"hentai",displayName:"hentai",description:"Get a hentai content",displayDescription:"Get a hentai content",options:[{name:"silent",displayName:"silent",description:"Makes it so only you can see the message.",displayDescription:"Makes it so only you can see the message.",required:!1,type:5},{name:"sort",displayName:"sort",description:"Changes the way reddit sorts.",displayDescription:"Changes the way reddit sorts",required:!1,type:3}],applicationId:"-1",inputType:1,type:1,execute:async function(n,t){try{let r=!0,o=n.find(function(i){return i.name==="sort"})?.value,s=n.find(function(i){return i.name==="silent"})?.value;if(typeof o>"u"&&(o=a.storage.sortdefs),!["best","hot","new","rising","top","controversial"].includes(o)){l(t.channel.id,"Incorrect sorting type. Valid options are\n`best`, `hot`, `new`, `rising`, `top`, `controversial`.",[]);return}let e=await fetch(`https://www.reddit.com/r/hentai/${o}.json?limit=100`).then(function(i){return i.json()});if(!t.channel.nsfw_&&r&&a.storage.nsfwwarn&&!(s??!0)){l(t.channel.id,`This channel is not marked as NSFW
(You can disable this check in plugin settings)`,[]);return}r&&(e=await fetch(`https://www.reddit.com/r/hentai/${o}.json?limit=100`).then(function(i){return i.json()})),e=e.data?.children?.[Math.floor(Math.random()*e.data?.children?.length)]?.data;let m=await fetch(`https://www.reddit.com/u/${e?.author}/about.json`).then(function(i){return i.json()});s??!0?l(t.channel.id,"",[{type:"rich",title:e?.title,url:`https://reddit.com${e?.permalink}`,author:{name:`u/${e?.author} \u2022 r/${e?.subreddit}`,proxy_icon_url:m?.data.icon_img.split("?")[0],icon_url:m?.data.icon_img.split("?")[0]},image:{proxy_url:e?.url_overridden_by_dest.replace(/.gifv$/g,".gif")??e?.url.replace(/.gifv$/g,".gif"),url:e?.url_overridden_by_dest?.replace(/.gifv$/g,".gif")??e?.url?.replace(/.gifv$/g,".gif"),width:e?.preview?.images?.[0]?.source?.width,height:e?.preview?.images?.[0]?.source?.height},color:"0xf4b8e4"}]):g.sendMessage(t.channel.id,{content:e?.url_overridden_by_dest??e?.url})}catch(r){w.logger.log(r),l(t.channel.id,"Error, Try Check The Debug Log For More Information",[])}}}));const B=$,F=function(){a.storage.nsfwwarn??=!0,a.storage.sortdefs??="new"},j=function(){for(const n of f)n()};return c.onLoad=F,c.onUnload=j,c.settings=B,c})({},vendetta.commands,vendetta,vendetta.metro,vendetta.ui.components,vendetta.plugin,vendetta.storage,vendetta.ui.assets);
