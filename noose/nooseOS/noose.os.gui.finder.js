class finder extends frame {
    DIR = disk.root;
    List = [];
    constructor()
    {
        super('Finder');
        const I = this;

        var body = document.createElement('div');
        body.classList.add('logger');
        //var row = document.createElement('div');
        //row.classList.add('row');

        I.appendtoBody(body);
        //body.append(row);
        I.body = body;
        I.generateList(I.DIR);
    }
    generateList(directory)
    {
        const I = this;
        I.body.innerHTML = '';
        for(var dir of directory.children.directories)
        {
            
            var d = new Dir(dir, I);
            I.body.append(d.div);
            I.List.push(d);
            
        }
        //console.log(directory);
        for(var f of directory.children.files)
        {
            //console.log(f);
            var d = new file(f, I);
            I.body.append(d.div);
            I.List.push(d);
        }
    }
}

class Dir {
    state = {
        clicked : false
    };
    constructor(dir, parent)
    {
        const I = this;

        var i = document.createElement('div');
        i.classList.add('dir');
        i.style.position = 'relative';
        //Home.metadata.div.append(i);
        I.div = i;

        var img = document.createElement('div');
        img.classList.add('img');
        i.append(img);

        var im = document.createElement('img');
        im.src = Icons['folder'];
        im.style.width = '100%';
        im.style.height = '100%';
        img.append(im);

        var t = document.createElement('div');
        t.classList.add('dir-title');
        t.innerHTML = dir.name;
        i.append(t);

        //parent.List.push(I);

        //adding event listeners
        i.ondblclick = function() {
            const d = dir;
            parent.generateList(d);
        }
    }
}

class file {
    state = {
        clicked : false
    };
    constructor(f, parent)
    {
        const I = this;

        var i = document.createElement('div');
        i.classList.add('file');
        //Home.metadata.div.append(i);
        I.div = i;

        var img = document.createElement('div');
        img.classList.add('img');
        i.append(img);

        var im = document.createElement('img');
        im.src = Icons['Simulator'];
        im.style.width = '100%';
        im.style.height = '100%';
        img.append(im);

        var t = document.createElement('div');
        t.classList.add('file-title');
        t.innerHTML = f.name;
        i.append(t);

        //parent.List.push(I);

        //adding event listeners
        i.ondblclick = function() {
            new simulator();
        }
    }
}