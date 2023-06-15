// some of the code taken from aeongdesu & original emnity plugin by spinfal (most of the code is from spinfal)
import { registerCommand } from "@vendetta/commands"
import { logger } from "@vendetta";
import { findByProps } from "@vendetta/metro"
import Settings from "./settings";
import { storage } from '@vendetta/plugin';

const MessageActions = findByProps("sendMessage", "receiveMessage")
const Channels = findByProps('getLastSelectedChannelId')
const BotMessage = findByProps('createBotMessage')
const Avatars = findByProps("BOT_AVATARS")

function sendReply(channelID, content, embed) 
{
    const channel = channelID ?? Channels?.getChannelId?.();
    const msg = BotMessage.createBotMessage({ channelId: channel, content: '', embeds: embed });
    msg.author.username = 'Homie';
    msg.author.avatar = 'SUSV';
    Avatars.BOT_AVATARS.SUSV = 'https://pbs.twimg.com/media/Eys2THcXMAYPius.jpg';

    if (typeof content === 'string') 
    {
        msg.content = content;
    } 
    else 
    {
        Object.assign(msg, content);
    }

    MessageActions.receiveMessage(channel, msg);
}

let commands = []

commands.push(registerCommand({
    name: "hentai",
    displayName: "hentai",
    description: "Get a hentai content",
    displayDescription: "Get a hentai content",
    options: 
    [{
        name: "sort",
        displayName: "sort",
        description: "Changes the way reddit sorts.",
        displayDescription: "Changes the way reddit sorts",
        required: false,
        type: 3
    }, 
    {
        name: "silent",
        displayName: "silent",
        description: "Makes it so only you can see the message.",
        displayDescription: "Makes it so only you can see the message.",
        required: false,
        type: 5
    }],
    applicationId: "-1",
    inputType: 1,
    type: 1,
    execute: async (args, ctx) => 
        {
            try 
            {
                let sort = args.find(arg => arg.name === "sort")?.value
                let silent = args.find(arg => arg.name === "silent")?.value

                if (typeof sort === "undefined") sort = storage.sortdefs;
                if (!["best", "hot", "new", "rising", "top", "controversial"].includes(sort)) 
                {
                    sendReply(ctx.channel.id, "Incorrect sorting type. Valid options are\n`best`, `hot`, `new`, `rising`, `top`, `controversial`.", [])
                    return
           }
            
            let response = await fetch(`https://www.reddit.com/r/hentai/${sort}.json?limit=100`).then(res => res.json());
            response = response.data?.children?.[Math.floor(Math.random() * response.data?.children?.length)]?.data;

            if (silent ?? true) 
            {
                sendReply(ctx.channel.id, "", [{type: "rich", title: response?.title, url: `https://reddit.com${response?.permalink}`,
                    author: 
                    {
                        name: `u/${response?.author} • r/${response?.subreddit}`,
                        proxy_icon_url: author?.data.icon_img.split('?')[0],
                        icon_url: author?.data.icon_img.split('?')[0]
                    },
                    image: 
                    {
                        proxy_url: response?.url_overridden_by_dest.replace(/.gifv$/g, ".gif") ?? response?.url.replace(/.gifv$/g, ".gif"),
                        url: response?.url_overridden_by_dest?.replace(/.gifv$/g, ".gif") ?? response?.url?.replace(/.gifv$/g, ".gif"),
                        width: response?.preview?.images?.[0]?.source?.width,
                        height: response?.preview?.images?.[0]?.source?.height
                    },
                    color: "0xf4b8e4"
                }])
            } 
            else 
            {
                MessageActions.sendMessage(ctx.channel.id, 
                {
                    content: response?.url_overridden_by_dest ?? response?.url
                })
            }

        } 
        catch (err) 
        {
            logger.log(err);
            sendReply(ctx.channel.id, "ERROR", [])
        }
    }
}))

export const settings = Settings;

export const onLoad = () => 
    {
        storage.nsfwwarn ??= true
        storage.sortdefs ??= "new"
    }

export const onUnload = () => 
    {
        for (const unregisterCommands of commands) 
            unregisterCommands()
    }
