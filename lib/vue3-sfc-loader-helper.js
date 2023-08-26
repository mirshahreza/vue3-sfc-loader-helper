const sfcComponents = {};

function loadVM(componentPath) {
    const { loadModule } = window["vue3-sfc-loader"];
    const options = {
        moduleCache: {
            vue: Vue,
        },
        async getFile(url) {
            let _url = url + "?fake=" + fake;
            let compContent = await fetch(_url).then(resp =>
                resp.ok ? resp.text() : Promise.reject(resp)
            );
            registerComponents(compContent);
            return compContent;
        },
        addStyle(styleStr) {
            const style = document.createElement("style");
            style.textContent = styleStr;
            const ref = document.head.getElementsByTagName("style")[0] || null;
            document.head.insertBefore(style, ref);
        },
        log(type, ...args) {
        }
    };
    return Vue.defineAsyncComponent(() => loadModule(calculatePath(componentPath), options));
}

function registerComponents(parent) {
    let tags = getMatches(parent,/(<([^>]+)>)/gi);
    for(var i in tags){
        if(tags[i][0].toString().startsWith("<sfc")){
            let t = tags[i][0].substring(1,tags[i][0].length-1).split(' ');
            let compName=t[0];
            let compPath="";
            for(var attrIndex in t){
                if(t[attrIndex].startsWith('sfc-path')){
                    compPath=t[attrIndex].substring(10,t[attrIndex].length-1);
                }
            }
            if (sfcComponents[compName] === undefined) {
                sfcComponents[compName] = compPath;
                app.component(compName, loadVM(compPath));
            }
        }
    }
}

function calculatePath(componentPath) {
    if (!componentPath.startsWith("/")) {
        let p = window.location.pathname;
        return (p.substring(0, p.lastIndexOf('/')) + "/" + componentPath).split("//").join("/");
    }
    return componentPath;
};
function getMatches(s,regexp) {
    var matches = [];
    s.replace(regexp, function () {
        var arr = ([]).slice.call(arguments, 0);
        var extras = arr.splice(-2);
        arr.index = extras[0];
        arr.input = extras[1];
        matches.push(arr);
    });
    return matches.length ? matches : null;
};