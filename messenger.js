import { useEffect } from "react";

const messages = []

function internalSubscribe(appMessage, callback, priority = -1) {
    // console.log('Messenger:: subscribe', appMessage)
    const newMessage = { appMessage, callback, priority }
    if (priority !== -1) {
        const sameMessages = messages.filter(cur => cur.appMessage === appMessage && cur.priority !== -1)
        if (sameMessages?.length > 0) {
            const closestHigherPriority =
                    sameMessages.reduce((prev, cur) => {
                        const curDif = cur.priority - priority
                        const prevDif = prev.priority - priority
                        return curDif < prevDif && curDif >= 0 ? cur : prev
                    })

            messages.splice(messages.indexOf(closestHigherPriority) + 1, 0, newMessage)
        }
        else {
            messages.push(newMessage)
        }
    }
    else {
        messages.push(newMessage)
    }
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
    // console.log('Messenger:: send', appMessage, args)
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