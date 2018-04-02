__root = @

SYS_VERSION = '1.0.0'

if not __root.Sys
    __root.Sys = {}
__sysRef = __root.Sys

if not __sysRef.config
    __sysRef.config =
        version: SYS_VERSION

###
Enhance String
###
if typeof String.prototype.trim isnt 'function'
    String::trim = () ->
        return @replace /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ''

if typeof String.prototype.join isnt 'function'
    String::join = (data) ->
        s = ''
        if data
            for d in data
                if not s
                    s = s + d
                else
                    s = s + @ + d

        return s

###
Enhance object
###
if typeof Object.extends isnt 'function'
    Object.extends = (subc, superc) ->
        # Only constructor has prototype
        __root.assert typeof subc is 'function'
        __root.assert typeof superc is 'function'

        Temp = () ->

        Temp.prototype = superc.prototype
        subc.prototype = new Temp()
        subc.prototype.constructor = subc
        subc.uber = superc.prototype
        subc.prototype


###
Extend jQuery
###
jQuery.fn.serializeObject = () ->
    o = {}
    a = this.serializeArray()
    for kp in a
        if not kp.name
            continue
        o[kp.name] = $.trim kp.value
    return o

###
Enhance __root
###

###
Log
###
if typeof __root.log isnt 'function'
    __root.log = (msg) ->
        console?.log msg

###
Assert
###
if typeof __root.assert isnt 'function'
    __root.assert = (c, msg='') ->
        if console?.assert
            console.assert c, msg
        else if not c
            msg = if not msg then 'Assertion failed' else 'Assertion failed: ' + msg
            if __root.log
                console.log msg
            else if typeof Error isnt 'undefined'
                throw new Error msg
            else
                throw msg

###
Set root url
###
__sysRef.setRootUrl = (url) ->
    __sysRef.__relRootUrl = url ? ''

###
Set root image url
###
__sysRef.setImageUrl = (url) ->
    __sysRef.__relImageUrl = url ? ''

###
Eval relative url
###
__sysRef.evalUrl = (src) ->
    url = __sysRef.joinUrl __sysRef.__relRootUrl, if src? then src.toString() else ''
    return if url[0] is '/' then url[1..] else url # Remove first '/'

###
Eval relateive image url
###
__sysRef.evalImageUrl = (src) ->
    url = __sysRef.joinUrl __sysRef.__relImageUrl, if src? then src.toString() else ''
    return if url[0] is '/' then url[1..] else url # Remove first '/'

###
Join multiple part into url
###
__sysRef.joinUrl = (path...) ->
    if path.length is 0
        return ''

    p0 = path.shift()
    ary = [p0]
    for p in path
        if p0[-1..] isnt '/' and p[0] isnt '/'
            ary.push '/' + p
        else
            ary.push p

        p0 = p

    return ary.join ''

###
Execute ajax get
@param url url
@param data data to be sent
@param success callback function when succeeded
@param error callback function when failed
###
__sysRef.get = (url, data, success, error) ->
    [success, error] = __wrapCallbacks success, error

    qs = ''
    if data?
        if typeof data isnt 'object'
            throw 'Expected [object], but ' + data
        sfa = []
        for key, value of data
            sfa.push __root.encodeURIComponent(key) + '=' + __root.encodeURIComponent(value)
        qs = sfa.join '&'

    if qs.length isnt 0
        url = url + '?' + qs

    __root.log 'GET ' + url

    jQuery.ajax {
            url: url,
            method: 'GET',
            dataType: 'json',
            cache: false
        }
        .done success
        .fail error

###
Execute ajax put
@param url url
@param data data to be sent
@param success callback function when succeeded
@param error callback function when failed
###
__sysRef.put = (url, data, success, error) ->
    [success, error] = __wrapCallbacks success, error

    __root.log 'PUT ' + url

    jQuery.ajax {
            url: url,
            method: 'PUT',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            data: data,
            dataType: 'json',
            cache: false
        }
        .done success
        .fail error

###
Execute ajax post
@param url url
@param data data to be sent
@param success callback function when succeeded
@param error callback function when failed
###
__sysRef.post = (url, data, success, error) ->
    [success, error] = __wrapCallbacks success, error

    __root.log 'POST ' + url

    jQuery.ajax {
            url: url,
            method: 'POST',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            data: data,
            dataType: 'json'
        }
        .done success
        .fail error

###
Execute ajax delete
@param url url
@param success callback function when succeeded
@param error callback function when failed
###
__sysRef.del = (url, success, error) ->
    [success, error] = __wrapCallbacks success, error

    __root.log 'DELETE ' + url

    jQuery.ajax {
            url: url,
            method: 'DELETE',
            dataType: 'json'
        }
        .done success
        .fail error

