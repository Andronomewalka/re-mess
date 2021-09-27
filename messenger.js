import { useEffect } from "react";

const messages = []

function internalSubscribe(appMessage, callback, priority = -1) {
    // console.log('Messenger:: subscribe', appMessage)
    // if message with such appMesage exist, insert it before elem with highest priority
    // so when send is dispatched all messages will be called by their priorities
    const sameMessage = messages.find(cur => cur.appMessage === appMessage)
    if (sameMessage)
        messages.splice(messages.indexOf(sameMessage) - 1, 0, {
            appMessage, callback, priority
        })
    else
        messages.push({
            appMessage, callback, priority
        })
}

function internalUnsubscribe(appMessage, callback, priority = -1) {
    // console.log('Messenger:: unsubscribe', appMessage)
    const message = messages.find(cur => cur.appMessage === appMessage &&
        cur.callback === callback &&
        (priority === -1 || cur.priority === priority))

    if (message) {
        messages.splice(messages.indexOf(message), 1)
    }
}

export function sendMessage(appMessage, ...args) {
    // console.log('Messenger:: send', appMessage, args, this.messages)
    messages.filter(cur => cur.appMessage === appMessage)
        .forEach(cur => {
            if (typeof cur.callback === 'function')
                cur.callback(...args)
        })
}

export function useSubscribe(appMessage, callback, priority = -1) {
    useEffect(() => {
        internalSubscribe(appMessage, callback, priority)
        return () => {
            internalUnsubscribe(appMessage, callback, priority)
        }
    }, [appMessage, callback, priority])
}