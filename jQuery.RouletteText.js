/*
 jquery.RouletteText.js by Momiji Yamamoto.
 licence: MIT license
 */
(function ($) {
    $.fn.RouletteText = function (prop) {
        var options = $.extend({
            "step": 5,
            "fps": 25,
            "text": "",
            "pool": "",
            "types": "luns",
            "nullchar": ""
        }, prop);

        return this.each(function () {
            var el = $(this);
            var str = (options.text) ? options.text.split("") : el.text().split('');
            var length = str.length;

                el.html("");

            var pool = options.pool;
            var types = options.types;
            if (pool == "") {
                pool += (types.indexOf("l") == -1) ? "" : "abcdefghijklmnopqrstuvwxyz";
                pool += (types.indexOf("u") == -1) ? "" : "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                pool += (types.indexOf("n") == -1) ? "" : "1234567890";
                pool += (types.indexOf("s") == -1) ? "" : "/*-+.,?';:][}{=_)(!@#$%^&";
            }
            function randomChar() {
                return pool[Math.floor(Math.random() * pool.length)];
            }

            function generatePattern() {
                // i<0   : none
                // i<step: shaffled
                // else  : raw

                //initialize
                var pat = [];
                var i;
                for (i = 0; i < length; i++) {
                    pat[i] = i;
                }

                i = 0;
                    pat.forEach(function (x) {
                        pat[i++] = -x - 1;
                    });

                
                return pat
            }

            var pat = generatePattern();

            (function shuffle(start) {
                if (start > length + options.step) {
                    //exception
                    return;
                }
                var tmp = str.slice(0);
                var i;
                for (i = 0; i < length; i++) {
                    if (pat[i] < 0) {
                        //none
                        tmp[i] = options.nullchar;
                    } else if (pat[i] < options.step) {
                        //shuffled
                        tmp[i] = randomChar()
                    } else {
                        //raw
                    }
                }

                i = 0;
                    pat.forEach(function (x) {
                        pat[i++] = x + 1;
                    })

                el.text(tmp.join(""));
                setTimeout(function () {
                    shuffle(start + 1);
                }, 1000 / options.fps);
            })(0);
        });
    };
})(jQuery);
