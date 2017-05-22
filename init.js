var i = {
    w: "http://www.animehay.design",
    c: 0
}
var b = {_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",e:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=b._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},d:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=b._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}};
var $cookie = {
    getItem: function(sKey) {
        return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
    },
    setItem: function(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
        if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
            return false;
        }
        var sExpires = "";
        if (vEnd) {
            switch (vEnd.constructor) {
                case Number:
                    sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
                    break;
                case String:
                    sExpires = "; expires=" + vEnd;
                    break;
                case Date:
                    sExpires = "; expires=" + vEnd.toUTCString();
                    break;
            }
        }
        document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
        return true;
    },
    removeItem: function(sKey, sPath, sDomain) {
        if (!sKey || !this.hasItem(sKey)) {
            return false;
        }
        document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
        return true;
    },
    hasItem: function(sKey) {
        return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
    },
    keys: /* optional method: you can safely remove it! */ function() {
        var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
        for (var nIdx = 0; nIdx < aKeys.length; nIdx++) {
            aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
        }
        return aKeys;
    }
};
function ah_wf_loading(a) {
    a = jQuery("#ah-player");
    a.addClass("ah-wf-loading");
    jwplayer().on("seeked", function() {
        jQuery("#ah-player").removeClass("ah-wf-loading");
    })
};
function adSkip(t)
{
    t.parentNode.removeChild(t);
    if($("#ah-player").find("iframe").length !== 0)
    {
        reloadPlayer();
    }
    else
    {
        jwplayer().skipAd();
    }
}
function loadVideo(s, aa, seek, w, h) {
    var jp = jwplayer("ah-player");
    var sn = c(s);
    sn = JSON.parse(sn);
    s = sn;
    jp.setup({
        sources: s,
        width: w,
        height: h,
        autostart: true,
        advertising: {
            client: 'vast',
            admessage: 'Quảng cáo còn XX giây.',
            skipoffset: 5,
            skiptext: 'Bỏ qua quảng cáo',
            skipmessage: 'Bỏ qua sau xxs',
            tag: aa,
        },
    });
    if (seek != 0) {
        jp.seek(seek)
    }
    jp.on('time', function(e) {
        $cookie.setItem('resumevideodata', Math.floor(e.position) + ':' + jp.getDuration(), 82000, window.location.pathname)
    });
    jp.on('firstFrame', function() {
        var cookieData = $cookie.getItem('resumevideodata');
        if (cookieData) {
            var resumeAt = cookieData.split(':')[0],
                videoDur = cookieData.split(':')[1];
            if (parseInt(resumeAt) < parseInt(videoDur)) {
                (resumeAt == 0) ? resumeAt = 1: "";
                jp.seek(resumeAt);
            }
        }
    });
    jp.on('adPlay',function()
    {   
        $(".jw-aspect").after("<div class='ah-skip' style='padding: 0.6em;pointer-events: all;z-index:99999999;border: 1px solid #333;background-color: #000 !important;font-size: 15px!important;text-shadow: 1px 1px 2px #000;cursor: default;position: absolute;float: right;display: none;right: .75em;top: 1em;color: #fff;' onClick='adSkip(this)'>Bỏ qua quảng cáo</div>");
        setTimeout(function(){
            if($("#ah-player").find(".ah-skip").length !== 0)
            {
                $(".ah-skip").css("display","inline-block");
            }
        },6000);
    });
    jp.on('adComplete',function()
    {
        elm = document.getElementById("ah-player").querySelector(".ah-skip");
        if(elm !== null)
        {
            elm.parentNode.removeChild(elm);
        }
    })
    jp.on('adSkipped',function()
    {
        elm = document.getElementById("ah-player").querySelector(".ah-skip");
        if(elm !== null)
        {
            elm.parentNode.removeChild(elm);
        }
    })
    jp.on("seek", function(e) {
        seek = e.offset;
        ah_wf_loading()
    }).on("error", function() {
        i.c += 1;
        if (i.c < 10) {
            reloadPlayer();
        }
    })
}

