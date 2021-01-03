var NooseSystem = {
    metadata : {
        name : 'noose system',
        version : '1.0.0'
    },
    authData : {
        "username" : null,
        "password" : null
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
                if(NooseSystem.authData.password != null && NooseSystem.authData.username != null)
                {
                    //authenticate
                }
            }
            else if(!(key in ['CapsLock', 'Shift', 'Tab', 'Control', 'Alt']))
            {
                cmd.innerHTML += key;
            }
        }
    },
    log : function(logstr)
    {
        const I = this.environment;
        var logged = I.buff.cloneNode(true);
        logged.lastChild.remove();
        I.shell.append(logged);
        I.shell.append(I.buff);
        //console.log(I.cmd);
        if(I.field.innerHTML == 'username')
        {
            NooseSystem.authData.username = logstr;
            NooseSystem.environment.field.innerHTML = 'password';
            //console.log(NooseSystem.environment.field.innerHTML);
        }
        else
        {
            NooseSystem.authData.password = logstr;
        }
        I.cmd.innerHTML = '';
    }
}