class sysLogger extends frame {
    constructor()
    {
        super('System Logger');

        const I = this;

        var shell = document.createElement('div');
        shell.classList.add('logger');
        shell.setAttribute('tabindex', '0');
        I.shell = shell;
        I.appendtoBody(shell);

        var buf = document.createElement('p');
        buf.classList.add('buffer');
        shell.append(buf);
        I.buffer = buf;

        var user = document.createElement('span');
        user.classList.add('text-green');
        user.innerHTML = Interpreter.environment.user;
        buf.append(user);

        buf.insertAdjacentHTML('beforeend', ' : ');

        //var dir = document.createElement('span');
        //dir.classList.add('text-blue');
        //add dir
        //buf.append(dir);

        //buf.insertAdjacentHTML('beforeend', ' $ ');

        var cmd = document.createElement('span');
        cmd.classList.add('text');
        buf.append(cmd);
        I.cmd = cmd;

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
                I.log(cmd.innerHTML);
            }
            else if(!(key in ['CapsLock', 'Shift', 'Tab', 'Control', 'Alt', 'Enter']))
            {
                cmd.innerHTML += key;
            }
        }

        //fetching logs

        I.fetchlogs();
    }
    log(logstatement)
    {
        const I = this;
        var logged = I.buffer.cloneNode(true);
        logged.lastChild.remove();
        I.shell.append(logged);
        I.shell.append(I.buffer);
        I.cmd.innerHTML = '';

        var xhttp = new XMLHttpRequest();
        xhttp.open('POST', 'log');
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send(JSON.stringify(logstatement));
    }
    fetchlogs()
    {
        const I = this;
        var xhttp = new XMLHttpRequest();
        xhttp.onload = function() {
            var logged = I.buffer.cloneNode(true);
            logged.lastChild.remove();
            I.shell.append(logged);
            I.shell.append(I.buffer);
            I.cmd.innerHTML = JSON.parse(this.responseText);
        }
        xhttp.open('GET', 'log');
        xhttp.setRequestHeader('Content-Type', 'application/json');
        setInterval(function() {
            xhttp.send();   
        }, 10000);
    }
}