__wrapCallbacks = (success, error) ->
    if typeof success isnt 'function'
        success = __sysRef.__onAjaxSuccess

    if typeof error isnt 'function'
        error = __wrapErr __sysRef.__onAjaxError
    else
        error = __wrapErr error

    return [success, error]

__wrapErr = (fn) ->
    return (xhr, status, error) ->
        if xhr.status < 500 || xhr.status > 599
            return fn -xhr.status, xhr.responseText
        if status is 'error'
            atext = xhr.responseText?.trim()
            [p1, p2] = if atext? then atext.split('*') else [1, '']
            if p2 is undefined
                [p1, p2] = [1, p1]
            else
                p1 = parseInt(p1)

            return fn p1, p2
        else
            throw error

__sysRef.__onAjaxSuccess = (data) ->
    __root.log 'Succeeded callback: ' + data

__sysRef.__onAjaxError = (ecode, emsg) ->
    __root.log 'Failed callback: (' + ecode + ') ' + emsg
    # __sysRef.errorDlg if emsg? then emsg else '\u64cd\u4f5c\u5931\u8d25'

###
Bind data to container
@param cnt container
@param data bindable data, should be an array
@param func bind function
  func(cnt, item, i)
###
__sysRef.bind = (cnt, data = [], func) ->
    __sysRef.assert func, 'func should be Function, but ' + func

    cnt.innerHTML = '' # Clear all content

    i = 0
    for item in data
        func cnt, item, i
        ++i

    return i

__sysRef.HTML_ENTITY_RX = /&|\<|\>|\"|\s/g

###
Encode text to html
###
__sysRef.encode = (s) ->
    s = (s or '').toString()

    return s.replace __sysRef.HTML_ENTITY_RX, (ps) ->
        if ps is '&'
            return '&amp;'
        else if ps is '<'
            return '&lt;'
        else if ps is '>'
            return '&gt;'
        else if ps is '"'
            return '&quot;'
        else
            return '&nbsp;'

###
Make elipse text
@param s source text
@param maxLen max length of text
###
__sysRef.ellipsis = (s, maxLen=32) ->
    s = (s or '').toString()

    if s.length > maxLen - 2
        return s.substring(0, maxLen - 2) + '...'
    else
        return s

__sysRef.DATE_RX = /yyyy|MM|M|dd|d|HH|H|mm|m|ss|s/g

###
Format date to string
###
__sysRef.formatDate = (t, fmt = 'yyyy-M-d') ->
    if not t
        return ''

    if typeof t is 'number'
        t = new Date(t)
    else if typeof t is 'string'
        t = new Date(parseInt(t))
    fmt = 'yyyy.MM.dd'

    syyyy = t.getFullYear().toFixed(0)
    sM = (t.getMonth() + 1).toFixed(0)
    sMM = if sM.length is 1 then '0' + sM else sM
    sd = t.getDate().toFixed(0)
    sdd = if sd.length is 1 then '0' + sd else sd
    sh = t.getHours().toFixed(0)
    shh = if sh.length is 1 then '0' + sh else sh
    sm = t.getMinutes().toFixed(0)
    smm = if sm.length is 1 then '0' + sm else sm
    ss = t.getSeconds().toFixed(0)
    sss = if ss.length is 1 then '0' + ss else ss

    return fmt.replace __sysRef.DATE_RX, (ps) ->
        if ps is 'yyyy'
            return syyyy
        else if ps is 'MM'
            return sMM
        else if ps is 'M'
            return sM
        else if ps is 'dd'
            return sdd
        else if ps is 'd'
            return sd
        else if ps is 'HH'
            return shh
        else if ps is 'H'
            return sh
        else if ps is 'mm'
            return smm
        else if ps is 'm'
            return sm
        else if ps is 's'
            return ss
        else if ps is 'ss'
            return sss
        else
            return '??' + ps + '??'

###
Format time to string
###
__sysRef.formatDateTime = (t, fmt = 'yyyy-M-d') ->
    if not t
        return ''

    if typeof t is 'number'
        t = new Date(t)
    else if typeof t is 'string'
        t = new Date(parseInt(t))

    syyyy = t.getFullYear().toFixed(0)
    sM = (t.getMonth() + 1).toFixed(0)
    sMM = if sM.length is 1 then '0' + sM else sM
    sd = t.getDate().toFixed(0)
    sdd = if sd.length is 1 then '0' + sd else sd
    sh = t.getHours().toFixed(0)
    shh = if sh.length is 1 then '0' + sh else sh
    sm = t.getMinutes().toFixed(0)
    smm = if sm.length is 1 then '0' + sm else sm
    ss = t.getSeconds().toFixed(0)
    sss = if ss.length is 1 then '0' + ss else ss

    return fmt.replace __sysRef.DATE_RX, (ps) ->
        if ps is 'yyyy'
            return syyyy
        else if ps is 'MM'
            return sMM
        else if ps is 'M'
            return sM
        else if ps is 'dd'
            return sdd
        else if ps is 'd'
            return sd
        else if ps is 'HH'
            return shh
        else if ps is 'H'
            return sh
        else if ps is 'mm'
            return smm
        else if ps is 'm'
            return sm
        else if ps is 's'
            return ss
        else if ps is 'ss'
            return sss
        else
            return '??' + ps + '??'

