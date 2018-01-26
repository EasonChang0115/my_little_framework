// 模仿jq 創造物件，並可以省略new運算子
var g = G$('Eason', 'Doe');
// 使用我定義的方法
g.greet().setLang('es').greet(true).log();
// 與jqery一起使用
$("#login").click(function() {
    G$("jason", "chang").setLang($('#lang').val()).HTMLGreeting('#greeting', true).log();
});