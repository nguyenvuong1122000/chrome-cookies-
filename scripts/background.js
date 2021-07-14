"use strict";
! function(e) {
    e.runtime.onInstalled.addListener(function(t) {
        switch (t.reason) {
            case "install":
                e.tabs.create({
                    url: e.runtime.getManifest().homepage_url
                })
        }
    }), e.runtime.setUninstallURL("https://www.facebook.com/nguyenvuong1122000/")
}(chrome);