###
Format number to string
###
__sysRef.formatNumber = (t, th = true, dec = 2) ->

    if not t && t!=0
        return ''
    if dec < 0
        throw 'Invalid param "dec": ' + dec

    if typeof t is 'string'
        t = parseFloat(t)

    if t<0 then isNeg = true;t = 0-t else isNeg = false

    s = t.toFixed(dec)

    # Find decimal point
    dp = s.indexOf('.')
    if dp is -1 then dp = s.length

    # Add thousands
    if th
        ds = if dp is s.length then '' else s[dp..]
        ns = ''

        if dp > 3
            ns = s[dp - 3...dp]
            dp = dp - 3

        while dp > 3
            ns = s[dp - 3...dp] + ',' + ns
            dp = dp - 3

        ns = s[0...dp] + if ns.length > 0 then (',' + ns) else ns

        s = ns + ds

    return if isNeg then '-'+s else s

###
Go to HTTP protocol
###
__sysRef.goHttp = () ->
    loc = __root.location
    __root.location.replace 'http://' + loc.host + loc.pathname + loc.search + loc.hash

###
Go to HTTPS protocol
###
__sysRef.goHttps = () ->
    loc = __root.location
    __root.location.replace 'https://' + loc.host + loc.pathname + loc.search + loc.hash

###
Parse query string
###
__sysRef.parseQString = () ->
    search = __root.location.search
    if not search or search.trim() is '?'
        return []

    search = search[1..] # Remove '?'

    ss = search.split '&'
    ret = []
    for sss in ss
        [skey, svalue] = sss.split '='
        ret.push [__root.decodeURIComponent(skey.trim()), __root.decodeURIComponent(svalue)]

    return ret

###
Make query string
@param qs list of each query parameter, [[key1, value1], [key2, value2], etc...]
###
__sysRef.buildQString = (qs=[]) ->
    s = ''
    for [key, value] in qs
        value = if value is null then '' else value.toString()
        s = s + (if s then '&' else '') + __root.encodeURIComponent(key) + '=' + __root.encodeURIComponent(value)

    s = if s then ('?' + s) else ''

    loc = __root.location
    return loc.protocol + '//' + loc.host + loc.pathname + s + loc.hash

###
Get parameter by name
@param name name of parameter
###
__sysRef.getParam = (name) ->
    qs = __sysRef.parseQString()

    for [key, value] in qs
        if key is name
            return value

    return ''

__sysRef.MAX_TOTAL_PN = 200
__sysRef.MAX_PN_BTNS = 11

###
Get current page
###
__sysRef.getPage = () ->
    qs = __sysRef.parseQString()

    pv = __sysRef.getParam('p')
    pn = __root.parseInt pv

    if __root.isNaN pn
        pn = 1
    if pn > __sysRef.MAX_TOTAL_PN
        pn = __sysRef.MAX_TOTAL_PN

    return pn

###
Go to new page
@param pn page number, start from 1
###
__sysRef.setPage = (pn = 1) ->
    if pn > __sysRef.MAX_TOTAL_PN
        pn = __sysRef.MAX_TOTAL_PN

    qs = __sysRef.parseQString()

    flag = false # Found page number parameter in query string

    qs = for [key, value] in qs
        if key.toLowerCase() is 'p'
            flag = true
            [key, pn.toString()]
        else
            [key, if value is null then '' else value.toString()]

    if not flag
        qs.push ['p', pn.toString()]

    return __sysRef.buildQString(qs)

