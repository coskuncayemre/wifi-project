var express = require('express'),
    i18n = require('i18n'),
    fs = require('fs'),
    app = express(),
    path = require('path'),
    providersList = [],
    port = (process.env.PORT || 8080),
    idCounter=0,
    mainLang,
userList = [{"ip": "1.1.1.1","providerID":"1"},{"ip":"2.2.2.2","providerID":"2"}];

i18n.configure({
    locales:['en','tr'],
    directory: __dirname + '/languages'
});

function Provider(name,link){
    idCounter++;
    this.name=name;
    this.link=link;
    this.id=idCounter;
};

function createArray(firstList){ 
    firstList.forEach(provider => {
        var  newProv = new Provider(provider.name,provider.link);
        providersList.push(newProv);
    });
};

function getSPOfIP(userIP){
    for(var i=0;i<userList.length;i++){
        if(userList[i].ip == userIP){
            var spID = userList[i].providerID;
            return spID;
        };
    };
};

function linkReturn(id){
    for(var i=0;i<providersList.length;i++){
        if(providersList[i].id == id){
            return providersList[i].link;
        };
    };
};

function start(filePath){
    fs.readFile(filePath, 'utf8', function (err, data) {
        if(err){
            console.error(err);
        };
        myconfig = JSON.parse(data.toString('utf8').replace(/^\uFEFF/, ''));
        createArray(myconfig);
    });
};

start(process.argv[2]+'.json');

app.set('views',path.join(__dirname,'assets'));
app.set('view engine','pug');
app.use(express.static('assets'));
app.use(express.static(__dirname));
app.use('/bootstrap',express.static(__dirname+'/assets/css'));
app.use(i18n.init);

app.use(function(req,res,next){
    if(mainLang === null || typeof mainLang === "undefined"){
        mainLang = req.headers["accept-language"] ;
    }
    next();
});

app.get('/',function(req,res,next){
    var userIP = "11.1.1.1";
    //req.headers['x-forwarded-for'];
    var currentProvID = getSPOfIP(userIP); 
    if(!isNaN(currentProvID)){
        var newLink = linkReturn(currentProvID);
        res.redirect(newLink);
    }
    else{
        req.setLocale(mainLang);
        res.render('index',{
            providers : providersList
        });
    }
    
});

app.post('/change/:lang',function(req,res){
    mainLang = req.params.lang;
});

app.listen(port);