function resizePlayer(w, h) {
    var rp = jQuery("#resizePlayer");
    var ap = jQuery("#ah-player");
    var jp = jwplayer();
    if (ap.width() < 800) {
        rp.html("<i class=\"fa fa-minus\"></i> Thu nhỏ");
        if (w == 'auto') w = jQuery("#ah-container").width() - 13;
        jQuery(".ah-ctr").animate({
            "margin-top": h + 10
        });
        ap.animate({
            "width": w,
            "height": h
        });
        turnOfflight()
    } else {
        rp.html("<i class=\"fa fa-plus\"></i> Phóng to");
        jQuery(".ah-ctr").animate({
            "margin-top": 0
        });
        ap.animate({
            "width": "100%",
            "height": 397
        })
    }
}
c = function(s)
{
    var sn = [];
    for(var i = s.length ; i >= 0;i--)
    {   
        sn.push(s[i]);
    }
    sn = sn.join("");
    sn = b.d(sn);
    return sn;
}
function turnOfflight(a, b) {
    a = jQuery(".lightsoff");
    if (a.length) {
        jQuery("#ah-player").css("z-index", 0);
        a.remove()
    } else {
        jQuery("body").append("<div class=\"lightsoff\" style=\"background-color: rgba(0, 0, 0, .9);width: 100%;top: 0;position: fixed;opacity: 1;filter: alpha(opacity=90);left: 0;height: 100%;z-index: 1001;-webkit-transition: opacity .5s ease-in-out;-moz-transition: opacity .5s ease-in-out;-o-transition: opacity .5s ease-in-out;transition: opacity .5s ease-in-out;\"></div>");
        jQuery("#ah-player").css("z-index", 1002);
        jQuery(".lightsoff").on("click", function() {
            turnOfflight()
        })
    }
}

function reloadPlayer(a, b, c) {
    a = jwplayer().getPosition();
    b = jQuery("#ah-player").width();
    c = jQuery("#ah-player").height();
    loadVideo(infoLoad.links, null, a, b, c);
}

function saveScreenShot(Z) {
    var H = document.getElementById(jwplayer(Z).id);
    var B = (H) ? H.querySelector("video") : undefined;
    if (B) {
        jwplayer().pause(!0);
        var F = 1;
        var D = document.createElement("canvas");
        D.width = B.videoWidth * F;
        D.height = B.videoHeight * F;
        Dwidth = window.innerWidth * 0.5;
        Dwidth100 = Dwidth / (D.width / 100);
        Dheight = (D.height / 100) * Dwidth100;
        if (Dheight > 600) {
            Dheight = 600;
            Dheight100 = Dheight / (D.height / 100);
            Dwidth = D.width / 100 * Dheight100
        }
        D.setAttribute("style", "height:" + Dheight + "px");
        D.getContext("2d").drawImage(B, 0, 0, D.width, D.height);
        var G = document.createElement("div");
        var K = (window.innerHeight - Dheight - 50) / 2 + "px";
        var L = (window.innerWidth - Dwidth) / 2 + "px";
        if (window.innerWidth < 450) {
            L = "0px";
            Dwidth = window.innerWidth
        }
        var C = document.createElement("div");
        var E = "position: fixed;z-index: 9999999999999;width:" + Dwidth + "px; left: " + L + ";top:0";
        E += ";padding-bottom:10px; background: #fff;";
        E += "text-align: center;border: 1px solid rgba(0, 0, 0, 0.23);";
        C.setAttribute("style", "display: block;");
        C.appendChild(D);
        G.setAttribute("id", "popupSave");
        G.setAttribute("style", E);
        var J = document.createElement("span");
        J.innerHTML = 'Nhấn chuột phải vào màn hình ( Lưu hình ảnh thành ) hoặc (Save image as)';
        J.setAttribute("style", "margin: 10px;display: block;font-weight: bold;");
        var I = document.createElement("a");
        I.innerHTML = "Close";
        E = "display: inline-block; margin: 0px auto;background-color: #337ab7;";
        E += "margin-top: 10px; padding: 5px 10px;";
        E += "color: #fff; border-radius: 5px; border: 1px solid #ccc; cursor: pointer;";
        I.setAttribute("style", E);
        I.onclick = function() {
            document.getElementById("popupSave").remove();
            loadVideo(infoLoad.links, null, jwplayer().getPosition(), jQuery("#ah-player").width(), jQuery("#ah-player").height())
        };
        G.appendChild(J);
        G.appendChild(C);
        G.appendChild(I);
        document.body.appendChild(G)
    }
};

function ahAlert(t) {
    jQuery("body").append("<div class='ah-alert' style='top: -50px'><span>" + t + "</span></div>");
    jQuery(".ah-alert").animate({
        top: "0"
    }, 200, function() {
        jQuery(this).delay(1500).animate({
            top: "-50px"
        }, 500)
    })
}

function addBox(uid, fid, token) {
    if (uid == 0) {
        alert("Đăng nhập để thực hiện thao tác");
        return false;
    };
    var t = jQuery("#addBox");
    if (uid !== 0 && typeof fid !== "undefined") {
        $.ajax({
            method: "POST",
            url: i.w + "/ajax",
            data: {
                uid_addBox: uid,
                fid_addBox: fid,
                token: token
            },
            success: function(data) {
                if (data.length > 6) {
                    ahAlert(data);
                    t.removeClass("button-two").addClass("button-three");
                    t.html('<i class="fa fa-minus-square-o"></i> Đã thêm vào hộp')
                }
            }
        })
    }
}