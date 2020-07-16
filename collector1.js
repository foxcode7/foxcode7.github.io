!function(e) {

    var intervalTime = 3000; //ms
    var hrefUrl = e.location.href;
    var hostname = e.location.hostname;
    var pathname = e.location.pathname;
    var host = e.location.host;
    var pageTime = (new Date).getTime();

    e.startWebViewMonitor = function() {
        if (e.monitorStarted) return !1;
        e.monitorStarted = !0;

        setTimeout(function() {
            var navigationTiming = {
                type: "monitor_resourceTiming",
                payload: {
                    url: hrefUrl,
                    domain: hostname,
                    uri: pathname,
                    navigationTiming: performanceTiming.getNavigationTiming()
                }
            };
            sendResourceTiming(navigationTiming);
        }, 0);
    }

    function sendResourceTiming(e) {
        myObj.sendResource(JSON.stringify(e))
    };

    var performanceTiming = function() {

        function navigationTiming() {
            if (!e.performance || !e.performance.timing) return {};
            var time = e.performance.timing;
            return {
                dnsQueryTime: time.domainLookupEnd - time.domainLookupStart,
                tcpConnectTime: time.connectEnd - time.connectStart,
                requestTime: time.responseEnd - time.responseStart,
                domParseTime: time.domComplete - time.navigationStart,
                whiteScreenTime: time.responseStart - time. time.navigationStart,
                domReadyTime: time.domContentLoadedEventEnd - time.navigationStart,
                onLoadTime: time.loadEventEnd - time. time.navigationStart
            }
        }

        return {
            cacheResourceTimingLength: 0,
            getNavigationTiming: function() {
                return navigationTiming();
            }
        }
    }();

} (this);