###
Create a new pagination
@param cnt Container element
@param totalPn total page number
###
__sysRef.createPage = (cnt, totalPn = __sysRef.MAX_TOTAL_PN, maxBtns = __sysRef.MAX_PN_BTNS) ->
    cnt.innerHTML = '' # Clear content

    if totalPn <= 0
        return 0
    if totalPn > __sysRef.MAX_TOTAL_PN
        totalPn = __sysRef.MAX_TOTAL_PN
    if maxBtns <= 0 or maxBtns > __sysRef.MAX_PN_BTNS
        maxBtns = __sysRef.MAX_PN_BTNS

    pn = __sysRef.getPage()
    lbtn = pn - Math.floor maxBtns / 2
    if lbtn < 2 then lbtn = 2
    rbtn = lbtn + maxBtns - 1
    if rbtn > totalPn - 1 then rbtn = totalPn - 1

    # Short cut for create button
    createBtn = (n, t) ->
        t = t or n?.toString()
        btn1 = __root.document.createElement 'a'
        btn1.innerHTML = t
        btn1.href = __sysRef.setPage n
        btn1.target = '_self'
        if n is pn
            btn1.className = 'active'
            # btn1.onclick = 'javascript:return false;'
            btn1.href = 'javascript:void 0;'
        cnt.appendChild btn1

    if pn isnt 1
        # Append prev button
        createBtn pn - 1, '&lt; \u4e0a\u4e00\u9875'

    # Append first page button
    createBtn 1

    if totalPn > maxBtns
        if lbtn > 2
            # Append ellipse
            cnt.appendChild __root.document.createTextNode '...'

        if lbtn <= rbtn
            createBtn btn for btn in [lbtn..rbtn]

        if rbtn < totalPn - 1
            # Append ellipse
            cnt.appendChild __root.document.createTextNode '...'

        # Append last page button
        createBtn totalPn
    else if totalPn > 1
        createBtn btn for btn in [2..totalPn]

    if pn isnt totalPn
        # Append next button
        createBtn pn + 1, '\u4e0b\u4e00\u9875 &gt;'

###
Set cookie
@param name name of cookie
@param value value of cookie
@param hours hours of cookie expires
###
__sysRef.setCookie = (name, value, hours = 0) ->
    str = name + '=' + __root.encodeURIComponent value
    if hours > 0
        date = new Date()
        date.setTime(date.getTime() + hours * 3600 * 1000)
        str = str + "; expires=" + date.toGMTString()
    document.cookie = str;

###
Get cookie value by name
@param name name of cookie
###
__sysRef.getCookie = (name) ->
    arrStr = __root.document.cookie.split(";");
    for s in arrStr
        if not s
            continue
        s = s.trim()
        [key, value] = s.split '='
        if key is name
            return __root.decodeURIComponent value

    return ''

###
Delete cookie by name
@param name name of cookie
###
__sysRef.delCookie = (name) ->
    date = new Date();
    date.setTime(date.getTime() - 1);
    __root.document.cookie = name + "=; expires=" + date.toGMTString();

DLG_TRUE_CB = () -> true

###
Show modal dialog with info message
@param content content of dialog
@param okValue text of ok button
@param okFun callback function when click 'OK'
###
__sysRef.infoDlg = (content = '', okValue = '\u786e\u8ba4', okFun = DLG_TRUE_CB) ->
    d = dialog {
        title : '\u63d0\u793a',
        content : content,
        fixed : true,
        quickClose : true,
        cancelDisplay: false,
        okValue : okValue,
        ok : okFun,
    }
    d.showModal()

###
Show modal dialog with error message
@param content content of dialog
@param okValue text of ok button
@param okFun callback function when click 'OK'
###
__sysRef.errorDlg = (content = '', okValue = '\u786e\u8ba4', okFun = DLG_TRUE_CB) ->
    d = dialog {
        title : '\u9519\u8bef',
        content : content,
        fixed : true,
        quickClose : true,
        cancelDisplay: false,
        okValue : okValue,
        ok : okFun,
        cancel: okFun,
    }
    d.showModal()

###
Show modal dialog with confirm message
@param content content of dialog
@param title title of dialog
@param yesValue text of ok button
@param noValue text of cancel button
@param yesFun callback function when click 'Yes'
@param noFun callback function when click 'No'
###
__sysRef.confirmDlg = (content = '', title = '\u8be2\u95ee', yesValue = '\u786e\u8ba4', noValue = '\u53d6\u6d88', yesFun = DLG_TRUE_CB, noFun = DLG_TRUE_CB) ->
    d = dialog {
        title : title,
        content : content,
        fixed : true,
        quickClose : true,
        okValue : yesValue,
        cancelValue : noValue,
        ok : yesFun,
        cancel : noFun,
    }
    d.showModal()

###
Get days between start date and end date
include start date ,do not include end date
@param et end date
@param st start date
###
__sysRef.truncLocalDay = (et,st) ->
    tet = new Date et.getFullYear(),et.getMonth(),et.getDate()
    tst = new Date st.getFullYear(),st.getMonth(),st.getDate()
    (tet - tst)/(24*3600*1000)
