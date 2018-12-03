import request from '@/utils/request'

export function getTodo(params) {
    return request({
        url: '/api/bench/todo',
        method: 'get',
        params
    })
}

export function getFlows(params) {
    return request({
        url: '/ruban/flow',
        method: 'get',
        params
    })
}

export function start(params) {
    return request({
        url: '/api/core/start',
        method: 'post',
        data: params
    })
}

export function getComments(params) {
    return request({
        url: '/api/core/getComments/',
        method: 'get',
        params
    })
}

export function instanceInfo(params) {
    return request({
        url: '/api/core/instanceInfo',
        method: 'get',
        params
    })
}

export function saveComment(params) {
    return request({
        url: '/api/core/saveComment',
        method: 'post',
        data:params
    })
}

export function signIn(params) {
    return request({
        url: '/api/core/signIn',
        method: 'get',
        params
    })
}

export function unSignIn(params) {
    return request({
        url: '/api/core/unSignIn',
        method: 'get',
        params
    })
}

export function submit(params) {
    return request({
        url: '/api/core/submit',
        method: 'post',
        data:params
    })
}

export function agreeNodeSelect(params) {
    return request({
        url: '/api/core/getNextNodeInfos/',
        method: 'get',
        params
    })
}

export function agreeSelectNodeUser(params) {
    return request({
        url: '/api/core/getNodeUsers',
        method: 'get',
        params
    })
}







