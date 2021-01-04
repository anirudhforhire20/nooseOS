var NooseSystem = {
    metadata : {
        name : 'noose system',
        version : '1.0.0'
    },
    authData : {
        username : null
    },
    environment : {
        shell : null,
        buff : null,
        field : null,
        cmd : null,
        authentication : false,
        shell : null,
        cmd : null
    },
    boot : function() {
        document.body.innerHTML = '';
        var shell = document.createElement('div');
        shell.classList.add('terminal');
        shell.setAttribute('tabindex', '0');
        NooseSystem.environment.shell = shell;
        shell.style.width = '100vw';
        shell.style.height = '100vh';
        document.body.append(shell);

        var buf = document.createElement('p');
        buf.classList.add('buffer');
        shell.append(buf);
        NooseSystem.environment.buff = buf;

        var user = document.createElement('span');
        user.classList.add('text-green');
        user.innerHTML = 'username';
        //add user
        buf.append(user);
        NooseSystem.environment.field = user;

        buf.insertAdjacentHTML('beforeend', ' : ');

        var cmd = document.createElement('span');
        cmd.classList.add('text');
        buf.append(cmd);
        NooseSystem.environment.cmd = cmd;


        var bl = document.createElement('span');
        bl.classList.add('blinker');
        bl.innerHTML = '|';
        buf.append(bl);

        //adding keyboard events
        shell.onkeydown = function(event) {
            var key = event.key;
            if(key == 'Backspace')
            {
                cmd.innerHTML = cmd.innerHTML.substring(0 ,cmd.innerHTML.length - 1);
            }
            else if(key == 'Enter')
            {
                NooseSystem.log(cmd.innerHTML);
            }
            else if(!(key == 'Escape' || key == 'Tab' || key == 'CapsLock' || key == 'Shift' || key == 'Control' || key == 'Alt' || key == 'AltGraph' || key == '<' || key == '>' || key == '&'))
            {
                cmd.innerHTML += key;
            }
        }
    },
    log : function(logstr)
    {
        NooseSystem.authData.username = logstr;
        Interpreter.environment.user = NooseSystem.authData.username;
        setTimeout(function() {
            Home.init();
            var ob = new icon('Finder');
            var ob2 = new icon('Terminal');
            ob2.div.style.top = '200px';
            var ob3 = new icon('system.log');
            ob3.div.style.top = '300px';
            //NooseSystem.boot();
            diskManager.mkdir('/noose/' + Interpreter.environment.user + '/simulator');
            diskManager.cd('/noose/' + Interpreter.environment.user + '/simulator');
            diskManager.metadata.environment.currentDir.children.files.push({
                name : 'simulator.exe',
                img : null
            });
            diskManager.metadata.environment.currentDir.children.metadata.files.push('simulator');
            diskManager.metadata.environment.currentDir = disk.root;
        }, 1000);
        var logged = document.createElement('p');
        logged.style.color = 'white';
        logged.innerHTML = 'logging in';
        NooseSystem.environment.shell.append(logged);
    }
}