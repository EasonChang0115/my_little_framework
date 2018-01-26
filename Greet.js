;
(function(global, $) {
    // 執行函數時，會回傳一個全新的物件
    var Greetr = function(firstname, lastname, language) {
        return new Greetr.init(firstname, lastname, language);
    };

    // 一些初始變數，只給這邊使用，利用閉包。不會跟其他library有衝突
    var supportedlLangs = ['en', 'es', 'tw'];
    var greetings = {
        en: 'Hello',
        es: 'Hola',
        tw: '你好'
    };
    var formalGreetings = {
        en: 'Greetings',
        es: 'Saludos',
        tw: '嘿~~你好喔',
    };
    var logMessages = {
        en: 'logged in',
        es: 'Inicio sesion',
        tw: '紀錄',
    };
    // 原型指向空物件 只有在原型裡面的屬性才會被外面的人利用
    Greetr.prototype = {
        fullName: function() {
            return this.firstname + ' ' + this.lastname;
        },
        validate: function() {
            if (supportedlLangs.indexOf(this.language) === -1) {
                throw "Invalid language";
            }
        },
        greeting: function() {
            return greetings[this.language] + ' ' + this.firstname + '!';
        },
        formalGreeting: function() {
            return formalGreetings[this.language] + ' ' + this.fullName() + '!';
        },
        greet: function(formal) {
            var msg;
            if (formal) {
                msg = this.formalGreeting();
            } else {
                msg = this.greeting();
            }
            if (console) {
                console.log(msg);
            }
            return this;
        },

        log: function() {
            if (console) {
                console.log(logMessages[this.language] + ":" + this.fullName());
            }
            return this;
        },

        setLang: function(lang) {
            this.language = lang;
            this.validate();
            return this;
        },

        HTMLGreeting: function(selector, formal) {
            if (!$) {
                throw 'jQuery not loading';
            }
            if (!selector) {
                throw 'Missing jQuery Selector';
            }
            var msg;
            if (formal) {
                msg = this.formalGreeting();
            } else {
                msg = this.greeting();
            }
            // 使用jQuery
            $(selector).html(msg);

            return this;
        }
    };

    // the actual object is created here, allowing us to 'new' an object without calling 'new'
    Greetr.init = function(firstname, lastname, language) {

        var self = this;
        self.firstname = firstname || "";
        self.lastname = lastname || "";
        self.language = language || "en";

        self.validate();
    };
    // trick borrowed from jquery so we don't have to use the 'new' keyword
    Greetr.init.prototype = Greetr.prototype;

    // attach our greetr to the g;obal object, and provide a shorthand 'G$' for ease our poor fingers.
    global.Greetr = global.G$ = Greetr;
}(window, jQuery));