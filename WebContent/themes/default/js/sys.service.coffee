__root = @

if not __root.Sys
    __root.Sys = {}
__sysRef = __root.Sys

if not __sysRef.service
    __sysRef.service = {}

__sysServiceRef = __sysRef.service

if not __sysServiceRef.ctors
    __sysServiceRef.ctors = {}

if not (__sysServiceRef.services instanceof Array)
    __sysServiceRef.services = []

class Service
    constructor: () ->
    load: (func) =>
        throw new 'This is an abstract service!'

class BaseService extends Service
    constructor: (@url, @params={}, @verb='GET') ->
        if not verb and typeof params is 'string'
            @verb = params
            @params = {}

        @config =
            baseSrvUrl: ''
    load: (func) =>
        __root.assert @url, 'Invalid url: "' + @url + '" of ' + this.constructor.toString()
        base = if @config?.baseSrvUrl then @config.baseSrvUrl else ''

        # fr = FUNCTION_RX.exec func.toString()
        # cArgs = if fr then fr[1].split /\s*\,\s*/ else []
        # if cArgs[1] is 'ecode'
        #    efunc = (data, ecode, emsg) -> func null, ecode, emsg
        # else
        #    efunc = null
        success = (data) -> func data, 0, ''
        error = (ecode, emsg) -> func null, ecode, emsg

        if @verb is 'GET'
            __sysRef.get base + @url, @params, success, error
        else if @verb is 'POST'
            __sysRef.post base + @url, @params, success, error
        else if @verb is 'PUT'
            __sysRef.put base + @url, @params, success, error
        else if @verb is 'DELETE'
            __sysRef.delete base + @url, @params, success, error
        else
            __root.assert false, 'Unknown verb: ' + @verb

class __DummyService extends Service
    constructor: () ->
        super()

    load: (func) =>
        func {}, 0, ''

class __ServiceRef
    constructor: (@attributes) ->
        @name = @attributes.name
        @alwaysLoad = @attributes.alwaysLoad
        @callbacks = []
        @reset()

    prepare: () =>
        ctor = __sysServiceRef.ctors[@name]

        __root.assert ctor, 'Cannot find service: ' + @name
        __root.assert typeof ctor is 'function', '"ctor" should be a function but ' + ctor

        fr = FUNCTION_RX.exec ctor.toString()
        cArgs = if fr then fr[1].split /\s*\,\s*/ else []

        acArgs = []
        for ca in cArgs
            acArgs.push if __root.hasOwnProperty ca then __root[ca] else null

        us = Object.create ctor.prototype
        ctor.apply us, acArgs

        if us instanceof BaseService
            us.config = __sysRef.config

        return us

    load: (ctx={}) =>
        if not @loaded and not @loading
            @loading = true

            # Load service and call callbacks one by one
            cbs = (cb for cb in @callbacks when typeof cb is 'function')
            @prepare().load (data, ecode, emsg) =>
                @loading = false
                @loaded = true
                c = 0
                errorHandled = false
                for cb in cbs
                    if cb(data, ecode, emsg, ctx) and ecode
                        errorHandled = true
                if ecode and not errorHandled
                    __sysRef.errorDlg if emsg then emsg else '\u64cd\u4f5c\u5931\u8d25'
                    return true
                else
                    return false

        return @

    reset: () =>
        @loading = false
        @loaded = false
        return @

    callback: (func) =>
        __root.assert func instanceof Function, '"func" should be function, but ' + func
        @callbacks.push func
        return @

__sysServiceRef.Service = Service
__sysServiceRef.BaseService = BaseService

###
Match:
- ^          the beginning of the string
- function   the word 'function'
- \s*        optionally followed by white space
- \(         followed by an opening brace
- ([\w\$\s\,]+)  capture one or more valid JavaScript identifier characters
- \s*        optionally followed by white space (in theory there won't be any here,
              so if performance is an issue this can be omitted[1]
- \)         followed by an closing brace
###
FUNCTION_RX = /^function\s*\(([\w\s\,]+)\s*\)/

###
Create a new service if not exists
@param serviceName
@param alwaysLoad
@return
###
__createService = (serviceName, alwaysLoad) ->
    __root.assert typeof serviceName is 'string' and serviceName

    serviceName = serviceName.trim()

    for service in __sysServiceRef.services
        if service.name is serviceName
            return service

    newServiceRef = new __ServiceRef
        name: serviceName
        alwaysLoad: alwaysLoad

    __sysServiceRef.services.push newServiceRef

    return newServiceRef

###
Remove a service if exists
@param serviceName
@return
###
__removeService = (serviceName) ->
    __root.assert typeof serviceName is 'string' and serviceName

    removedService = null
    tmp = []

    while __sysServiceRef.services
        service = __sysServiceRef.shift()
        if service?.name
            if service.name is serviceName
                removedService = service
            else
                tmp.push service

    __sysServiceRef.services = tmp

    return removedService

###
Register constructor
###
__sysServiceRef.register = (serviceName, ctor) ->
    __root.assert typeof serviceName is 'string' and serviceName
    __root.assert typeof ctor is 'function', '"ctor" should be a function!'

    __sysServiceRef.ctors[serviceName] = ctor


###
Copy properties
@param src
@param dst
###
__sysServiceRef.copyProps = (src, dst) ->
    if typeof src is 'number'
        dst.value = src
    else if typeof src is 'string'
        dst.value = src
    else if typeof src is 'boolean'
        dst.value = src
    else if src instanceof Date
        dst.value = src
    else if src instanceof Array
        dst.value = src
    else
        for key, value of src
            dst[key] = value

    return dst

###
Bind function "func" to event "on" of service
@param serviceName name of service
@param func Callback function when event "on" triggered
@param alwaysLoad this service should be loaded always
###
__sysServiceRef.on = (serviceName, func, alwaysLoad=true) ->
    __root.assert typeof serviceName is 'string' and serviceName
    __root.assert typeof func is 'function', '"func" should be a function!'

    __createService serviceName, alwaysLoad
        .callback func

###
load service
@param serviceName name of service
@param ctx context
@param force force to reload
@return service
###
__sysServiceRef.load = (serviceName, ctx={}, force=false) ->
    __root.assert typeof serviceName is 'string' and serviceName

    service = __createService serviceName, false
    if force
        service.reset()
    service.load(ctx)

###
Reset a service if exists
@param serviceName
@return service
###
__sysServiceRef.reset = (serviceName) ->
    __root.assert typeof serviceName is 'string' and serviceName
    service = __createService serviceName, false
    service.reset()

###
Load all services
@param ctx context
###
__sysServiceRef.loadAll = (ctx={}) ->
    for service in __sysServiceRef.services when service and service.alwaysLoad and not service?.loaded
        service.load(ctx)

###
Dump all services
###
__sysServiceRef.dumpAll = () ->
    __root.assert __sysServiceRef.services instanceof Array, 'Sys.service.services is not an Array!'
    __root.log '***************************************************************************'
    i = 0
    for service in __sysServiceRef.services when service
        __root.log '[' + (i++) + ']  ' + service.name + ' ( alwaysLoad=' + service.alwaysLoad + ', loaded=' + service.loaded + ' )'
    __root.log ''
    __root.log '' + i + ' service(s) in total.'
    __root.log '***************************************************************************'

###
Auto load all when document is ready
###
jQuery(document).ready () -> __sysServiceRef.loadAll()
